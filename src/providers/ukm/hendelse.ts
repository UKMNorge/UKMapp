import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime, Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from '../object/object';

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

  constructor( 
    _http:HttpClient, 
    storageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 'Hendelse', _http, storageProvider, Events );
    
    let self = this;
    storageProvider.unit('APP').get('monstring').then(
      (monstring_id) =>
      {
        self.monstring_id = monstring_id;
        this.url = this.url.replace('#monstring', monstring_id);
        //this.innslag = new InnslagIHendelseCollection( 'Hendelse'+ id );
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

  public sayHello() {
    console.warn('HELLOOOOOOO');
  }
  
  public filterLoadData( data ) {

    data.innslag.forEach( 
      (innslag) => {
        innslag = innslag.id
      }
    )

    return data;
  }
}
