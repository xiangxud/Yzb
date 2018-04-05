import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx';
import tools from "../common/tools";

useStrict(true);

class breedItem {
    code = '';
    title = '';
    publised = new Date();
    source = '';
    comments = 0;
    publishFormate = '';
}

class breedItemCollection {
    constructor(type) {
        //this.datatype = type;
        runInAction(() => {
            this.datatype = "肉蛋行情";
        });
    }

    @observable searchTxt = '';
    @observable source = [];
    @observable datatype = '';
    @observable pageIndex = 1;
    @observable more = true;
    @observable end = false;
    @observable isLoading = true;
    @observable pageSize = 10;
    @observable go = true;

    @action
    onLoad() {
        this.source = [];
        this.end = false;
        this.pageIndex = 1;
        this.isLoading = true;
        this.onLoadFromApi(this.pageIndex, (items) => {
            this.onParse(items);
            this.onCloseEnd();
        }, (err) => {
            this.onCloseEnd();
        });
    };

    @action
    onFilter(txt) {
        this.searchTxt = txt;
        this.onLoad();
    }

    @action
    onLoadFromApi(index, callback, falied) {
        request.getJson(urls.apis.CMS_ARTICLE_COLLECTION, {
            page: index,
            size: this.pageSize,
            type: this.datatype,
            txt: this.searchTxt
        }).then((data) => {
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
    onMore() {
        if (!this.more) {
            return;
        } else {
            this.end = false;
            this.onLoadFromApi(this.pageIndex + 1, (items) => {
                this.onParse(items);
                if (items.length < this.pageSize) {
                    this.more = false;
                }
                this.pageIndex++;
                this.onCloseEnd();
            }, (err) => {
                runInAction(() => {
                    this.onCloseEnd();
                    this.more = false;
                });
            });
        }
    }

    @action
    onCloseEnd() {
        this.end = true;
        this.isLoading = false;
    }
}

class myCollectionStore {
    index = 0
    //分类
    labels = ['文章']
    currentLabel = "";

    @action
    onChanged(label) {
        this.currentLabel = label;
        let data = this.onGetCurrentCollection();
        if (data != null && data.source.length == 0) {
            data.onLoad();
        }
    }

    @observable
    data0 = new breedItemCollection(this.labels[0]);

    @action
    onGetCurrentCollection() {
        if (this.currentLabel == this.labels[0]) {
            return this.data0;
        }
        if (this.currentLabel == this.labels[1]) {
            return this.data1;
        }
        if (this.currentLabel == this.labels[2]) {
            return this.data2;
        }
        return null;
    }
}

export default new myCollectionStore();