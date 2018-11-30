import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

export class StorageUnit {
    constructor( 
      private id: string, 
      private storage: Storage,
      public events: Events
    ) {
      console.log('Hi there! I\'m StorageProvider '+ this.id +', and I\'m here to safeguard your stuff');
    }
  
    init() {}
    
    /**
     * Store the value of key
     * Internally, storage unit id prefixes storage key
     * 
     * @param key 
     * @param value 
     * @return void
     */
    public set( key: string, value: any ) {
      this._debug('SET', key);
      console.info(' -> TO: '+ value);
      this.storage.set( this._key( key ), value );
      this.publish(key, [value]);
    }
  
    /**
     * Get value of key
     * 
     * @param key 
     * @return Returns a promise that resolves the value
     */
    public get( key: string ) {
      this._debug('GET',key);
      let storage = this.storage;
      key = this._key( key );

      return new Promise( function( resolve ) {
        storage.get( key ).then( (val) => {
          if( null == val || undefined == val ) {
            console.log(' - resolve null');
            resolve( null );
          }
          try {
            let jsondata = JSON.parse( val );
            console.log(' - resolve JSON-parsed object');
            console.log( jsondata );
            resolve( jsondata );
          } catch {
            console.log(' - resolve string', val);
            resolve( val );
          }
        });
      });
    }
  
    public remove( key: string ) {
      this._debug('REMOVE', key, 'warn');
      return this.storage.remove( this._key(key) );
    }
  
    private _debug( action, key, level='log' ) {
      console[level]( action +':'+ this._key(key) );
    }
  
    /**
     * Helper: Calculate the storage key based on value-key
     * 
     * @param key 
     */
    private _key( key: string ) {
      return this.id+'|'+key;
    }


    public subscribe( event, callback ) {
      this.events.subscribe( this.id +':'+ event, callback );
    }
    public publish( event, args ) {
      this.events.publish( this.id +':'+ event, args );
    }

  }