import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageUnit } from './unit';
import { Events } from 'ionic-angular';
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  private units = new Map();
  private storage: Storage;
  constructor(private events: Events) {
    this.storage = new Storage({});
    console.log('Hello, I\'m StorageProvider');
  }
  init() { }
  /**
   * Create a new storage unit
   * Returned unit supposed to be used in var,
   * but is also accessible later by calling unit( id )
   *
   * @param id string
   */
  public create(id: string) {
    this.units.set(id, new StorageUnit(id, this.storage, this.events));
    return this.units.get(id);
  }
  /**
   * Get unit by id
   *
   * @param id
   */
  public unit(id: string) {
    return this.units.get(id);
  }
}