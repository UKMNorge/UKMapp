import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { ObjectCollectionProvider } from '../object/collection';
import { PostProvider, Post } from '../wordpress/post';

/**
 * Henter ut en oversikt over kategorien (collection av Post)
 */
@Injectable()
export class InnslagCollectionProvider extends ObjectCollectionProvider {
    private url:string = 'https://api.ukm.no/2.0/monstring-#monstring/program/#id/'; 

    constructor(
        parent_id,
        postProvider: PostProvider, 
        _http:HttpClient, 
        StorageProvider:StorageProvider
    ) {
        super( 'Innslag|'+parent_id, postProvider, _http, StorageProvider );
        console.log('Whaddup?, I\'m InnslagCollectionProvider for '+ parent_id);
        this.url = this.url.replace('#id', parent_id );
    }

    public validate( data:Post ) {
        return data;
    }

    public getUrl() {
        return this.url;
    }
}