import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ApiProviderResponse } from './response';
import { ApiProviderResult } from './result';
import { StorageProvider, StorageUnit } from '../storage/';

/**
 * APIProvider
 * 
 * 
 */
@Injectable()
export class ApiProvider {
  
  public data;
  private storage:StorageUnit;

  constructor( 
    private id:string, 
    public http:HttpClient, 
    private storageProvider:StorageProvider
  ) {
    this.storage = this.storageProvider.create('cache');
    this.data = new Map();
    console.log('Hello ApiProvider '+ id );
  }


  public loadFromClosest( url ) {
    console.log('API: loadFromClosest( '+ url +')');
    let self = this;

    return new Promise( function( resolve ) {
      self.storage.get( url ).then( (val) => {
        // Value is not in cache, load from API
        if( val == null ) {
          resolve( self.loadFromApi( url ) );
        } else {
          resolve(new ApiProviderResponse( url, true, true, val ));
        }
      });
    });
  }

  public loadFromApi( url ) {
    console.log('API: loadFromApi( '+ url +')');
    let self = this;

    return new Promise( function( resolve, reject ) {
      self.http.get(url).subscribe( (data) => {
        self.storage.set( url, data );
        resolve(new ApiProviderResponse( url, true, false, data ));
      });
    });
  }

  public get( id, url, parent ) {
    console.log('API.GET('+ id + ') FROM '+ url );
    
    let self = this;
    let Result = new ApiProviderResult( id, url );
    
    return new Promise( function( resolve, reject ) {
      self.loadFromClosest( url ).then( (result:ApiProviderResponse) => {
        console.group('API.GET('+ url + ') loadFromClosest().result:' );
        if( result.isSuccess() ) {     
          console.log(' - result is success');
          // TODO: data = parent::validate( result.getData() )
          // TODO: alt: validate byttes med convertToObject( result.getData() )
          console.log(' - validate data', result.getData() );
          let data = parent.validate( result.getData() );
          console.log(' - data after validation: ', data );
          if( data === false ) {
            console.log(' - data === false');
            console.groupEnd();
            reject({
              message: 'Parent did not validata data (follows)',
              parent: parent,
              data: result.getData()
            });
            return;
          }
          console.log(' - data passed validation');

          Result.setData( data );
          console.log(' - pass following data to parent:', data);
          console.log(Result);
          parent.set( Result.getId(), Result.getData() );
                    
          if( !result.isCached() ) {
            console.log(' - result was fetched from API');
            console.log('resolve Result', Result);
            console.groupEnd();
            resolve( Result );
          }
          // If it was a cached result - reload from live server
          else {
            console.log(' - result was fetched from cache. Reload. Result will follow outside current console.group');
            console.groupEnd();
            
            self.loadFromApi( result.getUrl() ).then( (result:ApiProviderResponse) => {
              console.group('API.GET('+ url + '): Re-fetched from API');
              if( result.isSuccess() ) {
                console.log(' - result is success');
                Result.setData( data );
                // Update cache
                self.data.set( Result );
                console.log(' - data was fetched from API.');
                console.log(' - got following data:', data, Result);
                
                // Hvis det er et objekt, vis at info nå kommer fra LIVE (API)
                /*
                if( typeof( data ) == 'object' && data != undefined ) {
                  console.log( typeof( data ) ) ;
                  console.log(data);
                  data.navn = data.navn + '(fresh from API)';
                  Result.setData( data );
                }
                */
                console.log(' - resolving');
                console.groupEnd();
                resolve( Result );
                return;
              }
              console.log(' - REJECT: Result returned failure');
              console.groupEnd();
              reject({
                message: 'Result returned failure',
                parent: parent,
                data: result
              });
            });
          }
        } else {
          console.warn('Auch, request failed:', result.getData());
          console.groupEnd();
          reject('AUCH, FAILED');
        }
      }).catch( (result) => {
        reject('AUCH, ERROR');
        console.warn('Auch, error:', result);
      });
    });
  }
}
