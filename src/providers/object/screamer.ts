import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export abstract class Screamer {
    /**
     * Create and set screamer ID
     * @param scream_id 
     */
    constructor( 
        private scream_id: string,
        private events: Events
    ) {
    }

    /**
     * Subscribe to object events.
     * 
     * Automatically prefixes all events with screamer ID
     * @param event 
     * @param callback 
     */
    public subscribe( event, callback ) {
        console.info('SUB: '+ this.scream_id +':'+ event);
        this.events.subscribe( this.scream_id +':'+ event, callback );
    }

    /**
     * Internal function to publish events
     * 
     * Automatically prefixes all events with screamer ID
     * @param event 
     * @param args 
     */
    public _publish( event, args ) {
        console.warn('SCREAMING '+ this.scream_id +':'+ event);
        this.events.publish( this.scream_id +':'+ event, args );
    }
}