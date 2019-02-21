import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './info.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InfoPage }])
  ],
  declarations: [InfoPage]
})
export class InfoPageModule {}



//https://angularfirebase.com/snippets/how-manage-shared-components-in-an-ionic-4-app/