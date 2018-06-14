import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import _ from "lodash";
useStrict(true);

class ArticleModel {
    @observable id = '';
    @observable code = '';
    @observable title = '';
    @observable collected = false;
    @observable upvoted = false;
    @observable comments = 0;
    @observable collection_count = 0;
    @observable upvotes = 0;
}


class InfoStore {
    @observable article = {};
    @observable isLoading = true;
    @observable showCommentForm = false;
    @observable showShareModal = false;

    @observable comment_content = '';
    constructor(){}

    @action
    onLoad = (code) => {
        this.isLoading = true;
        request.getJson(urls.apis.CMS_GET_ARTICLE, {code: code}).then((res)=>{
            this.mapArticle(res);
        }).catch((e)=>{
            alert("异常：" + JSON.stringify(e));
        });
    }

    @action
    mapArticle(m){
        this.article = new ArticleModel();
        this.article.id = m.id;
        this.article.code = m.code;
        this.article.title = m.title;
        this.article.collected = m.collected;
        this.article.upvoted = m.upvoted;//本人是否已经点赞
        this.article.comments = m.comments;//总回复数
        this.article.collection_count = m.collection_count;//收藏次数
        this.article.upvotes = m.upvotes;//总点赞数
        this.isLoading = false;
    }
    
    @action
    openComment(){
        this.showCommentForm=true;
        this.showShareModal=false;
    }
    @action
    openShare(){
        this.showCommentForm=false;
        this.showShareModal=true;
    }
    @action
    closeModal(){
        this.showCommentForm=false;
        this.showShareModal=false;
    }




    @action
    onPostComment(){
        if(!this.comment_content || this.comment_content === ''){
            tools.showToast('评论内容不能为空');
            return;
        }
        if(!this.article.code || this.article.code === ''){
            tools.showToast('请等待网络响应');
            return;
        }

        request.postJson(urls.apis.CMS_POST_COMMENT,{
            code: this.article.code,
            comment: this.comment_content
        }).then((data) => {
            tools.showToast('评论成功!');
            this.closeModal();
            runInAction(()=>{
                this.comment_content = '';
                this.article.comments++;
            })
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }

    @action onChangText = (txt) => {
        this.comment_content = txt
    }

    @action
    onCollect(){
        request.postJson(urls.apis.CMS_POST_COLLECT, {cid: this.article.id, contentType: 1, operate: 1}).then((res)=>{
            runInAction(()=> {
                this.article.collected = !this.article.collected;
                tools.showToast(this.article.collected ? '已收藏' : '已取消收藏');
            });
        }).catch((e)=>{
            tools.showToast(JSON.stringify(e));
        });
    }
}

infoStore = new InfoStore();
export default infoStore;