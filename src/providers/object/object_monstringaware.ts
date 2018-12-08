import { Injectable } from "@angular/core";
import { ObjectProvider } from ".";
import { Events } from "ionic-angular";
import { StorageProvider } from "../storage/storage";
import { HttpClient } from "@angular/common/http";

@Injectable()
export abstract class ObjectMonstringAwareProvider extends ObjectProvider {
    private url:string;

    abstract filterLoadData( data );
    
    public getUrl( id:string ) {
        return this.url.replace('#id', id);
    }

    constructor(
        title,
        endpoint_url,
        monstring_id,
        http:HttpClient, 
        storageProvider:StorageProvider,
        events:Events
    ) {
        super(

            title+'|'+monstring_id,
            http,
            storageProvider,
            events
         );

         this.url = endpoint_url.replace('#monstring_id', monstring_id.toString() );
    }
}