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
    searchTxt="";

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
    onFilter(txt){
        this.searchTxt=txt;
        this.onLoad();
    }

    @action
    onLoadFromApi(index,callback,falied){
        request.postJson(urls.apis.CMS_PostArticleList,{pageIndex: index,pageSize:this.pageSize,Type:this.datatype,txt:this.searchTxt}).then((data) => {
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

class hotBreedStore {
    labels = ["肉蛋行情","原材料价格","疫病流行咨询"];

    @observable
    currentLabel="肉蛋行情";

    @action
    onChanged(label){
        this.currentLabel=label;
        let data = this.onGetCurrentCollection();
        if( data != null && data.source.length == 0 )
        {
            data.onLoad();
        }
    }


    @action
    onFilter(txt){
        let data = this.onGetCurrentCollection();
        if(data==null) {
            return;
        }
        data.onFilter(txt);
    }

    @action
    onGetCurrentCollection(){
        if( this.currentLabel ==  this.labels[0]){
            return this.data0;
        }
        if( this.currentLabel ==  this.labels[1]){
            return     this.data1;
        }
        if( this.currentLabel ==  this.labels[2]){
            return    this.data2;
        }
        return null;
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