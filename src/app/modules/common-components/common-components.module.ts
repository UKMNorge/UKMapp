import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkmKnappComponent } from './knapp/knapp';
import { IonicModule } from '@ionic/angular';
import { MorphIconComponent } from './morph-icon/morph-icon';
import { AccordionComponent } from './accordion/accordion';

@NgModule({
  declarations: [
	  UkmKnappComponent,
	  MorphIconComponent,
	  AccordionComponent
  ],
  imports: [
	CommonModule,
	IonicModule
  ],
  exports: [
	  UkmKnappComponent,
	  MorphIconComponent,
	  AccordionComponent
  ]
})
export class CommonComponentsModule { }
