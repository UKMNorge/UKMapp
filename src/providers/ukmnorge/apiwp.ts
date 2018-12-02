import { Injectable } from '@angular/core';
import { ApiProvider } from './api';

@Injectable()
export class WPApiProvider {
	private blog_path = null;
	
	constructor( private api: ApiProvider ) {
		this.blog_path = 'fake-url-must-be-set-in-apiwp.ts';//this.globals.get('fylke').link;
	}

	getPosts() {
		if( this.blog_path == null ) {
			return;
		}
		
		return this.api.getPosts(
			this.blog_path, 
			{
				categories: 1
			}
		);
	}
}