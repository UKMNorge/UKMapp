import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkmKnappComponent } from './knapp/knapp';
import { IonicModule } from '@ionic/angular';
import { MorphIconComponent } from './morph-icon/morph-icon';
import { AccordionComponent } from './accordion/accordion';
import { PostComponent } from './post/post';

@NgModule({
  declarations: [
	  UkmKnappComponent,
	  MorphIconComponent,
	  AccordionComponent,
	  PostComponent
  ],
  imports: [
	CommonModule,
	IonicModule
  ],
  exports: [
	  UkmKnappComponent,
	  MorphIconComponent,
	  AccordionComponent,
	  PostComponent
  ]
})
export class CommonComponentsModule { }
