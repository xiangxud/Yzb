import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import tools from "../common/tools";

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

class ArticleStoreModel
{
    @observable
    showModel=false//是否显示回复层
    @observable
    showShareModel=false//是否显示分享层

    @observable
    ready=false
    @observable
    allow_comment=false//是否允许回复
    @observable
    comment_count=""
    @observable
    comment_input_count=0//已经回复的字数
    @observable
    comment_text_total_count=10//回复的最大字数
    @observable
    comment_content=''//回复内容
    @observable
    exist_comment=false//本人是否已经回复
    @observable
    exist_collection=false//本人是否已经收藏
    @observable//收藏数
    collection_count=0
}

class InfoStore {
    labels = ["肉蛋行情","原材料价格","疫病流行咨询"];
    @observable
    currentLabel="肉蛋行情";



    @observable
    data=new ArticleStoreModel();

    @action
    onIni(code){
        this.data=new ArticleStoreModel();
        this.data.ready=false;
        request.getJson(urls.apis.Content_Article_GetArticleSummary,{code:code}).then(d=>{
            this.onLayout(d);
        },e=>{
            alert( "异常：" + JSON.stringify(e) );
        });
    }

    @action
    onLayout(m){
        this.data.showModel=false;
        this.data.showShareModel=false;
        this.data.ready=true;
        this.data.exist_comment=m.ExistComment;//本人是否已经回复
        this.data.comment_count=m.CommentCount;//总回复数
        this.data.exist_collection=m.ExistCollection;//本人是否已经点赞
        this.data.collection_count=m.CollectionCount;//总点赞数
    }
    
    @action
    onShowModel(){
        this.data.showShareModel=false;
        this.data.showModel=true;
    }
    @action
    onCloseModel(){
        this.data.showModel=false;
        this.data.showShareModel=false;
    }

    @action
    onShowShare(){
        this.data.showModel=false;
        this.data.showShareModel=true;
    }
    @action
    onCloseShare(){
        this.data.showModel=false;
        this.data.showShareModel=false;
    }


    @action
    onPostComment(code){
        if(!this.data.comment_content || this.data.comment_content==""){
            tools.showToast( "缺少回复内容");
            return;
        }
        if(!code || code==""){
            tools.showToast("数据不完整");
            return;
        }

        request.postJson(urls.apis.Content_Article_PostComment,{
            ArticleCode:code,
            Comment:this.data.comment_content
        }).then(data => {
            tools.showToast("评论成功!")
            this.onLayout(data);
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }

    @action
    onChangText(txt){
        this.data.allow_comment=txt.length> 0;
        if(txt.length > this.data.comment_text_total_count){
            txt = txt.substring(0,this.data.comment_text_total_count);
        }
        this.data.comment_content=txt;
        this.data.comment_input_count = txt.length;
    }

    @action
    onCollect(code){
        request.getJson(urls.apis.Content_Article_CollectArticle,{
            code:code,
            collect:true
        }).then(d=>{
            runInAction(()=>{
                this.data.exist_collection=true;
            })
        },e=>{
            //alert( JSON.stringify(e) );
        });
    }

    @action
    onCancleCollect(code){
        request.getJson(urls.apis.Content_Article_CollectArticle,{
            code:code,
            collect:false
        }).then(d=>{
            runInAction(()=>{
                this.data.exist_collection=false;
            })
        },e=>{
            //alert( JSON.stringify(e) );
        });
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