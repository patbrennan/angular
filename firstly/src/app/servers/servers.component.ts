import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "No server was created";
  serverName = "TestServer";
  userName = "";
  allowResetUserName = false;
  serverCreated = false;
  servers = ["First Server"];

  constructor() {
    setTimeout( () => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() { // "on" is convention for reacting to an event
    this.serverCreationStatus = `Server created! Name is ${ this.serverName }.`;
    this.servers.push( this.serverName );
    this.serverCreated = true;
  }

  onUpdateServerName(event: Event) {
    // Note the explicit type casting in the assignment below.
    // Ts would normally complain if you didn't set it because not all "targets"
    // have the value attribute. Explicit declaration fixes this.
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  resetUserName($event) {
    this.userName = "";
    this.allowResetUserName = false;
  }

  onInputUserName(event: Event) {
    let value = (<HTMLInputElement>event.target).value;

    this.allowResetUserName = (value.length > 0);
  }
}
