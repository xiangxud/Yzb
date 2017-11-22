import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class breedItem{
    code="";
    title="";
    publised= new Date();
    source="";
    comments=0;
    publishFormate="";
}

class breedItemCollection {
    constructor(type){
        this.datatype=type;
    }

    @observable
    source=[];

    @observable
    end=true;

    @observable
    datatype="";

    @observable
    pageIndex=1;

    pageSize=8;

    @action
    onLoad(){
        this.source=[];
        this.end = false;
        this.pageIndex = 1;
        this.onLoadFromApi(this.pageIndex,(items)=>{
            this.onParse(items);
            this.onCloseEnd();
        },()=>{
            this.onCloseEnd();
        });
    };

    @action
    onLoadFromApi(index,callback,falied){
        request.postJson(urls.apis.CMS_PostArticleList,{pageIndex: index,pageSize:this.pageSize,Type:this.datatype}).then((data) => {
            callback(data);
        }).catch((err) => {
            falied();
        });
    }

    @action
    onParse(list)
    {
        list.forEach((e) => {
            let item = new breedItem();
            item.code = e.code;
            item.title=e.title;
            item.publised=e.create_date;
            item.source=e.copy_from;
            item.publishFormate=e.formate;
            this.source.push(item);
        })
    }

    @action
    onMore(){
        this.end = false;
        this.onLoadFromApi(this.pageIndex+1,(items)=>{
            this.onParse(items);
            this.pageIndex++;
            this.onCloseEnd();
        },()=>{
            this.onCloseEnd();
        });
    }

    @action
    onCloseEnd(){
        this.end = true;
    }
}

class hotBreedStore
{
    labels = ["肉蛋行情","原材料价格","疫病流行咨询"];

    @observable
    currentLabel="肉蛋行情";

    @action
    onChanged(label){
        this.currentLabel=label;
        if( label ==  this.labels[0] && this.data0.source.length==0){
            this.data0.onLoad();
        }
        if( label ==  this.labels[1] && this.data2.source.length==0){
            this.data1.onLoad();
        }
        if( label ==  this.labels[2] && this.data2.source.length==0){
            this.data2.onLoad();
        }
    }

    @observable
    data0 = new breedItemCollection(this.labels[0]);
    @observable
    data1 = new breedItemCollection(this.labels[1]);
    @observable
    data2 = new breedItemCollection(this.labels[2]);
}
hotBreedStore = new hotBreedStore();

export default hotBreedStore;