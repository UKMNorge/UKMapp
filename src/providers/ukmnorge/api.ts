import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MonstringInterface } from './models/monstring';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
	UKM_URL = 'https://api.ukm.no/2.0/';
	WP_URL = 'https://ukm.no/%blog_path/wp-json/wp/v2/';

	constructor(public http: HttpClient) {
	}

	getMonstring( id ) {
		return this.http.get<MonstringInterface>( this.UKM_URL + 'monstringer/'+ id +'/' );
	}

	getFylkeMonstring( fylke_id ) {
		return this.getMonstring('fylke-'+fylke_id);
	}

	getProgram( monstring_id ) {
		return this.http.get( this.UKM_URL + 'monstring-'+ monstring_id +'/program/listByDay/' );
	}

	getDetaljProgram( monstring_id, hendelse ) {
		return this.http.get( this.UKM_URL + 'monstring-'+ monstring_id + '/program/'+ hendelse +'/');
	}

	getInnslag( monstring_id, innslag_id ) {
		return this.http.get( this.UKM_URL + 'monstring-'+ monstring_id + '/innslag/'+ innslag_id +'/');
	}

	getPosts( blog_path, options=null ) {
		return this.http.get( this.getWP_URL( blog_path )+'posts' );
	}

	getWP_URL( blog_path ) {
		return this.WP_URL.replace('%blog_path', blog_path);
	}

}
