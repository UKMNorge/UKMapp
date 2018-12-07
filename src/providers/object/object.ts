import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider, ApiProviderResult } from '../api';
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
export abstract class ObjectProvider extends Screamer {
  public data = new Map();
  public apiProvider: ApiProvider;
  private storage: StorageUnit;
  
  abstract getUrl( id );
  abstract filterLoadData( data );
  
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
    this.apiProvider = new ApiProvider( this.title, _http, this.storageProvider);
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
    let self = this;

    return new Promise( function( resolve ) {
      // If already in collection, return
      if( self.data.has( id ) ) {
        resolve( self.data.get( id ) );
      }

      // Fetch object not in collection from database or API
      self.storage.get( id )
        .then(
          ( object ) => {
            // Did not find object in database
            if( object == null ) {
              // Initiate API load request
              self.load( id ).then( ( object ) => {
                // Add API return data to collection and resolve
                self.set( id, object );
                resolve( object );
              });
            } else {
              // Resolve object from database
              resolve( object );
            }
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
  
  
  /**
   * Load object from API
   * 
   * @param id 
   * @return Promise Requested object from API
   */
  public load(id, nameExtra='') {
    console.info('ObjectProvider('+ this.title +')::load('+ id +')');
    let self = this;
    // Request from API
    return this.apiProvider.get(
        id, 
        this.getUrl( id ),
        this
      ).then(
        (result: ApiProviderResult) => {
          // TEMP FIX TO SHOW LOADED 
          let data = result.getData();
          data = self.filterLoadData( data );
          data.navn =  nameExtra + data.navn;
          self.data.set(result.getId(), data);

          console.log('SHOULD BE');
          console.log( data );
          return self.data.get( result.getId() );
        }
      );
  }
}