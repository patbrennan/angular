import { Injectable, EventEmitter } from '@angular/core';

import { CounterService } from "./counter.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  activeUsers: string[] = ["Max", "Anna"];
  inactiveUsers: string[] = ["Chris", "Patrick"];
  
  statusChanged = new EventEmitter<number>();
  
  constructor(private counter: CounterService) { }
  
  setToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counter.incrementToInactive();
  }

  setToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counter.incrementToActive();
  }
}
