import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import _ from "lodash";
useStrict(true);

class alarmCollection{

    @observable
    count=0;

    @observable
    list=[];

    @observable
    showId='';

    @observable
    end=true
}

class immStore {
    queryConfig = {
        PageIndex:1,
        PageSize:10,
        StartDate:'2017-12-06',
        EntDate:'2017-12-08',
        PlanState:0,
        Config:true
    }

    @observable
    collection = new alarmCollection();

    @action
    onChanged(id){
        debugger;
        this.collection.showId=id;
    }

    @action
    fillList(rows){
        this.collection.list = rows;
    }

    @action
    onLoad(callback,falied){
        debugger;
        this.collection.end = true;
        this.getDataFromApi(data=>{
            this.collection.end = false;
            this.fillList(data);
            callback();
        },(err)=>{
            this.collection.end = false;
            if( falied ){
                falied(err);
            }
        });
    }

    @action
    getDataFromApi(callback,falied){
        request.postJson(urls.apis.IMM_GET_DETAIL,this.queryConfig).then(data=>{
            if(callback){
                callback(data.Rows);
            }
        }).catch(err=>{
            if( falied ){
                falied(err);
            }
        });
    }
}

immStore = new immStore();
export default immStore;