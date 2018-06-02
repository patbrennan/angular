import { Component, Input } from '@angular/core';

// must import the service
import { LoggingService } from "../logging.service";
import { AccountsService } from "../accounts.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // tells Angular how to create a service instance:
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  
  // Injecting the service to make it available - type must be the class name
  // Says "when this component is created, I require a LoggingService instance too"
  constructor(private logger: LoggingService,
              private accountsService: AccountsService) { }
  
  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    // can use this code anywhere in this component
    // this.logger.logStatusChange(status);
    
    // emit an event defined in the service:
    this.accountsService.statusUpdated.emit(status);
  }
}
