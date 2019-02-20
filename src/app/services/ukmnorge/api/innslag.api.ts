import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from '../utils/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../utils/network.service';
import { ApiRequest } from './api.models';
import { Innslag, InnslagDetaljer, PlaceholderInnslagDetaljer } from './innslag.models';

@Injectable({
	providedIn: 'root'
})
export class InnslagApi extends ApiService {
	private title: String;
	public urlCollection = 'https://api.ukm.no/2.0/monstring-#monstring_id/innslag/';
	public urlObject = this.urlCollection +'#id';
	public urlProgram = 'https://api.ukm.no/2.0/monstring-#monstring_id/program/#id'

	constructor(
		private monstring_id: Number,
		private _storageService: StorageService,
		private _http: HttpClient,
		private _networkService: NetworkService
	) {
		super(
			'InnslagApi',
			_storageService,
			_http,
			_networkService
		);

		this.title = super.getId();
	}

	
	/**
	 * Hent alle innslag for en mønstring
	 */
	public getMonstringInnslag() {
		return this.request(
			new ApiRequest(
				'collection',
				'Monstring',
				this.urlCollection.replace('#monstring_id', this.monstring_id.toString() ),
				this.title,
				[]
			)
		);
	}

	/**
	 * Hent alle innslag for en hendelse
	 * 
	 * @param id 
	 */
	public getHendelse( id ) {
		return this.request(
			new ApiRequest(
				'collection',
				'Hendelse|'+id,
				this.urlProgram.replace('#monstring_id', this.monstring_id.toString() ).replace('#id', id),
				this.title,
				[]
			)
		);
	}

	/**
	 * Hent detaljer for ett gitt innslag
	 * Endpoint returnerer blant annet UKM-TV, bilder og artikler i tillegg til annen data.
	 * Dette strippes ut her.
	 * 
	 * @param id 
	 */

	public getDetaljer( id ) {
		return this.request(
			new ApiRequest(
				'object',
				'Detaljer|'+id,
				this.urlObject.replace('#monstring_id', this.monstring_id.toString() ).replace('#id', id),
				this.title,
				[]
			)
		);
	}

	public validate( data ) {
		// Detaljer har alltid med et artikkel-array, stripp i tilfelle vekk andre detaljer
		if( data && data.artikler ) {
			return new InnslagDetaljer( data );
		}
		return data;
	}
	public validateCollection( data ) {
		// F.eks hendelse har hendelse-data i tillegg til innslag-listen
		if( data && data.innslag ) {
			return data.innslag;
		}
		// Mønstring-endpoint har bare innslagene som liste
		return data;
	}
}
