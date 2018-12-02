import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { ObjectCollectionProvider } from '../object/collection';
import { HendelseProvider, Hendelse } from './hendelse';

/**
 * Henter ut en oversikt over programmet (collection av Hendelser)
 */
@Injectable()
export class ProgramProvider extends ObjectCollectionProvider {
    private url: string = 'https://api.ukm.no/2.0/monstring-#id/program/listByDay/'; 

    constructor(
        monstring_id: number, 
        hendelseProvider: HendelseProvider,
        _http:HttpClient, 
        StorageProvider:StorageProvider
    ) {
        super( 'Hendelser', hendelseProvider, _http, StorageProvider );
        console.log('Howdy! I\'m ProgramProvider');
        console.log( monstring_id );
        this.url.replace('#id', monstring_id.toString() );
    }

    public validate( data ) {
        return data;
    }

    public getUrl() {
        return this.url;
    }
}