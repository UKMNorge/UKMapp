import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider, ApiProviderResult } from '../api';
import { StorageProvider, StorageUnit } from '../storage';
import { ObjectCollectionWithoutApiProvider } from './collection_noapi';

/**
 * Object Collection Provider contains a list of objects
 */
@Injectable()
export abstract class ObjectCollectionProvider extends ObjectCollectionWithoutApiProvider {
  public loaded = false;
  public data = [];
  public apiProvider: ApiProvider;
  
  abstract getUrl();
  
  constructor( 
    private _title, 
    public objectProvider, 
    private _http: HttpClient,
    _storageProvider: StorageProvider,
  ) {
    super(
      _title,
      objectProvider,
      _storageProvider
    )
    this.apiProvider = new ApiProvider(_title, _http, _storageProvider);
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
    this.loadFromAPI();
    this.loaded = true;
  }

  public loadFromAPI() {
    let self = this;
    let temp_data = [];
    let temp_ids = [];
    
    // Fetch from API (via provider)
    return this.apiProvider.get(
      this.getId(), 
      this.getUrl(),
      this
    ).then(
      (result: ApiProviderResult) => {
        // Iterate data returned from apiProvider
        //console.group(self.id +' got ApiProviderResult: ', result);
        //console.log('Iterate over result.getData()');
        result.getData().forEach(
          (data) => {
             //console.log( data );
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
        console.groupEnd();
        // Set internal collection to array of result data
        self.data = temp_data;

        // Store a list of IDs
        this.getStorage().set('IDs', temp_ids);

        // Set internal loaded indicator = true
        this.loaded = true;
      }
    ).catch(
      (reason) => {
        console.error('COULD NOT LOAD FROM API. MOVING ON')
      }
    );
  }

}