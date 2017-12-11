import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import storeBase from '../store/common/storeBase';
import _ from "lodash";

useStrict(true);
class inPetStore extends storeBase{
    farm={};
    styId="";
    @observable styName="";
    @observable showBatch=false;//是否批次管理
    data={
        FarmId:'',
        StyId:'',
        @observable Genus:'',
        @validate(/^\+?[1-9]\d*$/, '日龄必填且为数值')
        @observable Number:'',
        @validate(/^\+?[1-9]\d*$/, '日龄必填且为数值')
        @observable Day:'',
        @validate(/\S+$/, '出栏日期必填且正确')
        @observable AddDate:'',
        @observable Type:0,
        @observable BatchNumber:''
    }

    @action
    onUpdate(uo){
        Object.assign(this.data,this.data,uo);
    }
    @action
    onIni(paramter,callback,failed){
        let {styId,title,farm} = paramter;
        this.styId = styId;
        this.farm = farm;
        this.styName=title;
    }
}

inPetStore = new inPetStore();
export default inPetStore;