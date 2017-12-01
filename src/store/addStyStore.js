import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';

import _ from "lodash";
useStrict(true);

class addStyStore {
    @observable
    farm={};

    genus=[];//种属列表

    @observable
    sty={
        @observable
        genus:'',
        @observable
        @validate(/\S+$/, '栋舍名称必填')
        name:'',
        @observable
        @validate(/\d+$/, '日龄必填且为数值')
        day:null,
        @observable
        batchNumber:'',
        @observable
        number:null,
        @observable
        addDate:null,
        @observable
        submited:false
    }

    @action
    onChangedSty(uo){
        debugger;
        Object.assign(this.sty,this.sty,uo);
    }

    @action
    onIni(farm){
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