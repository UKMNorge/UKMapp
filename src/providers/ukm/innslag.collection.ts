import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { Innslag, InnslagProvider, } from './innslag';
import { Events } from 'ionic-angular';
import { ObjectMonstringAwareCollectionProvider } from '../object/collection_monstringaware';

/**
 * Henter ut en oversikt over kategorien (collection av Post)
 */
@Injectable()
export class InnslagCollectionProvider extends ObjectMonstringAwareCollectionProvider {
    private innslagProvider: InnslagProvider;

    constructor(
        monstring_id: Number,
        http:HttpClient, 
        storageProvider:StorageProvider,
        events: Events
    ) {
        let innslagProvider = new InnslagProvider(http, storageProvider, events);
        super(
            'Innslag',
            'https://api.ukm.no/2.0/monstring-#monstring_id/innslag/',
            monstring_id,
            innslagProvider,
            http, 
            storageProvider
        );
        this.innslagProvider = innslagProvider;
        console.log('Whaddup?, I\'m InnslagCollectionProvider for '+ monstring_id);
    }

    public validate( data:Innslag ) {
        return data;
    }

    public get( id ) {
        return this.innslagProvider.get( id );
    }
}