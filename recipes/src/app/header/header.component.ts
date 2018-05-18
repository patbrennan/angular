import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() navClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  
  onNavClick(clicked: string) {
    this.navClick.emit(clicked);
  }

}
