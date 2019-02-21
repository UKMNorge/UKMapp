import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkmKnappComponent } from './knapp/knapp';
import { IonicModule } from '@ionic/angular';
import { MorphIconComponent } from './morph-icon/morph-icon';

@NgModule({
  declarations: [
	  UkmKnappComponent,
	  MorphIconComponent
  ],
  imports: [
	CommonModule,
	IonicModule
  ],
  exports: [
	  UkmKnappComponent,
	  MorphIconComponent
  ]
})
export class CommonComponentsModule { }
