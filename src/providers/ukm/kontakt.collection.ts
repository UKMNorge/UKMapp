import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { ObjectMonstringAwareCollectionProvider } from '../object/collection_monstringaware';
import { Kontakt, KontaktProvider } from './kontakt';
import { Events } from 'ionic-angular';

/**
 * Henter ut en oversikt over programmet (collection av Hendelser)
 */
@Injectable()
export class KontaktCollectionProvider extends ObjectMonstringAwareCollectionProvider {
    private kontaktProvider:KontaktProvider;

    constructor(
        monstring_id: number,
        http:HttpClient, 
        storageProvider:StorageProvider,
        events: Events
    ) {
        let kontaktProvider = new KontaktProvider( monstring_id, http, storageProvider, events );
        super( 
            'Kontakter',
            'https://api.ukm.no/2.0/monstring-#monstring_id/kontakter/',
            monstring_id,
            kontaktProvider, 
            http, 
            storageProvider
        );
        this.kontaktProvider = kontaktProvider;
        console.log('Pip! I\'m KontakterProgramProvider for '+ monstring_id);
    }

    public validate( data:Kontakt ) { 
        return data;
    }

    public get( id ) {
        return this.kontaktProvider.get( id );
    }
}