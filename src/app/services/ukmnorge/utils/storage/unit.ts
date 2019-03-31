import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';

/**
 * Storage unit
 * 
 * Wrapper for @ionic/storage, prefixing (automatically) all values
 * by storage unit ID
 */
export class StorageUnit extends Events {
    // Internal container of data, to keep stuff in memory
    private data = new Map();

    /**
     * Create a new storage unit
     * @param id 
     * @param storage 
     */
    constructor(
        private id: string,
        private storage: Storage
    ) {
        super();
        //console.log('Nei Ho! I\'m StorageUnit ' + this.id + ', and I\'m here to safeguard stuff');
    }

    /**
     * Store the value of key
     * Internally, storage unit id prefixes storage key
     * 
     * @param key 
     * @param value 
     * @return void
     */
    public set(key: string, value: any) {
		//value = JSON.stringify( value );
        this.storage.set(this._key(key), value);
        this.data.set(key, value);
        this.publish('set:' + key, value);
    }

    /**
     * Get value of key
     * 
     * @param key 
     * @return Returns a promise that resolves the value
     */
    public get(key: string) {
        let storage = this.storage;
        let self = this;

        return new Promise(
            (resolve) => {
				// Value stored in JS map
				/*
                if (self.data.has(key)) {
                    console.info('StorageUnit(' + self.id + ')::get #hasInMap resolve:', self.data.get(key));
                    resolve(self.data.get(key));
				}
				*/

                // Update key to prefixed key
                key = self._key(key);

                // Fetch from storage
                storage.get(key).then(
                    (val) => {
                        // Value not in storage, resolve null
                        if (null == val || undefined == val) {
                            //console.warn('StorageUnit(' + self.id + ')::get('+ key +') #notInStorage resolve:', null);
                            resolve(null);
                        }
                        try {
                            // Value is JSON, resolve as object
                            let jsondata = JSON.parse(val);
                            //console.warn('StorageUnit(' + self.id + ')::get('+ key +') #JSONsuccess resolve:', jsondata);
                            resolve(jsondata);
                        } catch {
                            // Value was not JSON-data, resolve string, object, whatevva
                            //console.warn('StorageUnit(' + self.id + ')::get('+ key +') #JSONerror ('+ typeof (val) +') resolve:', val);
                            resolve(val);
                        }
                    }
                );
            }
        );
    }

    /**
     * Remove (delete) value from storage unit
     * @param key 
     */
    public remove(key: string) {
        this.publish('remove:' + key, null);
        return this.storage.remove(this._key(key));
    }

    /**
     * Clear storage of this unit
     */
    public clear() {
        return this.storage.clear();
    }

    /**
     * Helper: Calculate the storage key based on value-key
     * 
     * @param key 
     * @return String key
     */
    private _key(key: string) {
        return this.id + '|' + key;
    }
}