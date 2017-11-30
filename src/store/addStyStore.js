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
        name:'',
        day:null,
        batchNumber:'',
        number:null,
        addDate:null
    }

    @action
    onChangedSty(uo){
        Object.assign(this.sty,this.sty,uo);
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
        request.getJson(urls.apis.IMM_DICTIONARY,{classification:this.farm.Breed}).then((data) => {
            debugger;
            callback(data);
        }).catch((err) => {
            falied(err);
        });
    }



}

addStyStore = new addStyStore();
export default addStyStore;