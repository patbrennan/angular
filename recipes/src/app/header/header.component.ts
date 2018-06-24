import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private dataService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
  }
  
  saveData() {
    this.dataService.storeRecipes( ).subscribe(
      (response: Response)  => {
        console.log(response);
      }
    );
  }
  
  getData() {
    // don't need to subscribe - did it in data-storage service to immediately
    // react to completion of request.
    this.dataService.getRecipes( ); 
  }
  
  onLogout() {
    this.authService.logout();
  }

}
