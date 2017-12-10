import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';

import _ from "lodash";
useStrict(true);

class outPetStore {
    farm={};
    styId="";
    styName="";

    @observable
    otherStyOptions=[];//其它栋舍

    @observable
    batchsOptions=[];//其它批次
    batchs=[];


    data={
        Id:'',
        StyId:'',
        FarmId:'',
        @observable
        Genus:'',
        @observable
        Number:'',
        @observable
        Day:0,
        @observable
        BatchNumber:'',
        @observable
        Type:1,//操作类型
        @observable
        OutDate:'',//出栏日期
        @observable
        Reason:'',
        @observable
        TransferSty:''//转移到的栋舍
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
        Poultry: 0,
        Livestock: 1,
        PoultryAndLivestock: 2
    };

    onIni(paramter,callback,failed){
        let {styId,farm} = paramter;
        this.styId = styId;
        this.farm = farm;

        debugger;
        this.getOutPetConfigFromApi((data)=>{
            debugger;
            //批次
            this.batchs=data.BatchNumbers;
            this.fillBatchNumberOptions(data.BatchNumbers);
            //其它栋舍
            this.fillOtherStyOptions(data.Other);
            if(callback){
                callback(data);
            }
        },failed);
    }

    getOutPetConfigFromApi(callback,falied){
        request.getJson(urls.apis.IMM_GET_OUTPETCONFIG,{styid:this.styId}).then((data) => {
            debugger;
            callback(data);
        }).catch((err) => {
            debugger;
            falied(err);
        });
    }

    @action
    fillBatchNumberOptions(source){
        if(source && source!=null){
            source.forEach((item)=>{
                this.batchsOptions.push({ value: item.BatchNumber, title: item.BatchNumber });
            });
        }
    }
    @action
    fillOtherStyOptions(source){
        if(source && source!=null){
            source.forEach((item)=>{
                this.otherStyOptions.push({ value: item.Id, title: item.Name });
            });
        }
    }

    //查找指定的批号对应的元素值
    onGetBatchByCode(code){
        return this.batchs.fristOne(item=> item.BatchNumber==code);
    }
}

outPetStore = new outPetStore();
export default outPetStore;