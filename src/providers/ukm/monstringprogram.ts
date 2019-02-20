import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { HendelseProvider, Hendelse } from './hendelse';
import { ObjectMonstringAwareCollectionProvider } from '../object/collection_monstringaware';

/**
 * Henter ut en oversikt over programmet (collection av Hendelser)
 */
@Injectable()
export class MonstringProgramProvider extends ObjectMonstringAwareCollectionProvider {
    
    constructor(
        monstring_id: number, 
        hendelseProvider: HendelseProvider,
        _http:HttpClient, 
        storageProvider:StorageProvider
    ) {
        super( 
            'Hendelser',
            'https://api.ukm.no/2.0/monstring-#monstring_id/program/',
            monstring_id,
            hendelseProvider, 
            _http, 
            storageProvider
        );
        console.log('Howdy! I\'m MonstringProgramProvider for '+ monstring_id);
    }

    public validate( data:Hendelse ) { 
        return data;
    }
}