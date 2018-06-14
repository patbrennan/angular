import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { ServersService } from '../servers.service';

import { CanComponentDeactivate } from "./can-deactivate-guard.service";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changedSaved = false;
  
  // use ActivatedRoute to access the current path & params/fragments
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // retrieve query params & fragments - only run in here when component is
    // created. Won't be reactive to any changes after the compoenent loads
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);
    
    // can also subscribe to query param & fragment changes
    // this statement updates allowEdit any time the queryParams change/update
    // so it can be used in the component template.
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === "true";
      }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // subscribe to route params to update id if params change
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName, 
      status: this.serverStatus
    });
    this.changedSaved = true;
    // navigate up one path relative to the current active route
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  // must implement
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name ||
         this.serverStatus !== this.server.status) &&
        !this.changedSaved) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }
}
