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
    end=true

}

class immStore {
    queryConfig = {
        PageIndex:1,
        PageSize:10,
        StartDate:null,
        EntDate:null,
        PlanState:0,
        Config:true
    }

    @observable
    FilterConfig={
        @observable
        StartDate:null,
        @observable
        EntDate:null,
        @observable
        PlanState:0,
    }

    EnumPlanState=[
        {title:'未执行',value:0},
        {title:'已执行',value:1},
        {title:'忽略',value:2}]

    @action
    OnUpdateConfig(o){
        Object.assign(this.FilterConfig,this.FilterConfig,o);
    }

    @observable
    collection = new alarmCollection();


    @action
    clear(){
        this.collection.list=[];
    }

    @action
    fillList(rows){
        this.collection.list = rows;
        debugger;
        this.closeEnd();
    }

    @action
    addList(rows){
        rows.forEach(item=>{
            this.collection.list.push(item);
        });
        debugger;
        this.closeEnd();
    }

    @action
    closeEnd(){
        this.collection.end = true;
    }

    @action
    openEnd(){
        this.collection.end = false;
    }

    @action
    onMore(callback,falied){
        debugger;
        this.openEnd();
        this.queryConfig.PageIndex = this.queryConfig.PageIndex + 1;
        this.getDataFromApi(this.queryConfig,data=>{
            this.addList(data);
            callback();
        },(err)=>{
            this.closeEnd();
            if( falied ){
                falied(err);
            }
        });
    }

    @action
    onLoad(config,callback,falied){
        debugger;
        if(config){
            Object.assign(this.queryConfig,this.queryConfig,config);
        }
        this.openEnd();
        this.queryConfig.PageIndex=1;
        this.clear();
        this.getDataFromApi(this.queryConfig,data=>{
            this.fillList(data);
            if( callback && callback != null ) {
                callback()
            };
        },(err)=>{
            this.closeEnd();
            if( falied && falied != null ) {
                falied()
            };
        });
    }

    @action
    getDataFromApi(config,callback,falied){
        request.postJson(urls.apis.IMM_GET_DETAIL,config).then(data=>{
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