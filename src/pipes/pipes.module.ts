import { NgModule } from '@angular/core';
import { ShortenPipe, ShowRestPipe } from './shorten/shorten';

@NgModule({
	declarations: [ShortenPipe, ShowRestPipe],
	imports: [],
	exports: [ShortenPipe, ShowRestPipe]
})
export class PipesModule {}
