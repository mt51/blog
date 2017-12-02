import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  leftVisible: boolean = false;
  handleCollapse () {
    this.leftVisible = true;
  };
  handleVisible (visible: boolean = false) {
    this.leftVisible = visible;
  }
}
