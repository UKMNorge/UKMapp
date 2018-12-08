import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { ProgramPage } from '../program/program';
import { InfoPage } from '../info/info';
import { WordpressProvider } from '../../providers/wordpress';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProgramPage;
  tab3Root = AboutPage;
  tab4Root = ProfilePage;
  tab5Root = InfoPage;

  private info = null;

  constructor(
    private wordpressProvider:WordpressProvider
  ) {
    this.info = this.wordpressProvider.getCategoryProvider('informasjon');

  }

  hasInfo() {
    if (this.info == false) {
      return false;
    } else {
      return true;
    }
  }
}
