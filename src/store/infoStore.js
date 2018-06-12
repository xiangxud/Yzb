import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'

useStrict(true);

class ArticleModel{
    id = '';
    code = '';
    title = '';
    summary = '';
    views = 0;
    face_url = '';
    copyright = '';
    create_date = '';
}

class CurrentArticleModel {
    @observable page = 1
    @observable categoryId = -2;
    @observable article_list = [];
    @observable isLoading = true;

    @action reload = (cid) =>{
        this.categoryId = cid;
        this.page = 1;
        this.article_list.splice(0, this.article_list.length);
    }
    @action
    mapArc(list) {
        // list.forEach((o) => {
        //     let item = new ArticleModel();
        //     item.id = o.id;
        //     item.code = o.code;
        //     item.title = o.title;
        //     item.views = o.views;
        //     item.summary = o.summary;
        //     item.create_date = o.create_date;
        //     item.copyright = o.copyright;
        //     item.face_url = o.face_url;
        //     this.article_list.push(item);
        // });

        this.page++;
        this.isLoading = false;
        this.article_list.splice(this.article_list.length, 0, ...list);
    }
}

class InfoStore {
    @observable arc = new CurrentArticleModel();
    constructor(){}

    @action
    onLoad = async(cid) =>{
        this.arc.reload(cid);
        this.loadArticles(1, (res) => {
            //alert(JSON.stringify(res));
            this.arc.mapArc(res);
        }, (err)=>{
            alert('error,'+JSON.stringify(err));
        });
    }

    @action
    onLoad_(code){
        request.getJson(urls.apis.CMS_ARTICLE_SUMMARY,{code:code}).then((res)=>{
            this.onLayout(res);
        },e=>{
            alert( "异常：" + JSON.stringify(e) );
        });
    }

    @action
    onLayout(m){
        //this.data.showModel = false;
        //this.data.showShareModel = false;
        //this.data.ready = true;
        //this.data.exist_comment=m.ExistComment;//本人是否已经回复
        //this.data.comment_count=m.CommentCount;//总回复数
        //this.data.collected = m.ExistCollection;//本人是否已经点赞
        //this.data.collection_count=m.CollectionCount;//总点赞数
    }
    
    @action
    onShowModel(){
        //this.data.showShareModel=false;
        //this.data.showModel=true;
    }
    @action
    onCloseModel(){
        //this.data.showModel=false;
        //this.data.showShareModel=false;
    }

    @action
    onShowShare(){
        //this.data.showModel=false;
        //this.data.showShareModel=true;
    }
    @action
    onCloseShare(){
       // this.data.showModel=false;
        //this.data.showShareModel=false;
    }

    @action
    loadArticles(page, callback, failed){
        tools.showToast(urls.apis.CMS_ARTICLE_LIST +'_'+ this.arc.page +'_'+ this.arc.categoryId)
        request.getJson(urls.apis.CMS_ARTICLE_LIST, {page: this.arc.page, ctg: this.arc.categoryId}).then((data) => {
            callback(data);
        }).catch((err) => {
            //tools.showToast('没有更多内容了');
            failed(err);
        });
    }



    /*
    @action
    onPostComment(code){
        if(!this.data.comment || this.data.comment === ""){
            tools.showToast( "缺少回复内容");
            return;
        }
        if(!code || code === ""){
            tools.showToast("数据不完整");
            return;
        }

        request.postJson(urls.apis.CMS_POST_COMMENT,{
            ArticleCode: code,
            Comment: this.data.comment
        }).then(data => {
            tools.showToast("评论成功!")
            this.onLayout(data);
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }*/

    @action
    onMore(){
        // if(!this.more){
        //     return;
        // }else {
            // this.end = false;
            // this.onLoadFromApi(this.pageIndex + 1, (items) => {
            //     this.onParse(items);
            //     if (items.length < this.pageSize) {
            //         this.more = false;
            //     }
            //     this.pageIndex++;
            // }, (err) => {
            //     this.more = false;
            // });
        //}
    }

    @action
    fetchEnd(){
        this.isLoading = false;
    }

    @action
    onChangText(txt){
        this.data.allow_comment=txt.length> 0;
        if(txt.length > this.data.comment_text_total_count){
            txt = txt.substring(0,this.data.comment_text_total_count);
        }
        this.data.comment_content = txt;
        this.data.comment_input_count = txt.length;
    }

    @action
    onCollect(code){
        request.postJson(urls.apis.CMS_POST_COLLECT,{
            code: code
        }).then((d)=>{
            runInAction(()=>{
                this.data.collected = !this.data.collected;
            })
        },e=>{
            //alert( JSON.stringify(e) );
        });
    }
}

infoStore = new InfoStore();
export default infoStore;