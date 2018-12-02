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
  private url = 'https://api.ukm.no/2.0/hendelse/#id';

  constructor( 
    _http:HttpClient, 
    StorageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 'Hendelse', _http, StorageProvider, Events );
    console.log('Hi! I\'m HendelseProvider');
  }
  
  public validate( data:Hendelse ) {
    return data;
  }

  public getUrl( id ) {
    return this.url.replace('#id', id);
  }
}
