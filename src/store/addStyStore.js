import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class addStyStore {

    @observable
    farmId="";

    @observable
    farmName="";

    @action
    onIni( id ){
        // this.onLoadFromApi(id,(data)=>{
        // },(err)=>{
        //     alert("获取栋舍详情失败");
        // });
    }
}

addStyStore = new addStyStore();
export default addStyStore;