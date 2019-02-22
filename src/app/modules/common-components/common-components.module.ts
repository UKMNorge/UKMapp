import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkmKnappComponent } from './knapp/knapp';
import { IonicModule } from '@ionic/angular';
import { MorphIconComponent } from './morph-icon/morph-icon';
import { AccordionComponent } from './accordion/accordion';
import { PostComponent } from './post/post';
import { ShortenPipe, ShowRestPipe } from './pipes/shorten/shorten';

@NgModule({
  declarations: [
	  UkmKnappComponent,
	  MorphIconComponent,
	  AccordionComponent,
	  PostComponent,
	  ShortenPipe,
	  ShowRestPipe
  ],
  imports: [
	CommonModule,
	IonicModule
  ],
  exports: [
	  UkmKnappComponent,
	  MorphIconComponent,
	  AccordionComponent,
	  PostComponent,
	  ShortenPipe,
	  ShowRestPipe
  ]
})
export class CommonComponentsModule { }