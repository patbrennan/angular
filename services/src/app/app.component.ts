import { Component, OnInit } from '@angular/core';

import { AccountsService } from "./accounts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService]
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];
  
  constructor(private accountsService: AccountsService) {}
  
  ngOnInit() {
    // actually getting access to exact same array in service, since Js is passing
    // by reference - not copying the value!
    this.accounts = this.accountsService.accounts;
  }
}
