import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { ObjectCollectionProvider } from '../object/collection';
import { Innslag, InnslagProvider } from './innslag';

/**
 * Henter ut en oversikt over kategorien (collection av Post)
 */
@Injectable()
export class InnslagDataCollectionProvider extends ObjectCollectionProvider {
    private url:string = 'https://api.ukm.no/2.0/monstring-#monstring/innslag/#id/'; 

    constructor(
        parent_id,
        innslagProvider: InnslagProvider,
        _http:HttpClient, 
        StorageProvider:StorageProvider
    ) {
        super( 'Innslag|'+parent_id, innslagProvider, _http, StorageProvider );
        console.log('Whaddup?, I\'m InnslagCollectionProvider for '+ parent_id);
        this.url = this.url.replace('#id', parent_id );
    }

    public validate( data:Innslag ) {
        return data;
    }

    public getUrl() {
        return this.url;
    }
}