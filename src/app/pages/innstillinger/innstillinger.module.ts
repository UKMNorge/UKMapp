import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InnstillingerPage } from './innstillinger.page';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild([{ path: '', component: InnstillingerPage, pathMatch: 'full' }]),
		CommonComponentsModule
	],
	declarations: [InnstillingerPage]
})
export class InnstillingerPageModule { }
