import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
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

    ENUM_CONTENT_OPERATE = {
        Collect: 1,
        Like : 2,
        UnLike: 3,
    }
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
    onOperate(operate, success){
        request.postJson(urls.apis.CMS_POST_OPERATE, {cid: this.article.id, contentType: 1, operate: operate}).then((res)=>{
            success(res);
        }).catch((e)=>{
            tools.showToast(JSON.stringify(e));
        });
    }
    @action onCollect = (): void => {
        this.onOperate(this.ENUM_CONTENT_OPERATE.Collect, (res) => {
            runInAction(() => {
                this.article.collected = !this.article.collected;
                tools.showToast(this.article.collected ? '已收藏' : '已取消收藏');
            })
        });
    }
    @action onLike = (): void=> {
        this.onOperate(this.ENUM_CONTENT_OPERATE.Like, (res) => {
            runInAction(() => {
                this.article.upvoted = !this.article.upvoted;
                tools.showToast(this.article.upvoted ? '已赞' : '取消赞');
            })
        });
    }
}

infoStore = new InfoStore();
export default infoStore;