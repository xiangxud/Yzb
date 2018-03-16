import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'

useStrict(true);
class breedItem{
    code='';
    title='';
    publised= new Date();
    source='';
    comments=0;
    publishFormate='';
}

class breedItemCollection {
    constructor(type){
        this.datatype = type;
    }

    @observable searchTxt='';
    @observable source=[];
    @observable datatype='';
    @observable pageIndex=1;
    @observable more= true;
    @observable end= false;
    @observable isLoading = true;
    @observable pageSize=10;
    @observable go=true;

    @action
    onLoad(){
        this.source=[];
        this.end = false;
        this.pageIndex = 1;
        this.isLoading = true;
        this.onLoadFromApi(this.pageIndex, (items)=>{
            this.onParse(items);
            this.onCloseEnd();
        },(err)=>{
            this.onCloseEnd();
        });
    };

    @action
    onFilter(txt){
        this.searchTxt = txt;
        this.onLoad();
    }

    @action
    onLoadFromApi(index, callback, falied){
        request.getJson(urls.apis.CMS_ARTICLE_LIST,{page: index, size: this.pageSize, type: this.datatype, txt:this.searchTxt}).then((data) => {
            callback(data);
        }).catch((err) => {
            tools.showToast('没有更多内容了');
            falied(err);
        });
    }

    @action
    onParse(list) {
        list.forEach((e) => {
            let item = new breedItem();
            item.code = e.code;
            item.title = e.title;
            item.publised = e.create_date;
            item.source = e.copy_from;
            item.publishFormate = e.formate;
            this.source.push(item);
        });
    }

    @action
    onMore(){
        if(!this.more){
            return;
        }else {
            this.end = false;
            this.onLoadFromApi(this.pageIndex + 1, (items) => {
                this.onParse(items);
                if (items.length < this.pageSize) {
                    this.more = false;
                }
                this.pageIndex++;
                this.onCloseEnd();
            }, (err) => {
                this.onCloseEnd();
                this.more = false;
            });
        }
    }

    @action
    onCloseEnd(){
        this.end = true;
        this.isLoading = false;
    }
}

class InfoStore {
    labels = ["肉蛋行情","原材料价格","疫病流行咨询"];
    @observable
    currentLabel="肉蛋行情";

    @observable
    showModel=false;//是否显示回复层

    @observable
    data={
        @observable
        allow_comment:true,//是否允许回复
        @observable
        comment_count:5,
        @observable
        comment_input_count:0,//回复的最大字数
        @observable
        comment_text_total_count:500,//回复的最大字数
        @observable
        comment_content:''
    };

    @action
    onShowModel(){
        this.showModel=true;
    }

    @action
    onPostComment(code){
        request.postJson(urls.apis.Content_Article_PostComment,{
            ArticleCode:code,
            Comment:this.data.comment_content
        }).then(data => {
            alert("1");
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }

    @action
    onChangText(txt){
        this.data.comment_content=txt;
    }

    @action
    onCloseModel(){
        this.showModel=false;
    }

    @action
    onChanged(label){
        this.currentLabel = label;
        let data = this.onGetCurrentCollection();
        if( data != null && data.source.length == 0 ) {
            data.onLoad();
        }
    }


    @action
    onFilter(txt){
        let data = this.onGetCurrentCollection();
        if(data == null) {
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
            return this.data1;
        }
        if( this.currentLabel ==  this.labels[2]){
            return this.data2;
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

infoStore = new InfoStore();
export default infoStore;