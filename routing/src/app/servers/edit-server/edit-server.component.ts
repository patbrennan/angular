import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  
  // use ActivatedRoute to access the current path & params/fragments
  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // retrieve query params & fragments - only run in here when component is
    // created. Won't be reactive to any changes after the compoenent loads
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    
    // can also subscribe to query param & fragment changes
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
