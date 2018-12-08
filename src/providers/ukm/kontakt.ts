import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTime, Events } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage';
import { ObjectProvider } from '../object/object';
import { ObjectMonstringAwareProvider } from '../object/object_monstringaware';

export interface Kontakt {
  id: number;
  fornavn: string;
  etternavn: string;
  navn: string;
  tittel: string;
  telefon: string;
  epost: string;
  facebook: string;
  bilde:{};
}

@Injectable()
export class KontaktProvider extends ObjectMonstringAwareProvider {

  constructor( 
    monstring_id,
    http:HttpClient, 
    StorageProvider:StorageProvider, 
    Events: Events 
  ) {
    super( 
        'Kontakt',
        'https://api.ukm.no/2.0/monstring-#monstring_id/kontakt/#id',
        monstring_id,
        http,
        StorageProvider,
        Events
    );
    console.log('Morning! I\'m InnslagProvider');
  }
  
  public validate( data:Kontakt ) {
    return data;
  }

  public filterLoadData( data ) {
    return data;
  }
}
