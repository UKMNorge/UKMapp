import { NgModule } from '@angular/core';
import { PostComponent } from './post/post';
import { MorphIconComponent } from './morph-icon/morph-icon';
@NgModule({
	declarations: [PostComponent,
    MorphIconComponent],
	imports: [],
	exports: [PostComponent,
    MorphIconComponent]
})
export class ComponentsModule {}
