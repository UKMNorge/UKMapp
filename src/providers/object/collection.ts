import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider, ApiProviderResult } from '../api';
import { StorageProvider, StorageUnit } from '../storage';

/**
 * Object Collection Provider contains a list of objects
 */
@Injectable()
export abstract class ObjectCollectionProvider {
  public loaded = false;
  private id: string;
  private storage: StorageUnit;
  public data = [];
  public apiProvider: ApiProvider;
  
  abstract getUrl();
  
  constructor( 
    private title, 
    public objectProvider, 
    _http: HttpClient, 
    private storageProvider: StorageProvider
  ) {
    this.apiProvider = new ApiProvider(this.title, _http, this.storageProvider);
    this.id = 'ObjectCollection'+this.title;
    this.storage = this.storageProvider.create( this.id );
  }
 
  /**
   * Get all elements of collection.
   * Requires this.load() before returning
   * 
   * @return Array collection if loaded
   */
  public getAll() {
    console.info('ObjectCollectionProvider('+ this.title +')::getAll()');
    if( !this.loaded ) {
      return [];
    }
    return this.data;
  }

  /**
   * Load elements of collection
   * 
   * @return void
   */
  public load() {
    console.info('ObjectCollectionProvider('+ this.title +')::load()');
    // Set internal loaded indicator = false to indicate loading
    this.loaded = false;

    this.loadFromStorage();
    this.loadFromAPI();
    this.loaded = true;
  }

  public loadFromStorage() {
    let self = this;
    
    self.storage.get('IDs').then( 
      (id_list:any = []) => {
        console.error('COLLECTION '+ self.id +' GOT FROM STORAGE:', id_list);
        // Gitt id_list som int (som skjer...), skal det fortsatt være tuple
        if( typeof( id_list ) == 'number' ) {
          console.log('God number, convert to tuple', id_list);
          id_list = [ id_list ];
          console.log( id_list );
        }
        if( id_list == null ) {
          console.log( self.title +' found no ID-list');
        }
        else if( id_list.constructor !== Array ) {
          console.error('Given ID list is not Array ('+ self.title +')', id_list )
        } else {
          console.log('id_list.forEach(', id_list ); 
          /*
          id_list.forEach( 
            ( id ) => {
              console.error(this.title + ' FIND ID ', id );
              self.objectProvider.get( id ).then(
                ( object ) => {
                  //self.set( object.id, object );
                  self.data.push( object );
                }
              )
            }
          )
          */
        }
      }
    );
  }

  public loadFromAPI() {
    let self = this;
    let temp_data = [];
    let temp_ids = [];
    
    // Fetch from API (via provider)
    return this.apiProvider.get(
      this.id, 
      this.getUrl(),
      this
    ).then(
      (result: ApiProviderResult) => {
        // Iterate data returned from apiProvider
        console.error('THIS SHIT IS THE RESULT');
        console.log( result );
        result.getData().forEach(
          (data) => {
            console.log('THIS IS DATA', data);
            // First add, then subscribe to updates
            // Set data in object provider and add to internal collection (via temp)
            temp_data.push( this.objectProvider.set( data.id, data ) );
            temp_ids.push( data.id );
            // Subscribe to object updates
            // TODO: MOVE TO OBJECT, NOT ANON FUNCT
            this.objectProvider.subscribe( 
              'update:'+data.id, 
              (object) => {
                self.data.forEach( 
                (list_object, list_placement) => {
                  if( object.id == list_object.id ) {
                    self.data[ list_placement ] = object;
                  }
                }
                );
              }
            );
          }
        );
        // Set internal collection to array of result data
        self.data = temp_data;

        // Store a list of IDs
        this.storage.set('IDs', temp_ids);

        // Set internal loaded indicator = true
        this.loaded = true;
      }
    ).catch(
      (reason) => {
        console.error('COULD NOT LOAD FROM API. MOVING ON')
      }
    );
  }

  /**
   * Add / update object in collection
   * @param id 
   * @param data 
   */
  public set(id, data) {
    console.info('ObjectCollectionProvider('+ this.title +')::set('+ id +')');
    this.data.push( data );
  }

  public update( object ) {
    console.warn('HOA! Updated');
  }

}