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

    reportData={
        tem:{
            label:'温度',
            data:{
                title: {
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['室内','中区','室外'],
                    height:300
                },
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '1%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['23:00','00:00','01:00','02:00','03:00','04:00','07:00']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'室内',
                        type:'line',
                        stack: '室内',
                        data:[20.5, 21.2,22.5, 20.3, 20.1, 22.6, 25.0]
                    },
                    {
                        name:'中区',
                        type:'line',
                        stack: '中区',
                        data:[22.5, 22.2,25.5, 21.3, 19.1, 18.6, 19.0]
                    },
                    {
                        name:'室外',
                        type:'line',
                        stack: '室外',
                        data:[10, 11.2,12.5, 8.3, 10.1, 15.6, 7.0]
                    }
                ]
            }
        },
        hum:{
            label:'湿度',
            data:{
                title: {
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['室内','中区','室外'],
                    height:300
                },
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '1%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['23:00','00:00','01:00','02:00','03:00','04:00','07:00']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'室内',
                        type:'line',
                        stack: '室内',
                        data:[20.5, 21.2,22.5, 20.3, 20.1, 22.6, 25.0]
                    },
                    {
                        name:'中区',
                        type:'line',
                        stack: '中区',
                        data:[22.5, 22.2,25.5, 21.3, 19.1, 18.6, 19.0]
                    },
                    {
                        name:'室外',
                        type:'line',
                        stack: '室外',
                        data:[10, 11.2,12.5, 8.3, 10.1, 15.6, 7.0]
                    }
                ]
            }
        }
    }
    @observable
    currReport='tem'

    @action onChangedReport=(r)=>{
        this.currReport=r;
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
        this.queryObj.pageIndex=0;
        this.end=false;
        this.getData().then(this.sucess.bind(this),this.failed.bind(this));
    }
    @action onLoad=id=>{
        if( this.loading || this.end) {
            return;
        }
        this.queryObj.pageIndex++;
        this.getData().then(this.sucess.bind(this),this.failed.bind(this));
    }
    @action sucess=r=>{
        this.loading=false;//加载完成
        this.loadFinished=true;//加载完成
        this.data={};
        this.onShallCopy(this.data,r);
        if(this.data.Records.length < this.queryObj.pageSize){
            this.end=true;
        }
    }
    @action failed=e=>{
        this.loading=false;
        this.loadFinished=true;//加载完成
        tools.showToast("请求数据异常");
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