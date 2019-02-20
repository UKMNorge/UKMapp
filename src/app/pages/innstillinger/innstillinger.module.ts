import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InnstillingerPage } from './innstillinger.page';
import { UkmKnappComponent } from 'src/app/components/ukm-knapp/ukm-knapp';
import { TestComponent } from 'src/app/components/test/test.component';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild([{ path: '', component: InnstillingerPage }])
	],
	declarations: [InnstillingerPage]
})
export class InnstillingerPageModule { }
