import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { Innslag } from './innslag';
import { ObjectMonstringAwareProvider } from '../object/object_monstringaware';

@Injectable()
export class InnslagDataProvider extends ObjectMonstringAwareProvider {

  constructor( 
    monstring_id,
    http:HttpClient, 
    StorageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 
        'InnslagData',
        'https://api.ukm.no/2.0/monstring-#monstring_id/innslag/#id',
        monstring_id,
        http,
        StorageProvider,
        Events
    );
    console.log('G’day! I\'m InnslagProvider');
  }

  init() {}
  
  public validate( data:Innslag ) {
    return data;
  }

  public filterLoadData( data ) {
    return data;
  }
}
