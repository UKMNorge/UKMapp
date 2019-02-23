import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { PostPage } from './post.page';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: 'post/:post_id',
				component: PostPage
			}
		]),
		CommonComponentsModule
	],
	declarations: [PostPage]
})
export class PostPageModule { }
