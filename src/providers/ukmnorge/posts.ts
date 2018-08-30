import { Injectable } from '@angular/core';

import { WPApiProvider } from './apiwp';

@Injectable()
export class PostsProvider {

	constructor(private api: WPApiProvider ) {
	}

	getAll() {
		
	}
}