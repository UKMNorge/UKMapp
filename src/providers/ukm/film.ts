import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectWithoutApiProvider } from '../object/object_noapi';


export interface Film {
  kategori: {
      url: string;
      navn: string;
  }
  samling: {
      url: string;
      navn: string;
  }
  bilde: {
      url: string;
      width: number;
      height: number;
      orientation: string;
  }
  fil: {
      mobil: string;
      desktop: string;
  }
  url: string;
  navn: string;
  id: number;
}

@Injectable()
export class FilmProvider extends ObjectWithoutApiProvider {
  constructor(
    _http: HttpClient,
    StorageProvider: StorageProvider,
    Events: Events
  ) {
    super(
      'Film',
      StorageProvider,
      Events
    );
  }

  init() { }

  public validate(data: Film) {
    return data;
  }

  public filterLoadData(data) {
    return data;
  }
}