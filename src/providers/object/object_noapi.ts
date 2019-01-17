import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageProvider, StorageUnit } from '../storage';
import { Events } from 'ionic-angular';
import { Screamer } from '../object/screamer'

/**
 * Object Provider
 * Collection container of objects. Object type given by parent class
 * 
 * Automatically stores internal collection, handles localstorage
 * requests and persists, and fetches from API.
 */
@Injectable()
export abstract class ObjectWithoutApiProvider extends Screamer {
  public data = new Map();
  private storage: StorageUnit;
    
  /**
   * 
   * @param title Type of object
   * @param _http 
   * @param storageProvider 
   * @param events 
   */
  constructor( 
    private title, 
    _http: HttpClient, 
    private storageProvider: StorageProvider,
    events: Events
  ) {
    super( title, events );
    this.storage = this.storageProvider.create('Object'+this.title);
  }
  
  /**
   * Returns requested object from collection, database or API
   * 
   * @param id INT Object ID
   * @return Promise Requested Object
   */
  public get(id) {
    console.info('ObjectProvider('+ this.title +')::get('+ id +')');

    // If already in collection, return
    // Returning non-promise value will resolve promise automatically
    if( this.data.has( id ) ) {
      return this.data.get( id );
    }

    let self = this;

    // Fetch object not in collection from database or API
    return new Promise( function( resolve ) {
      self.storage.get( id )
        .then(
          ( object ) => {
            // Did not find object in database
            resolve( object );
            }
        )
      }
    );
  }


  /**
   * 
   * @param id 
   * @param data 
   */
  public set(id, data) {
    console.info('ObjectProvider('+ this.title +')::set('+ id +')');
    // Send to permanent storage
    this.storage.set( id, data );
    // Add / update in collection
    this.data.set( id, data );
    // Notify the world of the great updated new object
    this._publish( 'update:'+id, data );
    return data;
  }
 
  public clear() {
    this.data = new Map();
  }
}