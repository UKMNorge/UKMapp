import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { ProgramPage } from '../program/program';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProgramPage;
  tab3Root = AboutPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
