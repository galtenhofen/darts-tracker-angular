import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cricket-buttons',
  templateUrl: './cricket-buttons.component.html',
  styleUrls: ['./cricket-buttons.component.css']
})
export class CricketButtonsComponent implements OnInit {
  @Output() buttonHit = new EventEmitter();
  @Output() multiplier = new EventEmitter();
  currentMultiplier: number = 1;
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
                          if (event.key === 'd' )  {this.toggleMultiplier(2); } else
                            if (event.key === 't' )  {this.toggleMultiplier(3); } 
  }


constructor() { }

  ngOnInit(): void {
  }

hit(num: number){
  this.buttonHit.emit(num);
  this.toggleMultiplier(1);
}
toggleMultiplier(multi: number){
  if(this.currentMultiplier === multi){
    this.currentMultiplier = 1;
  } else{
    this.currentMultiplier = multi;
  }
  this.multiplier.emit(this.currentMultiplier);
  console.log('currentMultiplier: ', this.currentMultiplier);
}

checkMultipler(){
  return {
    'doubler': this.currentMultiplier === 2,
    'tripler': this.currentMultiplier === 3
  }
}

}
