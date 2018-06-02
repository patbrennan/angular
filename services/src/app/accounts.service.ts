// must import these to inject service into another service
import { EventEmitter, Injectable } from "@angular/core";

import { LoggingService } from "./logging.service";

// must add metadata w/decorator for service injection to work inside a service
@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  // add an event emitter that all components can "subscribe" to or emit:
  statusUpdated = new EventEmitter<string>();
  
  // Inject a service into this service:
  constructor(private logger: LoggingService) {}
  
  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.logger.logStatusChange(status);
  }
  
  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.logger.logStatusChange(status);
  }
}