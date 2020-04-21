import {openDB, deleteDB, wrap, unwrap} from 'idb';

const DB_STORE_NAME = 'ID';
const DB_NAME = 'chatID';
const DB_STORE_KEY = 'chat';

class DbService {
    constructor() {
        this.userObject = {};
        this.db = null;
        this.db = openDB(DB_NAME, 10, {
            upgrade(db) {
                db.createObjectStore(DB_STORE_NAME);
            }, });
    }

    async getUserId(userObject) {
        await this.db.then((db) => {
            return db.get(DB_STORE_NAME, DB_STORE_KEY).then(async value => {
                if (typeof value === 'undefined') {
                    if(userObject === null){
                        userObject = {};
                    }
                    await db.put(DB_STORE_NAME, userObject, DB_STORE_KEY).then(() => {
                        console.log('id saved');
                        this.userObject = userObject;
                    }).catch(err => {
                        console.log('error during saving user id');
                        console.log(err);
                    });
                } else {
                    console.log('id ready');
                    this.userObject = value;
                }
            }).catch(err => {
                console.log('error during selecting user id');
                console.log(err);
            });
        });
    }

    async putUser(userObject) {
        await this.db.then((db) => {
            return db.put(DB_STORE_NAME, userObject, DB_STORE_KEY).then(() => {
                console.log('id saved');
                this.userObject = userObject;
            }).catch(err => {
                console.log('error during saving user id');
                console.log(err);
            });
        });
    }
}

export {DbService as default};
