import { Injectable } from '@angular/core';

import { ApiProvider } from './api';
import { Globals } from '../../providers/app/globals';

@Injectable()
export class InfoProvider {
	private data = null;
  public menu = null;
  public markup = null;

	constructor(private api: ApiProvider, public globals: Globals ) {
	}

  getMenuItems() {
		console.info('getMenuItems');
		return new Promise(resolve => {
			this.api.getMenuItems(this.globals.get('fylke').link).subscribe( (data) => {
				this.menu = data;
				resolve( this.data );
			})
		});
	}
  getSideMarkup( url ) {
		console.info('getSideMarkup');
		return new Promise(resolve => {
			this.api.getSideMarkup( url ).subscribe( (data) => {
        console.log(data);
				this.markup = data;
			})
		});
	}
}
