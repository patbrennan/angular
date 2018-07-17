// must export so you can use outside
// Use of a decorator tells Angular that it's a special type of class so it can use it properly.
// But we must first import this from angular's core package.
// A package is just a grouping of functionality.
import { Component } from "@angular/core";

// pass Js object to configure the decorator, to tell Ag what to do w/class
@Component({
  selector: "app-server", // html tag to re-use in templates. Must be unique
  templateUrl: "./server.component.html",  // relative path to html template
  styles: [`
    .online {
      color: white;
    }
  `]
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = "offline";

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? "online" : "offline";
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === "online" ? "green" : "red";
  }
}