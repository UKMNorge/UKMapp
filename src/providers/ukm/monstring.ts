import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime, Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from '../object/object';
import { KontaktCollectionProvider } from './kontakt.collection';
import { InnslagDataCollectionProvider } from './innslagdata.collection';
import { InnslagProvider } from './innslag';
import { InnslagCollectionProvider } from './innslag.collection';
import { FilmCollectionProvider } from './film.collection';

export interface Monstring {
  id: number;
  navn: string;
  sted: string;
  start: DateTime; 
  stop: DateTime;
  type: string;
  url: string;
}

@Injectable()
export class MonstringProvider extends ObjectProvider {
  private url = 'https://api.ukm.no/2.0/monstringer/#id';

  private kontaktCollectionProvider:KontaktCollectionProvider;
  private innslagDataCollectionProvider: InnslagDataCollectionProvider;
  private innslagCollectionProvider: InnslagCollectionProvider;
  private filmCollectionProvider: FilmCollectionProvider;

  constructor( 
    _http:HttpClient, 
    storageProvider:StorageProvider, 
    events: Events
  ) {
    super( 'Monstring', _http, storageProvider, events );
    console.log('Hello, I\'m MonstringProvider');
  }

  init() {}
  
  public validate( data:Monstring ) {
    return data;
  }

  public getUrl( id ) {
    return this.url.replace('#id', id);
  }

  public filterLoadData( data ) {
    return data;
  }

  public getKontaktCollectionProvider() {
    let self = this;
    return new Promise( 
      function( resolve ) {
        if( self.kontaktCollectionProvider != null ) {
          resolve( self.kontaktCollectionProvider );
          return;
        }

        self.getMonstring().then(
          monstring_id =>
          {
            self.kontaktCollectionProvider = new KontaktCollectionProvider( 
                monstring_id, 
                self.getHttp(), 
                self.getStorageProvider(), 
                self.getEvents()
            );
            resolve( self.kontaktCollectionProvider );
          }
        );
      }
    );
  }

  public getInnslagDataCollectionProvider() {
    let self = this;

    return new Promise(
      function( resolve ) {
        
        if( self.innslagDataCollectionProvider != null ) {
          resolve( self.innslagDataCollectionProvider );
          return;
        }

        self.getMonstring().then(
          (monstring_id) => {
            self.innslagDataCollectionProvider = new InnslagDataCollectionProvider(
              monstring_id,
              self.getHttp(),
              self.getStorageProvider(),
              self.getEvents()
            );
            resolve( self.innslagDataCollectionProvider );
          }
        );
      }
    );
  }

  public getInnslagCollectionProvider() {
    let self = this;
    return new Promise( 
      function( resolve ) {
        if( self.innslagCollectionProvider != null ) {
          resolve( self.innslagCollectionProvider );
          return;
        }

        self.getMonstring().then(
          monstring_id =>
          {
            self.innslagCollectionProvider = new InnslagCollectionProvider( 
                monstring_id, 
                self.getHttp(), 
                self.getStorageProvider(), 
                self.getEvents()
            );
            resolve( self.innslagCollectionProvider );
          }
        );
      }
    );
  }

  public getFilmCollectionProvider() {
    let self = this;
    return new Promise( 
      function( resolve ) {
        if( self.filmCollectionProvider != null ) {
          resolve( self.filmCollectionProvider );
          return;
        }

        self.getMonstring().then(
          monstring_id =>
          {
            self.filmCollectionProvider = new FilmCollectionProvider( 
                monstring_id, 
                self.getHttp(), 
                self.getStorageProvider(), 
                self.getEvents()
            );
            resolve( self.filmCollectionProvider );
          }
        );
      }
    );
  }

  public clear() {
    this.kontaktCollectionProvider = null;
    this.innslagCollectionProvider = null;
    this.filmCollectionProvider = null;
    super.clear();
  }

  public getMonstring() {
    return this.getStorageProvider().unit('APP').get('monstring');
  }
}
