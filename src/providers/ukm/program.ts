import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageProvider } from '../../providers/storage';
import { HendelseProvider } from './hendelse';
import { MonstringProgramProvider } from './monstringprogram';

/**
 * Henter ut en oversikt over programmet (collection av Hendelser)
 */
@Injectable()
export class ProgramProvider {
    private data = new Map();
    
    constructor(
        private hendelseProvider: HendelseProvider,
        private http:HttpClient, 
        private storageProvider:StorageProvider
    ) {
        console.log('Howdy! I\'m Generic ProgramProvider');
    }

    public getMonstring( monstring_id ) {
        console.log('ProgramProvider::getMonstring( '+ monstring_id +' )');
        if( !this.data.has( monstring_id ) ) {
            console.log('Not previously set. Initiating now');
            let collection = new MonstringProgramProvider( 
                monstring_id, 
                this.hendelseProvider, 
                this.http, 
                this.storageProvider 
            );
            if( !collection.loaded ) {
                collection.load();
            }
            this.data.set( 
                monstring_id, 
                collection
            );
        }
        let variable = this.data.get( monstring_id );
        console.log('ProgramProvider::getMonstring( '+ monstring_id +' ) returns');
        console.log( variable );
        return variable;
    }
}