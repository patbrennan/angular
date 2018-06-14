// this resolver will do the loading of our data in advance
// would also work w/returning Observable/Promise in async code, such as http request
import { 
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot 
} from "@angular/router";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { ServersService } from "../servers.service";

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  
  constructor(private serverService: ServersService) {}
  
  // Resolve requires us to implement this method:
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server
  {
    return this.serverService.getServer(+route.params['id']);
  }
}
