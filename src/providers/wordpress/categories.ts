import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../storage';
import { CategoryProvider } from './category';
import { PostProvider } from './post';

/**
 * Henter ut en oversikt over programmet (collection av Hendelser)
 */
@Injectable()
export class CategoriesProvider {
    private data = new Map();
    
    constructor(
        private http:HttpClient, 
        private storageProvider:StorageProvider,
        private postProvider: PostProvider
    ) {
        console.log('Ahoy! I\'m Generic PostsProvider');
    }

    public getCategory( category_id ) {
        console.log('CategoriesProvider::getCategory( '+ category_id +' )');
        if( !this.data.has( category_id ) ) {
            console.log('Not previously set. Initiating now');
            let collection = new CategoryProvider( 
                category_id, 
                this.postProvider,
                this.http, 
                this.storageProvider 
            );
            collection.load();
            this.data.set( 
                category_id, 
                collection
            );
        }
        let variable = this.data.get( category_id );
        console.log('CategoriesProvider::getCategory( '+ category_id +' ) returns');
        console.log( variable );
        return variable;
    }
}