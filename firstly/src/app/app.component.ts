import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSecret = false;
  visibility = "hidden";
  toggles = [];
  toggleTimes = [];

  getVisibility() {
    return this.visibility;
  }

  toggleVis() {
    this.visibility = this.visibility === "hidden" ? "visible" : "hidden";
    this.toggles.push(this.toggles.length + 1);
    this.toggleTimes.push(new Date());
  }
}
