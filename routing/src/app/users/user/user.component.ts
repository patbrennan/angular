import { Component, OnInit } from '@angular/core';
// import ActivatedRoute to get access to URL params
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"]
    };
    
    this.route.params.subscribe(  // observable - can take 3 functions as args
      // fired when new data available (i.e., parameters change)
      (params: Params) => { // updates user object when params change
        this.user.id = params["id"];
        this.user.name = params["name"];
      }
    );
  }

}
