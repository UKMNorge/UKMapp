import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider, ApiProviderResult } from '../api';
import { StorageProvider, StorageUnit } from '../storage';

@Injectable()
export abstract class ObjectProvider {
  public data = new Map();
  public apiProvider: ApiProvider;
  private storage: StorageUnit;
  
  abstract getUrl();
  
  constructor( 
    private title, 
    _http: HttpClient, 
    private storageProvider: StorageProvider
  ) {
    this.apiProvider = new ApiProvider( this.title, _http, this.storageProvider);
    this.storage = this.storageProvider.create('Object'+this.title);
  }
  
  public get(id) {
    console.info('ObjectProvider('+ this.title +')::get('+ id +')');

    let self = this;

    if( self.data.has( id ) ) {
      return self.data.get( id );
    }

    console.log('OBJECT:GET: init promise');
    return new Promise( function( resolve ) {
      self.storage.get( id )
        .then(
          (monstring ) => {
            console.log('OBJECT:GET: got stuff from storage');
            if( monstring == null ) {
              console.log('OBJECT:GET: storage stuff was null');
              self.load( id ).then( (monstring) => {
                self.set( id, monstring );
                resolve( monstring );
              });
            } else {
              console.log('OBJECT:GET: storage stuff was object');
              resolve( monstring );
            }
          } 
        )
      }
    );
  }

  public set(id, data) {
    console.info('ObjectProvider('+ this.title +')::set('+ id +')');
    this.storage.set( id, data );
    this.data.set(id, data);
  }
  
  public load(id) {
    console.info('ObjectProvider('+ this.title +')::load('+ id +')');
    let self = this;
    return this.apiProvider.get(
        id, 
        this.getUrl() + id,
        this
      ).then(
        (result: ApiProviderResult) => {
          let data = result.getData();
          data.navn = 'RELOADED '+ data.navn;
          self.data.set(result.getId(), data);
          return self.data.get( result.getId() );
        }
      );
  }
}

@Injectable()
export abstract class ObjectCollectionProvider {
  private loaded = false;
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
  }
 
  public getAll() {
    if( !this.loaded ) {
      return [];
    }
    console.info('ObjectCollectionProvider('+ this.title +')::getAll()');
    return this.data;
  }

  public load() {
    console.info('ObjectCollectionProvider('+ this.title +')::load()');
    let self = this;
    let temp_data = [];
    return this.apiProvider.get(
      'collection-'+this.title, 
      this.getUrl(),
      this
    ).then(
      (result: ApiProviderResult) => {
        result.getData().forEach(
          (data) => {
            this.objectProvider.set( data.id, data );
            temp_data.push( data );
          }
        );
        self.data = temp_data;
        console.warn(self.title+': SET DATA = ');
        console.log(temp_data);
        this.loaded = true;
      }
    );
  }

  public set(id, data) {
    console.info('ObjectProvider('+ this.title +')::set('+ id +')');
    this.data.push( data );
  }

}