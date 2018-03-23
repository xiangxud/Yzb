import {AsyncStorage} from 'react-native'
import {action, computed, extendObservable, observable, reaction, runInAction, useStrict} from 'mobx'
import tools from "../common/tools";
useStrict(true);

class styReportStore {
    @observable
    data={
    }
    queryObj={
        pageIndex:0,
        pageSize:25,
        id:''
    }

    @observable
    loading=false;

    @observable
     end=false;

    @observable
    loadFinished=false;//加载完成

    requestApi=()=>{
        return request.getJson(urls.apis.IMM_STY_DAYREPORT,this.queryObj)
    }
    @action onIni=(id)=>{
        this.queryObj.id=id;
        this.getData().then(this.sucess.bind(this),this.failed.bind(this));
    }
    @action sucess=r=>{
        this.loading=false;//加载完成
        this.loadFinished=true;//加载完成
        this.onShallCopy(this.data,r);
        if(this.data.Records.length < this.queryObj.pageSize){
            this.end=true;
        }
    }
    @action failed=e=>{
        this.loading=false;
        this.loadFinished=true;//加载完成
        alert(JSON.stringify(e));
    }
    @action getData=()=>{
        this.queryObj.pageIndex++;
        this.loading=true;
        return this.requestApi();
    }
    @action onShallCopy(t,s){
        for(let key in s){
            if( t[key] == undefined ){
                let o={};
                o[key] = s[key];
                extendObservable(t,o);
            }else{
                t[key]=s[key];
            }
        }
    }
}
export default new styReportStore();