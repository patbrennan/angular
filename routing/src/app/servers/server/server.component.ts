import { Component, OnInit } from '@angular/core';
// NOTE: Imported Params, Router, Data to get access to its functionality
import { ActivatedRoute, Params, Router, Data } from "@angular/router";

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { 
  }

  ngOnInit() {
    // get the current server id through route.snapshot.params & then retrieve
    // dynamically. Subscribe to changes for updates to activatedRoute
    // + converts it to a number
    // const id = +this.route.snapshot.params['id'];
    
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
    
    // use a RESOLVER: (don't forget to import Data)
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server']; // name must match name in app-routing
      }
    );
  }
  
  onEdit() {
    // don't need ['servers', server.id, 'edit']. Below will append to existing
    // route, which is already /servers/n, for example. Make sure to give it
    // the 2nd req'd object, which tells it relative to what path:
    this.router.navigate(['edit'], { 
      relativeTo: this.route, 
      queryParamsHandling: "preserve" // preserves qeuery params from prev navigation - see documentation for other options.
    });
  }

}
