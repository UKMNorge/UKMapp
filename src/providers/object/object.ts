import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider, ApiProviderResult } from '../api';
import { StorageProvider } from '../storage';
import { Events } from 'ionic-angular';
import { ObjectWithoutApiProvider } from './object_noapi';

/**
 * Object Provider
 * Collection container of objects. Object type given by parent class
 * 
 * Automatically stores internal collection, handles localstorage
 * requests and persists, and fetches from API.
 */
@Injectable()
export abstract class ObjectProvider extends ObjectWithoutApiProvider {
  public data = new Map();
  public apiProvider: ApiProvider;
  
  abstract getUrl( id );
  abstract filterLoadData( data );
  
  /**
   * 
   * @param title Type of object
   * @param http 
   * @param storageProvider 
   * @param events 
   */
  constructor( 
    title, 
    private http: HttpClient, 
    storageProvider: StorageProvider,
    events: Events
  ) {
    super( 
      title,
      storageProvider,
      events
    );
    this.apiProvider = new ApiProvider( this.title, http, storageProvider);
  }
  
  /**
   * Returns requested object from collection, database or API
   * 
   * @param id INT Object ID
   * @return Promise Requested Object
   */
  public get(id) {
    //console.info('ObjectProvider('+ this.title +')::get('+ id +')');
    let self = this;

    return new Promise( function( resolve ) {
      // If already in collection, return
      if( self.data.has( id ) ) {
        console.info('IS in collection');
        resolve( self.data.get( id ) );
      } else {
        console.info('IS NOT in collection');
      }

      // Fetch object not in collection from database or API
      self.getStorage().get( id )
        .then(
          ( object ) => {
            // Did not find object in database
            if( object == null ) {
              // Initiate API load request
              self.load( id ).then( ( object ) => {
                // Add API return data to collection and resolve
                //self.set( id, object );
                self.data.set( id, object );
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

          console.log( data );
          return self.data.get( result.getId() );
        }
      );
  }

  public getHttp() {
    return this.http;
  }
}