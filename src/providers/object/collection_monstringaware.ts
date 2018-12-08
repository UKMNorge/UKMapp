import { ObjectCollectionProvider } from ".";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StorageProvider } from "../storage";

@Injectable()
export class ObjectMonstringAwareCollectionProvider extends ObjectCollectionProvider {
    private url:string;
    
    constructor(
        title,
        endpoint_url,
        monstring_id,
        objectProvider,
        http:HttpClient, 
        storageProvider:StorageProvider
) {
        super( 
            title+'|'+monstring_id,
            objectProvider,
            http,
            storageProvider
         );

         this.url = endpoint_url.replace('#monstring_id', monstring_id.toString() );
    }

    public getUrl() {
        return this.url;
    }
}