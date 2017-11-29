import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class addStyStore {
    @observable
    farm={};

    @observable
    genus=[];//种属列表

    @action
    onIni( farm ){
        this.farm=farm;

        this.getDictionaryFromApi((data)=>{
            this.genus = data;
        },(err)=>{
            alert(err);
        })
    }

    @action
    getDictionaryFromApi(callback,falied){
        debugger;
        request.getJson(urls.apis.DICTIONARY,{classification:this.farm.Breed}).then((data) => {
            debugger;
            callback(data);
        }).catch((err) => {
            falied(err);
        });
    }



}

addStyStore = new addStyStore();
export default addStyStore;