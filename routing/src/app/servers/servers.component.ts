import { Component, OnInit } from '@angular/core';
// ActivatedRoute gives us the current route so we can use it
import { Router, ActivatedRoute } from "@angular/router";
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }
  
  onReload() {
    // can use ActivatedRoute to resolve everything here relative to the
    // current route the app is in. Note: wouldn't use "/" in "servers"
    // this.router.navigate(["servers"], {relativeTo: this.route});
  }

}
