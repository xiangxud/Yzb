import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx';

useStrict(true);

class ArticleModel {
    code = '';
    title = '';
    source = '';
    comments = 0;
}

class ArticleCollection {
    @observable pageIndex = 1;
    @observable isLoading = true;
    @observable more = true;
    @observable list = [];

    constructor() {
    }

    @action
    init() {
        this.pageIndex = 1;
        this.loadArticle();
    };

    @action fetchArticle(index, callback, failed) {
        request.getJson(urls.apis.CMS_MY_COLLECTED_ARTICLES, { page: index }).then((data) => {
            callback(data);
        }).catch((err) => {
            failed(err);
        });
    }

    @action
    mapArticle(items) {
        items.forEach((e) => {
            let item = new ArticleModel();
            item.code = e.code;
            item.title = e.title;
            this.list.push(item);
        });
        this.pageIndex++;
        if (items.length < 10) {
            this.more = false;
        }
        this.end();
    }

    @action
    loadArticle() {
        if (!this.more) {
            return;
        } else {
            this.isLoading = true;

            this.fetchArticle(this.pageIndex, (items) => {
                this.mapArticle(items);
            }, (err) => {
                this.end();
                tools.showToast('系统错误,' + JSON.stringify(err));
            });
        }
    }

    @action end() {
        this.isLoading = false;
    }
}

class MyCollectionStore {

    typeLabels = ['文章', '兽医'];
    @observable currentIndex = 0;
    @observable currentLabel = '文章';

    @observable data_article = new ArticleCollection();
    @observable data_vet = null;

    @action
    onChanged(index) {
        if(index > this.typeLabels.length) {
            tools.showToast('切换失败，分类配置错误');
            return;
        }
        this.currentIndex = index;
        this.currentLabel = this.typeLabels[index];
        this.processCurrentTabContext();
    }

    @action
    processCurrentTabContext = () : void => {
        if (this.currentLabel == this.typeLabels[0]) {
            if(this.data_article.list.length === 0){
                this.data_article.init();
            }
        }
        if (this.currentLabel == this.typeLabels[1]) {
            tools.showToast('VET IS NOT IN SERVICE');
        }
        return null;
    }
}

myCollectionStore = new MyCollectionStore();
export default myCollectionStore;