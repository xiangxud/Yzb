import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'

useStrict(true);
class LiveStore {
    @observable pageIndex = 0;
    @observable pageIndex1 = 0;

    @observable focus_live = null;
    @observable list = [];
    @observable list1 = [];

    @observable isNoMore = false;
    @observable isNoMore1 = false;

    @observable isFetching = false;
    @observable isFetching1 = true;

    @observable kw = '';
    constructor(){
    }
    @action load = () =>{
        this.fetchFocus();
        this.fetchMore1();
    }
    @action fetchFocus = async() =>{
        if(this.focus_live != null){
            return;
        }
        request.getJson(urls.apis.CMS_LIVE_FOCUS).then((res)=>{
            runInAction(() => {
                this.focus_live = res;
            });
        }).catch((err)=>{

        })
    }
    //搜索
    @action fetchMore = async(next, kw) =>{
        if(kw){
            this.kw = kw;
        }
        if(!this.isNoMore || next) {
            this.isFetching = true;
            if(!next){
                this.pageIndex = 1;
            }else {
                this.pageIndex = this.pageIndex + 1;
            }
            request.getJson(urls.apis.CMS_LIVE_LIST, {page: this.pageIndex, t: -1, kw: this.kw}).then((res) => {
                runInAction(() => {
                    this.isFetching = false;
                    this.isNoMore = this.pageIndex === res.pagecount;

                    let ds = res.rows;
                    this.list.splice(this.list.length, 0, ...ds);
                });
            }).catch((err) => {
                runInAction(() => {
                    this.isFetching = false;
                });
                tools.showToast(err.message)
            });
        }
    }
    //列表
    @action fetchMore1 = async (next) => {
        if(!this.isNoMore1 || next) {
            this.isFetching1 = true;
            if(!next){
                this.pageIndex1 = 1;
            }else {
                this.pageIndex1 = this.pageIndex1 + 1;
            }
            request.getJson(urls.apis.CMS_LIVE_LIST, {page: this.pageIndex1, t: -1}).then((res) => {
                runInAction(() => {
                    this.isFetching1 = false;
                    this.isNoMore1 = this.pageIndex1 === res.pagecount;

                    let ds = res.rows;
                    this.list1.splice(this.list1.length, 0, ...ds);
                });
            }).catch((err) => {
                runInAction(() => {
                    this.isFetching1 = false;
                });
                tools.showToast(err.message)
            });
        }
    }
}
liveStore = new LiveStore();
export default liveStore;