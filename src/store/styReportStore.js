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
    option = {
        title: {
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
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
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

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