import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';

import _ from "lodash";
import storeBase from "./common/storeBase";
useStrict(true);

class addStyStore extends storeBase{
    @observable
    farm={};

    genus=[];//种属列表

    @observable
    data={
        @observable
        code:'',
        @observable
        @validate(/\S+$/, '种属必填')
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
        @validate(/^[1-9]\d*$/, '数量必填且为大于0')
        number:0,
        @observable
        @validate(/\S+$/, '入栏日期')
        addDate:'',
    }

    @action
    onChangedSty(uo){
        Object.assign(this.sty,this.sty,uo);
    }

    @action
    onIni(farm){
        this.farm=farm;
        this.getDictionaryFromApi((data)=>{
            this.genus = data;
        },(err)=>{
            alert(err);
        })
    }

    @action
    onEditIni(code,farm){
        this.farm = farm;
        this.getStyFromApi(code,data=>{
            this.onFillSty(data);
        },err=>{
            alert(err);
        });
    }

    @action
    onFillSty(data){
        this.sty.code=data.Id,
        this.sty.genus=data.Genus;
        this.sty.name=data.Name;
        this.sty.day=data.Day.toString();
        this.sty.number=data.Total.toString();
        this.sty.addDate=data.IniDate;
        this.genus=data.SourceGenus;
    }

    @action
    getStyFromApi(code,callback,falied) {
        request.getJson(urls.apis.IMM_GET_STY_BASE,{id:code}).then(data=>{
            callback(data);
        }).catch(err => {
            falied(err);
        });
    }

    @action
    onUpdateSty(callback,falied) {
        let item = {
            StyId: this.sty.code,
            Name: this.sty.name,
            Day: this.sty.day,
            Genus: this.sty.genus,
            Number: this.sty.number,
            AddDate: this.sty.addDate,
            BatchNumber: this.sty.batchNumber
        };
        request.postJson(urls.apis.IMM_POST_STY,item).then(data=>{
            callback(data);
        }).catch(err => {
            falied(err);
        });
    }

    @action
    getDictionaryFromApi(callback,falied){
        request.getJson(urls.apis.IMM_DICTIONARY,{classification:this.farm.Breed}).then((data) => {
            callback(data);
        }).catch((err) => {
            falied(err);
        });
    }

    @action
    onCommit( callback,falied ) {
        request.postJson(urls.apis.IMM_STYADD,{
            FarmName:this.farm.Name,
            Id:'00000000-0000-0000-0000-000000000000',
            Name:this.sty.name,
            Genus:this.sty.genus,
            IniPetDay:this.sty.day,
            IniPetCount:this.sty.number,
            IniPetDate:this.sty.addDate,
            BatchNumber:this.sty.batchNumber
        }).then((data)=>{
            callback(data);
        }).catch((err)=>{
            falied(err);
        });
    }
}

addStyStore = new addStyStore();
export default addStyStore;