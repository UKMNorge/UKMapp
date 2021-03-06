import { Injectable } from '@angular/core';
import { StorageProvider, StorageUnit } from '../storage';
import { Events } from 'ionic-angular';
import { Screamer } from '../object/screamer'

/**
 * Mitt Program Provider
 * Lagrer mitt program internt i appen
 * 
 * Automatically stores internal collection, handles localstorage
 * requests and persists, and fetches from API.
 */
@Injectable()
export class MittProgramProvider extends Screamer {
    private hendelser = new Map();
    private storage: StorageUnit = null;

    constructor(
        storageProvider: StorageProvider,
        events: Events
    ) {
        super(
            'MittProgram',
            events
        );

        this.storage = storageProvider.create('MittProgram');

        let self = this;
        this.storage.get('hendelser').then(
            (hendelser: any) => {
                if (null != hendelser) {
                    if (typeof hendelser == 'number') {
                        self.hendelser.set(hendelser, true);
                    } else {
                        hendelser.forEach(
                            (hendelse) => {
                                self.hendelser.set(hendelse, true);
                            }
                        );
                    }
                }
            }
        )
    }

    /**
     * Add
     * Legg til et nytt event til Mitt Program
     * 
     * @param event_id 
     */
    public add(event_id) {
        this.hendelser.set(event_id, true);
        this._store();
    }

    /**
     * Remove
     * Fjerne et event fra Mitt Program
     * 
     * @param event_id 
     */
    public remove(event_id) {
        this.hendelser.delete(event_id);
        this._store();
    }

    /**
     * Has
     * Har brukeren (denne app-instansen) eventet lagt til i sitt program?
     * 
     * @param event_id 
     * @return bool
     */
    public has(event_id) {
        //console.error(event_id);
        return this.hendelser.has(event_id);
    }

    /**
     * Lagre informasjon i storage
     * 
     * 
     */
    private _store() {
        let lagre = [];
        this.hendelser.forEach(
            (data, hendelse) => {
                lagre.push(hendelse);
            }
        )
        this.storage.set('hendelser', lagre);
    }
}