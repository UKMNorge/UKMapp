import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectWithoutApiProvider } from '../object/object_noapi';
import { ObjectProvider } from '../object';


export interface Innslag {
  id: number;
  navn: string;
  type: string;
  beskrivelse: string;
  kommune: any; // TODO spesifiser kommune
  kategori: string;
  sjanger: string;
  kategori_og_sjanger: string;
  bilde: any; // TODO spesifiser bilde
  bilder: any;
  artikler: any;
  filmer: any;
  personer: any;
  titler: any;
  tid: {
    sekunder: number;
    human: string;
    human_short: string;
    human_long: string;
  }
}

@Injectable()
export class InnslagProvider extends ObjectWithoutApiProvider {
  constructor(
    _http: HttpClient,
    StorageProvider: StorageProvider,
    Events: Events
  ) {
    super(
      'Innslag',
      StorageProvider,
      Events
    );
  }

  init() { }

  public validate(data: Innslag) {
    return data;
  }

  public filterLoadData(data) {
    return data;
  }
}