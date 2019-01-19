import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from '../object/object';

export interface Innslag {
  id: number;
  navn: string;
  type: string;
  beskrivelse: string;
  kommune:any; // TODO spesifiser kommune
  kategori: string;
  sjanger: string;
  kategori_og_sjanger: string;
  bilde: any; // TODO spesifiser bilde
  bilder: any;
  filmer: any;
}

@Injectable()
export class InnslagProvider extends ObjectProvider {
  private url = 'https://api.ukm.no/2.0/innslag/#id';

  constructor( 
    _http:HttpClient, 
    StorageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 'Innslag', _http, StorageProvider, Events );
    console.log('Morning! I\'m InnslagProvider');
  }

  init() {}
  
  public validate( data:Innslag ) {
    return data;
  }

  public getUrl( id ) {
    return this.url.replace('#id', id);
  }
  public filterLoadData( data ) {
    return data;
  }
}
