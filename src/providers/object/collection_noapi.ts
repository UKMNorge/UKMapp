import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider, ApiProviderResult } from '../api';
import { StorageProvider, StorageUnit } from '../storage';

/**
 * Object Collection Provider contains a list of objects
 */
@Injectable()
export abstract class ObjectCollectionWithoutApiProvider {
  public loaded = false;
  private id: string;
  private storage: StorageUnit;
  public data = [];
  
  
  constructor( 
    private title, 
    public objectProvider, 
    private _storageProvider: StorageProvider
  ) {
    this.id = 'ObjectCollection'+this.title;
    this.storage = _storageProvider.create( this.id );
  }
 
  /**
   * Get all elements of collection.
   * Requires this.load() before returning
   * 
   * @return Array collection if loaded
   */
  public getAll() {
    //console.info('ObjectCollectionProvider('+ this.title +')::getAll()');
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
    //console.info('ObjectCollectionProvider('+ this.title +')::load()');
    // Set internal loaded indicator = false to indicate loading
    this.loaded = false;

    this.loadFromStorage();
    this.loaded = true;
  }

  public loadFromStorage() {
    let self = this;
    
    self.storage.get('IDs').then( 
      (id_list:any = []) => {
        //console.error('COLLECTION '+ self.id +' GOT FROM STORAGE:', id_list);
        // Gitt id_list som int (som skjer...), skal det fortsatt være tuple
        if( typeof( id_list ) == 'number' ) {
          //console.log('God number, convert to tuple', id_list);
          id_list = [ id_list ];
          //console.log( id_list );
        }
        if( id_list == null ) {
          //console.log( self.title +' found no ID-list');
        }
        else if( id_list.constructor !== Array ) {
          //console.error('Given ID list is not Array ('+ self.title +')', id_list )
        } else {
          //console.log('id_list.forEach(', id_list ); 
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

  /**
   * Add / update object in collection
   * @param id 
   * @param data 
   */
  public set(id, data) {
    //console.info('ObjectCollectionProvider('+ this.title +')::set('+ id +')');
    this.data.push( data );
  }

  public update( object ) {
    console.warn('HOA! Updated');
  }

  public clear() {
    this.data = [];
  }

  public getId() {
      return this.id;
  }
  public getStorage() {
      return this.storage;
  }
}