import { Storage } from '@ionic/storage';
import { Screamer } from '../object/screamer';
import { Events } from 'ionic-angular';

/**
 * Storage unit
 * 
 * Wrapper for @ionic/storage, prefixing (automatically) all values
 * by storage unit ID
 */
export class StorageUnit extends Screamer {
    
  private data = new Map();
  
  /**
   * 
   * @param id 
   * @param storage 
   */
  constructor( 
    private id: string, 
    private storage: Storage,
    events: Events
  ) {
    super( 'Storage:'+ id, events );
    console.log('Hi there! I\'m StorageUnit '+ this.id +', and I\'m here to safeguard your stuff');
  }
    
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
    this.data.set( key, value );
    this._publish( 'set:'+ key, value );
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
    let self = this;

    return new Promise( function( resolve ) {
      if( self.data.has( key ) ) {
        console.warn('StorageUnit('+self.id+')::get #hasInMap resolve:', self.data.get( key ) );
        resolve( self.data.get( key ) );
      }
  
      key = self._key( key );
      storage.get( key ).then( (val) => {
        
        // Value not in storage, resolve null
        if( null == val || undefined == val ) {
          console.log('StorageUnit('+self.id+')::get #notInStorage resolve:', null );
          resolve( null );
        }
        try {
          // Value is JSON, resolve as object
          let jsondata = JSON.parse( val );
          console.log('StorageUnit('+self.id+')::get #JSONsuccess resolve:', jsondata );
          resolve( jsondata );
        } catch {
          // Value was not JSON-data, resolve string, object, whatevva
          console.log(' - resolve '+ typeof( val ), val);
          console.log('StorageUnit('+self.id+')::get #JSONerror resolve:', val );
          resolve( val );
        }
      });
    });
  }

  /**
   * Remove (delete) value from storage unit
   * @param key 
   */
  public remove( key: string ) {
    this._debug('REMOVE', key, 'warn');
    this._publish( 'remove:'+ key, null );
    return this.storage.remove( this._key(key) );
  }

  public clear() {
    this._debug('CLEAR ALL STORAGE', 'error');
    return this.storage.clear();
  }

  /**
   * Wrapper of console.log to simply (de/)activate debugging
   * @param action 
   * @param key 
   * @param level 
   */
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
}