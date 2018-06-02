export class CounterService {
  toInactive = 0;
  toActive = 0;

  constructor() { }
  
  incrementToActive() {
    this.toActive++;
    console.log(`Set to Active: ${this.toActive}`);
  }
  
  incrementToInactive() {
    this.toInactive++;
    console.log(`Set to Inactive: ${this.toInactive}`);
  }
}
