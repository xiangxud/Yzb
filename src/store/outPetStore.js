import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import storeBase from '../store/common/storeBase';

import _ from "lodash";
useStrict(true);

class outPetStore extends storeBase {
    farm={};
    styId="";
    @observable styName="";
    @observable otherStyOptions=[];//其它栋舍
    @observable batchsOptions=[];//其它批次
    @observable batchs=[];
    @observable showTransferSty=false;//是否显示转栏
    @observable showBatch=false;//是否批次管理

    data={
        Id:'',
        StyId:'',
        FarmId:'',
        @observable Genus:'',
        @observable Collection:{
            @observable Normal:'',
            @observable Death:'',
            @observable Eliminate:'',
            @observable Other:'',
            @observable Transfer:''
        },

        @validate(/^\+?[1-9]\d*$/, '日龄必填且为数值')
        @observable Day:'',
        @observable BatchNumber:'',
        @observable Type:1,//操作类型

        @validate(/\S+$/, '出栏日期必填且正确')
        @observable OutDate:'',//出栏日期
        @observable Reason:'',
        @observable TransferSty:'',//转移到的栋舍
        @observable TransferStyName:'',

        //验证信息
        @computed get validateItemTransferStyName(){
            //1、自定义验证
            if( this.Collection.Transfer && this.Collection.Transfer > 0 && (!this.TransferStyName || this.TransferStyName == null || this.TransferStyName=="") ){
                return "转移到栋舍必填";
            }else{
                return "";
            }
        },
    }

    onParse(  ){
        //待优化，这里的转换主要因为 this.data.Collection里的key，微信版为汉字Label
        let o = {};
        Object.assign( o , o , this.data );
        o.Collection={};
        for(var key in this.data.Collection){
            o.Collection[this.OutPetReasonTypeEum[key].Label]=this.data.Collection[key];
        }
        return o;
    }


    OutPetReasonTypeEum = {
        Normal: { Label: '销售出栏', Transfer: false },
        Death: { Label: '死亡', Transfer: false },
        Eliminate: { Label: '淘汰', Transfer: false },
        Other: { Label: '其他', Transfer: false },
        Transfer: { Label: '转栏', Transfer: true }
    };

    StyeOperationType = {
        AddPet: { Value: 0, Label: '补栏/补苗' },
        RemovePet: { Value: 1, Label: '出栏' },
        ClearSty: { Value: 2, Label: "清栏" }
    };

    BreedEnum = {
        Poultry: 0,//家禽
        Livestock: 1,//家畜
        PoultryAndLivestock: 2//家禽、家畜
    };
    @action
    onIni(paramter,callback,failed){
        let {styId,title,farm} = paramter;
        this.styId = styId;
        this.farm = farm;
        this.styName=title;
        this.getOutPetConfigFromApi((data)=>{
            this.updateConfig(data);
            if(callback){
                callback(data);
            }
        },failed);
    }

    getOutPetConfigFromApi(callback,falied){
        request.getJson(urls.apis.IMM_GET_OUTPETCONFIG,{styid:this.styId}).then((data) => {
            callback(data);
        }).catch((err) => {
            falied(err);
        });
    }

    onComiit(callback,falied){
        let o = this.onParse();
        request.postJson(urls.apis.IMM_POST_REMOVE_PET,o).then((data) => {
            callback(data);
        }).catch((err) => {
            falied(err);
        });
    }

    @action
    updateConfig(data) {
        this.data.FarmId = this.farm.Id;
        this.data.StyId = data.Id;
        this.data.Genus = data.Genus;
        this.showBatch = this.farm.Breed != this.BreedEnum.Poultry;
        this.batchs=data.BatchNumbers;

        this.batchsOptions=[];
        if(data.BatchNumbers && data.BatchNumbers!=null){
            data.BatchNumbers.forEach((item)=>{
                this.batchsOptions.push(item.BatchNumber);
            });
        }

        this.otherStyOptions=[];
        if(data.Other && data.Other!=null){
            data.Other.forEach((item)=>{
                this.otherStyOptions.push({ value: item.Id, text: item.Name , ico:'home' , iconColor: "#2c8ef4" });
            });
        }
    }

    @action
    onUpdate(uo){
        let oldBatchNumber=!this.data.BatchNumber || this.data.BatchNumber==null ? "":this.data.BatchNumber;
        Object.assign(this.data,this.data,uo);
        let newBatchNumber=!this.data.BatchNumber || this.data.BatchNumber==null ? "":this.data.BatchNumber;
        if(oldBatchNumber!=newBatchNumber){
            this.onChangedBatch(newBatchNumber);
        }
    }

    @action
    onUpdateCollection(key,value){
        this.data.Collection[key] = value;
        if( !this.showTransferSty && this.OutPetReasonTypeEum[key].Transfer && this.data.Collection[key] > 0 ){
            this.showTransferSty=true;
        }
    }

    @action
    onChangedBatch(batch){
        let item = this.batchs.fristOne(item=> item.BatchNumber==batch);
        this.onUpdate({ Day:item.Day });
    }
}

outPetStore = new outPetStore();
export default outPetStore;