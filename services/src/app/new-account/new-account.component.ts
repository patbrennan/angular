import { Component } from '@angular/core';

// must import the service here
import { LoggingService } from "../logging.service";
import { AccountsService } from "../accounts.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // tells Angular how to create a service instance:
  // providers: [LoggingService]
})
export class NewAccountComponent {
  
  // Injecting the service to make it available - type must be the class name
  // Says "when this component is created, I require a LoggingService instance too"
  constructor(private logger: LoggingService,
              private accountsService: AccountsService) {
    // subscribe to the event being emitted in other components
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert(`Status is now ${status}`);
    );              
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // can use this code anywhere in this component (although it's injected into)
    // another service, per the lectures
    // this.logger.logStatusChange(accountStatus);
  }
}
