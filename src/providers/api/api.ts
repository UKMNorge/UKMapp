import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { ApiProviderResponse } from './response';
import { ApiProviderResult } from './result';
import { StorageProvider, StorageUnit } from '../storage/';
//import { isDifferent } from '@angular/core/src/render3/util';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {
  
  public data;
  private storage:StorageUnit;

  constructor( private id:string, public http:HttpClient, StorageProvider:StorageProvider ) {
    this.storage = StorageProvider.create('cache');
    this.data = new Map();
    console.log('Hello ApiProvider Provider');
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
        self.storage.set( url, JSON.stringify(data) );
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
        console.log('API.GET loadFromClosest().result' );
        if( result.isSuccess() ) {      
          console.log(' - success');
          // TODO: data = parent::validate( result.getData() )
          // TODO: alt: validate byttes med convertToObject( result.getData() )
          let data = parent.validate( result.getData() );
          if( data == false ) {
            console.log(' - failed validation');
            reject({
              message: 'Parent did not validata data (follows)',
              parent: parent,
              data: result.getData()
            });
          }
          console.log(' - passed validation');

          Result.setData( data );
          console.log(' - pass on to parent (follows)');
          console.log( data );
          console.log( Result );
          parent.set( Result.getId(), Result.getData() );
                    
          if( !result.isCached() ) {
            console.log('API.GET: Fetched from origin');
            console.log('resolving');
            resolve( Result );
          }
          // If it was a cached result - reload from live server
          else {
            console.log('API.GET: Fetched from cache');
            self.loadFromApi( result.getUrl() ).then( (result:ApiProviderResponse) => {
              console.log('API.GET: Now fetched from origin');
              if( result.isSuccess() ) {
                console.log(' - success');
                Result.setData( data );
                // Update cache
                self.data.set( Result );
                console.log('API.GET.END: data was fetched from API.');
                console.log('resolving');
                data.navn = 'LIVE: '+ data.navn;
                Result.setData( data );
                console.warn('DATA før resolve');
                console.log( Result.getData() );
                resolve( Result );
                return;
              }
              console.log('REJECT: Result returned failure');
              reject({
                message: 'Result returned failure',
                parent: parent,
                data: result
              });
            });
          }
        } else {
          reject('AUCH, FAILED');// console.warn('Auch, request failed:', result.getData());
        }
      }).catch( (result) => {
        reject('AUCH, ERROR');
        console.warn('Auch, error:', result);
      });
    });
  }
}
