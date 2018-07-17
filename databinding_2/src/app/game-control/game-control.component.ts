import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  counter;
  currentNum: number = 0;
  startDisabled: boolean = false;
  
  @Output() increment = new EventEmitter<number>();
  @Output() gameCleared = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  onStart() {
    this.startDisabled = true;
    
    this.counter = setInterval( () => {
      this.currentNum += 1;
      this.increment.emit(this.currentNum);
    }, 1000);
  }
  
  onPause() {
    clearInterval(this.counter);
    this.startDisabled = false;
  }
  
  clearGame() {
    this.currentNum = 0;
  }

}
