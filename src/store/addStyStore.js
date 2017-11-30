import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class addStyStore {
    @observable
    farm={};

    genus=[];//种属列表

    @observable
    sty={
        genus:'',
        name:''
    }

    @action
    onChangedGenus(genus)
    {
        this.sty.genus=genus;
    }
    @action
    onChangedName(name){
        this.sty.name = name;
    }

    @action
    onIni( farm ){
        this.farm=farm;

        debugger;

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