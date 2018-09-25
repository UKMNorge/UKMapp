import { Injectable } from '@angular/core';
import { ApiProvider } from './api';
import { Globals } from '../app/globals';

@Injectable()
export class WPApiProvider {
	private blog_path = null;

	public menu = null;


	constructor( private api: ApiProvider, public globals: Globals ) {
		this.blog_path = this.globals.get('fylke').link;
		console.log(this.blog_path);
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
