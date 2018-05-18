import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeNav: string = 'recipes';
  
  onNavClicked(clicked: string) {
    this.activeNav = clicked;
  }
  
}
