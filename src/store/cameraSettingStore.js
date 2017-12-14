import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';

import _ from "lodash";
import storeBase from "./common/storeBase";
useStrict(true);

class camera extends storeBase{
    data={
        @observable
        Id:'',
        StyId:'',
        @observable
        @validate(/\S+$/, '摄像头名称必填')
        Name:'',


    }

    @action
    onIni(o){
        Object.assign(this.data,this.data,o);
        return this;
    }
    @action
    onUpdate(o){
        Object.assign(this.data,this.data,o);
    }
    @action
    onCommit(callback,failed){
        request.postJson(urls.apis.IMM_POST_CAMERA,this.data).then(data=>{
            if(callback){
                callback(data);
            }
        }).catch(err=>{
            if(failed){
                failed(err)
            }
        });
    }
    @action
    onCommitUpdate(callback,failed){
        request.postJson(urls.apis.IMM_UPDATE_CAMERA,this.data).then(data=>{
            if(callback){
                callback(data);
            }
        }).catch(err=>{
            if(failed){
                failed(err)
            }
        });
    }
}

export default class cameraSettingStore{
    @observable
    defaultId=''

    @observable
    list=[];

    @action
    onIni(source,id){
        this.list=[];
        source.forEach(item=>this.list.push( new camera().onIni(item)));
        this.defaultId=id;
    }
    @action
    onChangDefault(id){
        this.defaultId=id;
    }
    @action
    onPush(o){
        this.list.push(o);
    }
    @action
    onUpdate(o){
    }
}

export {camera};