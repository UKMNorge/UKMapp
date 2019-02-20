import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { Innslag, } from './innslag';
import { InnslagDataProvider } from './innslagdata';
import { Events } from 'ionic-angular';
import { ObjectMonstringAwareCollectionProvider } from '../object/collection_monstringaware';

/**
 * Henter ut en oversikt over kategorien (collection av Post)
 */
@Injectable()
export class InnslagDataCollectionProvider extends ObjectMonstringAwareCollectionProvider {
    private innslagDataProvider: InnslagDataProvider;

    constructor(
        monstring_id,
        http:HttpClient, 
        storageProvider:StorageProvider,
        events: Events
    ) {
        let innslagDataProvider = new InnslagDataProvider( monstring_id, http, storageProvider, events);
        super(
            'InnslagData',
            'https://api.ukm.no/2.0/monstring-#monstring_id/innslag/#id/',
            monstring_id,
            innslagDataProvider,
            http,
            storageProvider
        );
        this.innslagDataProvider = innslagDataProvider;
        console.log('Whaddup?, I\'m InnslagDataCollectionProvider for '+ monstring_id);
    }

    public validate( data:Innslag ) {
        return data;
    }

    public get( id ) {
        return this.innslagDataProvider.get( id );
    }
}