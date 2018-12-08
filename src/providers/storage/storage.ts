import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageUnit } from './unit';
import { Events } from 'ionic-angular';

/**
 * SINGLETON: Storage provider
 * Collection of all storage units currently in app
 * 
 * Use create( $id ) and unit( $id ) to create and access the storage units
 * Persists to localstorage
 */
@Injectable()
export class StorageProvider {
  private units = new Map();
  private storage: Storage;

  /**
   * 
   * @param events 
   */
  constructor( 
    private events:Events 
  ) {
    // Init real storage (@ionic/storage)
    this.storage = new Storage(
      {}
    );
    console.log('Hello, I\'m StorageProvider');
  }

  /**
   * Create a new storage unit
   * Returned unit supposed to be used in var,
   * but is also accessible later by calling unit( id )
   *
   * @param id string
   */
  public create( id: string ) {
    this.units.set(id, new StorageUnit(id, this.storage, this.events ));
    return this.units.get(id);
  }

  /**
   * Access storage unit by id
   *
   * @param id
   */
  public unit( id: string ) {
    return this.units.get(id);
  }

  public clear() {
    
    this.units.forEach(
      (unit:StorageUnit) => {
        unit.clear();
      }
    )
  }
}