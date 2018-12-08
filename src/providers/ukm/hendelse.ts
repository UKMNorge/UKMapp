import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime, Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from '../object/object';
import { InnslagProvider } from './innslag';

export interface Hendelse {
  id: number;
  navn: string;
  sted: string;
  start: DateTime; 
  type: string;
  intern: boolean;
  detaljer: boolean;
  post_id: number;
  category_id: number;
}

@Injectable()
export class HendelseProvider extends ObjectProvider {
  private url = 'https://api.ukm.no/2.0/monstring-#monstring/program/#id'
  private monstring_id = false;
  private innslag = [];
  public innslag_objects = [];

  constructor( 
    http:HttpClient, 
    storageProvider:StorageProvider, 
    Events: Events,
    private innslagProvider: InnslagProvider
  ) {
    super( 'Hendelse', http, storageProvider, Events );
    
    let self = this;
    storageProvider.unit('APP').get('monstring').then(
      (monstring_id) =>
      {
        self.monstring_id = monstring_id;
        this.url = this.url.replace('#monstring', monstring_id);
        //this.innslagColl = new InnslagIHendelseCollection( 'Hendelse'+ id );
      }
    );
    console.log('Hi! I\'m HendelseProvider');
  }
  
  public validate( data:Hendelse ) {
    return data;
  }

  public getUrl( id ) {
    return this.url.replace('#id', id);
  }
  
  public filterLoadData( data ) {
    let self = this;

    data.innslag.forEach( 
      (innslag ) => {
        self.innslagProvider.set( innslag.id, innslag );
        
        // Subscribe to object updates
        // TODO: MOVE TO OBJECT, NOT ANON FUNCT
        self.innslagProvider.subscribe( 
          'update:'+innslag.id, 
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
    )

    return data;
  }
}
