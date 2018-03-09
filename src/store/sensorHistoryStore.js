import {AsyncStorage} from 'react-native'
import {action, computed, observable,extendObservable, reaction, runInAction, useStrict} from 'mobx'
import tools from "../common/tools";

//环控数据
class SensorData {
    @observable
    label=""
}

class sensorHistoryStore {
    data={
        @observable now:{
            @observable temperature:24,
            @observable humidity:12,
            @observable o2c:2,
        },
        @observable list:[]
    }
    @observable loading=false
    @observable loadEnd=false
    pageIndex=0
    pageSize=15

    //数据拷贝
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

    @action onLoad(id){
        if( this.loadEnd ){
            //若数据加载到底，退出
            return;
        }

        if(this.loading){
            //若正在加载，退出
            return;
        }

        s=r=>{
            runInAction(()=>{
                this.loading=false;
                for( var i=0;i<r.length;i++){
                    t= new SensorData();
                    this.onShallCopy(t,r[i]);
                    this.data.list.push(t);
                }
                if(r.length < this.pageSize){
                    this.loadEnd=true;
                }
            });
        };

        eh=e=>{
            runInAction(()=>{
                this.loading=false;
                tools.showToast( JSON.stringify(e) );
            });
        };

        this.pageIndex++;
        this.loading=true;
        request.getJson(urls.apis.IMM_GET_GetSensorHistory,{
            id: id,
            pageIndex:this.pageIndex,
            pageSize:this.pageSize}).then(s.bind(this),eh.bind(this));
    }
}

export default new sensorHistoryStore();