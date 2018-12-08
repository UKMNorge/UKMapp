import { Injectable } from '@angular/core';
import { PostProvider } from './post';
import { HttpClient } from '@angular/common/http';
import { StorageProvider } from '../storage';
import { PostContentProvider } from './postcontent';
import { CategoryProvider } from './category';
import { Events } from 'ionic-angular';


@Injectable()
export class WordpressProvider {   

    private monstring_id:number = null;
    private monstring_url:string = null;

    private categoryProviders = new Map();

    private postProvider: PostProvider = null;
    private postContentProvider: PostContentProvider = null;

    constructor(
        private http:HttpClient,
        private storageProvider: StorageProvider,
        private events: Events
    ) {

    }

    public setMonstringUrl( url:string ) {
        this.monstring_url = url;
    }
    public getMonstringUrl() {
        return this.monstring_url;
    }

    public setMonstringId( id:number ) {
        this.monstring_id = id;
    }
    public getMonstringId() {
        return this.monstring_id;
    }

    /**
     * Get category provider
     * 
     * Holder styr på alle category providers (nyheter, forside, informasjon osv)
     * og (etter eventuell initiering) returnerer category provider
     * 
     * Kaller også load() før return
     * 
     * @param category_id
     * @return CategoryProvider() for category_id
     */
    public getCategoryProvider( category_id:string|number ) {
        console.group('getCategoryProvider('+ category_id +')');
        this._checkRequisites('getCategoryProvider');
        console.groupEnd();

        if( !this.categoryProviders.has( category_id ) ) {
            let categoryProvider = new CategoryProvider(
                category_id,
                this.getMonstringId(),
                this.getMonstringUrl(),
                this.getPostProvider(),
                this.http,
                this.storageProvider
            );

            categoryProvider.load();
            this.categoryProviders.set(
                category_id,
                categoryProvider
            );
        }
        return this.categoryProviders.get( category_id );
    }

    public getPostProvider() {
        console.group('getCategoryProvider()');
        this._checkRequisites('getPostProvider');
        console.groupEnd();

        if( this.postProvider == null ) {
            this.postProvider = new PostProvider(
                this.getMonstringId(),
                this.getMonstringUrl(),
                this.http,
                this.storageProvider,
                this.events
            );
        }
        return this.postProvider;
    }

    public getPostContentProvider() {
        console.group('getPostContentProvider()');
        this._checkRequisites('getPostContentProvider');
        console.groupEnd();
        
        if( this.postContentProvider == null ) {
            this.postContentProvider = new PostContentProvider( 
                this.getMonstringId(),
                this.getMonstringUrl(),
                this.http,
                this.storageProvider,
                this.events
            );
        }
        return this.postContentProvider;
    }


    public clear() {
        this.postContentProvider = null;
        this.postProvider = null;
        this.categoryProviders = new Map();
    }

    private _checkRequisites( callback ) {
        if( this.monstring_url == null ) {
            console.log('ABORT: Missing monstringUrl');
            throw new Error('WordpressProvider mangler monstring_url. Kjør setMonstringUrl( url:string ) før '+ callback);
        }
        console.log('CONTINUE: Has monstringUrl ('+ this.getMonstringUrl() +')');
    }
}