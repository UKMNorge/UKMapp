import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SingleInfoPage } from './single';
import { WordpressProvider } from '../../providers/wordpress';
import { MonstringProvider } from '../../providers/ukm/monstring';
import { StorageProvider } from '../../providers/storage';
import { KontaktCollectionProvider } from '../../providers/ukm/kontakt.collection';
import { CallNumber } from '@ionic-native/call-number/ngx';


/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  public info = null;
  public post = null;
  public kontaktpersoner = null;
  public monstring = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storageProvider: StorageProvider,
    private monstringProvider: MonstringProvider,
    public wordpressProvider: WordpressProvider,
    public callNumber: CallNumber
  ) {

    let self = this;
    let storage = this.storageProvider.unit('APP');
    console.log(storage);
    if (storage != null) {
      storage.get('monstring').then(
        (monstring_id) => {
          self.setMonstringId(monstring_id);
          
          // 
          self.monstringProvider.getKontaktCollectionProvider().then(
            (kontaktCollectionProvider: KontaktCollectionProvider) => {
              console.group('KONTAKTPERSONER');
              kontaktCollectionProvider.load();
              self.kontaktpersoner = kontaktCollectionProvider;
              console.info("Logging self.kontaktpersoner: ", self);

            }
          );

        }
      )
    }
    this.info = this.wordpressProvider.getCategoryProvider('informasjon');
  }
  public setMonstringId(monstring_id) {
    let self = this;
    this.monstringProvider.subscribe('update', (_monstring) => {
      self.monstring = _monstring;
    });
    self.monstringProvider.get(monstring_id).then(
      (monstring) => {
        self.monstring = monstring;
      }
    ).catch((error) => {
      console.error('WTF');
      console.error(error);
    });
  }

  visInfo(item) {
    this.navCtrl.push(
      SingleInfoPage,
      {
        item: item
      }
    )
  }

  ringKontakt(nummer: string) {
    this.callNumber.callNumber(nummer, true)
    .then(res=>console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));  
  }
}