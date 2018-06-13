import { Component, OnInit } from '@angular/core';
// NOTE: Imported Params to get access to its functionality
import { ActivatedRoute, Params } from "@angular/router";

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // get the current server id through route.snapshot.params & then retrieve
    // dynamically. Subscribe to changes for updates to activatedRoute
    // + converts it to a number
    const id = +this.route.snapshot.params['id'];
    console.log(id);
    
    this.server = this.serversService.getServer(id);
    console.log(this.server);
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

}
