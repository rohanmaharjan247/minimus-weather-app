import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minimus';

  showMenu = false;
  darkModeActive=false;

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch(){

  }
}
