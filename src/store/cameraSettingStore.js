import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';

import _ from "lodash";
import storeBase from "./common/storeBase";
useStrict(true);

class camera extends storeBase{
    data={
        @observable
        id:'',
        @observable
        name:'',
    }

    @action
    onIni(o){
        this.data.id = o.Id;
        this.data.name=o.CameraName;
        return this;
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
}