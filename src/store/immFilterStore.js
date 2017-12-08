import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import _ from "lodash";
useStrict(true);

class immFilterStore{
    @observable
    @validate(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, '开始日期必须为日期格式')
    StartDate=null

    @observable
    @validate(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, '截至日期必须为日期格式')
    EntDate=null

    @observable
    PlanState=0

    @action
    update(obj){
        Object.assign(this,this,obj);
    }
}

immFilterStore = new immFilterStore();
export default immFilterStore;