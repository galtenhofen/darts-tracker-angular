import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, Input, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { Router,NavigationStart ,NavigationEnd, NavigationExtras, ActivatedRoute  } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('snav', { static: false }) snav!: MatSidenav;
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string = "";
    isAdmin: boolean = false;
    currentGame: string = "Darts";
    currentUrl: string = "";

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService: AuthenticationService,
        private authGuard: AuthGuard,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService) {

       this.currentUrl = route.url;

        this.mobileQuery = this.media.matchMedia('(max-width: 10000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {

        this.route.events.subscribe(Event => {
            if (Event instanceof NavigationStart) {
                console.log('Event: ', Event.url);
                this.currentUrl = Event.url;
            }
            
       });

        this.currentGame = this.dataService.getGame();
        console.log('this.mobileQuery.matches', this.mobileQuery.matches);
        const user = this.authService.getCurrentUser();

        this.isAdmin = user.isAdmin;
        this.userName = user.fullName;

        // Auto log-out subscription
        const timer$ = timer(2000, 5000);
        this.autoLogoutSubscription = timer$.subscribe(() => {
            this.authGuard.canActivate();
        });

        // this.route.events.subscribe((event) => {
        //     if (event instanceof NavigationEnd) {
        //       this.currentRoute = event.url;
              
        //       // Close the sidenav if needed based on the current route
        //       if (this.currentRoute === '/games/cricket' || this.currentRoute === '/games/options') {
        //         this.snav.close();
        //       }
        //     }
        //   });
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    reloadRoute() {
        this.snav.close();
        this.currentUrl = this.route.url; // Get the current URL
        console.log('this.currentUrl', this.currentUrl);
        const navigationExtras: NavigationExtras = {
          queryParams: { timestamp: new Date().getTime() }, // Add a query parameter with a unique value to force the reload
          skipLocationChange: true // Skip the location change in the browser history
        };
        this.route.navigateByUrl('/', navigationExtras)
          .then(() => {
            this.route.navigateByUrl(this.currentUrl); // Navigate back to the current URL
          });
      }
    }

