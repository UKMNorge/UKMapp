import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../storage';
import { Events } from 'ionic-angular';
import { ObjectMonstringAwareCollectionProvider } from '../object/collection_monstringaware';
import { Film, FilmProvider } from './film';

/**
 * Henter ut en oversikt over kategorien (collection av Post)
 */
@Injectable()
export class FilmCollectionProvider extends ObjectMonstringAwareCollectionProvider {
    private filmProvider: FilmProvider;

    constructor(
        monstring_id: Number,
        http:HttpClient, 
        storageProvider:StorageProvider,
        events: Events
    ) {
        let filmProvider = new FilmProvider(http, storageProvider, events);
        super(
            'Film',
            'https://api.ukm.no/2.0/monstring-#monstring_id/filmer/',
            monstring_id,
            filmProvider,
            http, 
            storageProvider
        );
        this.filmProvider = filmProvider;
        console.log('Whaddup?, I\'m FilmCollectionProvider for '+ monstring_id);
    }

    public validate( data:Film ) {
        return data;
    }

    public get( id ) {
        return this.filmProvider.get( id );
    }
}