import {CricketRound} from './cricket-round';
import {CricketPlayer} from './cricket-player';

export class CricketGame {
  player: CricketPlayer;
  rounds: CricketRound[];
  bibs: number;
  twentyHits: number;
  nineteenHits: number;
  eighteenHits: number;
  seventeenHits: number;
  sixteenHits: number;
  fifteenHits: number;
  bullseyeHits: number;
  // twentyClosed: boolean;
  // nineteenClosed: boolean;
  // eighteenClosed: boolean;
  // seventeenClosed: boolean;
  // sixteenClosed: boolean;
  // fifteenClosed: boolean;
  // bullseyeClosed: boolean;
  isActive: boolean;
  isWinner: boolean;
 
  [key: string]: number | boolean | CricketPlayer | CricketRound[] | undefined | ((prefix: string) => { hits: number; closed: boolean });

  // private _twentyClosed: boolean;
  // private _nineteenClosed: boolean;
  // private _eighteenClosed: boolean;
  // private _seventeenClosed: boolean;
  // private _sixteenClosed: boolean;
  // private _fifteenClosed: boolean;
  // private _bullseyeClosed: boolean;

  constructor(player: CricketPlayer) {
    this.player = player;
    this.rounds = [];
    this.twentyHits = 0;
    this.nineteenHits = 0;
    this.eighteenHits = 0;
    this.seventeenHits = 0;
    this.sixteenHits = 0;
    this.fifteenHits = 0;
    this.bullseyeHits = 0;
    this.bibs = 0;
    this.isActive = false;
    this.isWinner = false;
    // this._twentyClosed = false;
    // this._nineteenClosed = false;
    // this._eighteenClosed = false;
    // this._seventeenClosed = false;
    // this._sixteenClosed = false;
    // this._fifteenClosed = false;
    // this._bullseyeClosed = false;
  }

  get twentyClosed(): boolean {
    return this.twentyHits > 2;
  }

  // set twentyClosed(value: boolean) {
  //   this._twentyClosed = value;
  // }


  get nineteenClosed(): boolean {
    return this.nineteenHits > 2;
  }

  // set nineteenClosed(value: boolean) {
  //   this._nineteenClosed = value;
  // }

  get eighteenClosed(): boolean {
    return this.eighteenHits > 2;
  }

  // set eighteenClosed(value: boolean) {
  //   this._eighteenClosed = value;
  // }

  get seventeenClosed(): boolean {
    return this.seventeenHits > 2;
  }
  
  // set seventeenClosed(value: boolean) {
  //   this._eighteenClosed = value;
  // }

  get sixteenClosed(): boolean {
    return this.sixteenHits > 2;
  }

  // set sixteenClosed(value: boolean) {
  //   this._sixteenClosed = value;
  // }

  get fifteenClosed(): boolean {
    return this.fifteenHits > 2;
  }

  // set fifteenClosed(value: boolean) {
  //   this._eighteenClosed = value;
  // }

  get bullseyeClosed(): boolean {
    return this.bullseyeHits > 2;
  }

  // set bullseyeClosed(value: boolean) {
  //   this._bullseyeClosed = value;
  // }
  
  getPropertyValue(prefix: string): { hits: number; closed: boolean } {
    const hits = this[prefix + 'Hits'] as number;
    const closed = this[prefix + 'Closed'] as boolean;
    return { hits, closed };
  }

  get currentTarget(): number {
    if (!this.twentyClosed) {
      return 20;
    } else if (!this.nineteenClosed) {
      return 19;
    } else if (!this.eighteenClosed) {
      return 18;
    } else if (!this.seventeenClosed) {
      return 17;
    } else if (!this.sixteenClosed) {
      return 16;
    } else if (!this.fifteenClosed) {
      return 15;
    } else if (!this.bullseyeClosed) {
      return 25;
    } else {
      // If all targets are closed, return an empty string or handle the case accordingly
      return 0;
    }
  }
}

