import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UsersService } from "../users.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {  // This component is our observer / subscriber
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        },
        () => {
          // execute if error; not really necessary here, however
        },
        () => {
          // execute if complete; not really necessary here, however
        }
      );
  }
  
  onActivate() {
    // subject is observable & observer at the same time, which is why we can
    // call `next` easily and push a new data package w/whatever is contained
    // here.
    this.usersService.userActivated.next( this.id );
  }

}
