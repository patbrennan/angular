import { Component } from '@angular/core';
import { Response } from "@angular/http"; // to work w/Response

import { ServersService } from "./servers.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // no `subscribe` needed; uses async pipe (subscribes in the background):
  appName = this.serversService.getAppName();
  
  constructor(private serversService: ServersService) {
    
  }
  
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  
  saveServers() {
    this.serversService.storeServers(this.servers).subscribe(
      // first argument = function to execute when data received (response)
      (response) => console.log(response),
      (error) => console.log(error)
    );
    // no need to unsubscribe from this observable, because Ng will handle for
    // us once it has returned.
  }
  
  getServers() {
    this.serversService.getServers().subscribe(
      (servers: any[]) => this.servers = servers,
      (error) => console.log(error)
    );
  }
  
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
  
}
