import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './info.page';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { SinglePage } from './single.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
	RouterModule.forChild(
		[
			{ path: '', component: InfoPage },
			{ path:'single/:id', component: SinglePage}
		]
	),
	CommonComponentsModule
  ],
  declarations: [InfoPage, SinglePage]
})
export class InfoPageModule {}



//https://angularfirebase.com/snippets/how-manage-shared-components-in-an-ionic-4-app/