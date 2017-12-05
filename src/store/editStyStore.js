import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import camelCase from 'camelcase';

import _ from "lodash";
useStrict(true);

class editStyStore {
    @observable
    farm={};

    genus=[];//种属列表

    @observable
    sty={
        @observable
        code:'',
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
        Object.assign(this.sty,this.sty,uo);
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
    onInvalid(){
        if( !this.sty.isValid ){
        }
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

    onValidMess(){
        let mess = [];
        for(var key in this.sty){
            let info = this.getFiledValidMess(key);
            if( info && info != null && info != "" ){
                mess.push(info);
            }
        }
        return mess;
    }

    getFiledValidMess(name){
        let errNode = camelCase( 'validateError',name )
        if(this.sty[errNode] && this.sty[errNode] != null && this.sty[errNode]!=""){
            return this.sty[errNode];
        }
        return "";
    }
}

editStyStore = new editStyStore();
export default editStyStore;