import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import _ from "lodash";
useStrict(true);

class immFilterStore{
    @observable
    StartDate=null
    @observable
    EntDate=null
    @observable
    PlanState=0

    EnumPlanState=[
        {title:'未执行',value:0},
        {title:'已执行',value:1},
        {title:'忽略',value:2}]

    @action
    update(obj){
        Object.assign(this,this,obj);
    }

    @action
    read(config){
        this.StartDate=config.StartDate;
        this.EntDate=config.EntDate;
        this.PlanState=config.PlanState;
    }
}

immFilterStore = new immFilterStore();
export default immFilterStore;