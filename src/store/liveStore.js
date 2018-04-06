import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'

useStrict(true);
class LiveStore {
    @observable pageIndex = 0;
    @observable pageIndex1 = 0;
    @observable pageIndex2 = 0;

    @observable currentType = 1;

    @observable list = [];
    @observable list1 = [];
    @observable list2 = [];

    @observable isNoMore = false;
    @observable isNoMore1 = false;
    @observable isNoMore2 = false;

    @observable isFetching = false;
    @observable isFetching1 = true;
    @observable isFetching2 = true;

    @observable kw = '';
    constructor(type){
        this.datatype = type;
    }
    @action load = () =>{
        /*this.list = [
            {url:'https://v.qq.com/x/page/c0386w6ppdr.html',photo:'https://m.ringpu.com/ringpu/public/images/live/live-106.jpg', title: '赵继勋教授-白羽商品肉鸡养殖的几个关键点-1', duration: '12:00'},
            {url:'https://v.qq.com/x/page/c0386w6ppdr.html',photo:'https://m.ringpu.com/ringpu/public/images/live/live-106.jpg', title: '赵继勋教授-白羽商品肉鸡养殖的几个关键点-2', duration: '15:00'},
            {url:'https://v.qq.com/x/page/c0386w6ppdr.html',photo:'https://m.ringpu.com/ringpu/public/images/live/live-106.jpg', title: '赵继勋教授-白羽商品肉鸡养殖的几个关键点-3', duration: '12:00'},
            {url:'https://v.qq.com/x/page/c0386w6ppdr.html',photo:'https://m.ringpu.com/ringpu/public/images/live/live-106.jpg', title: '赵继勋教授-白羽商品肉鸡养殖的几个关键点-4', duration: '22:00'},
            {url:'https://v.qq.com/x/page/c0386w6ppdr.html',photo:'https://m.ringpu.com/ringpu/public/images/live/live-106.jpg', title: '赵继勋教授-白羽商品肉鸡养殖的几个关键点-5', duration: '11:00'},
            {url:'https://v.qq.com/x/page/c0386w6ppdr.html',photo:'https://m.ringpu.com/ringpu/public/images/live/live-106.jpg', title: '赵继勋教授-白羽商品肉鸡养殖的几个关键点-6', duration: '7:00'},
            {url:'https://v.qq.com/x/page/c0386w6ppdr.html',photo:'https://m.ringpu.com/ringpu/public/images/live/live-106.jpg', title: '赵继勋教授-白羽商品肉鸡养殖的几个关键点-7', duration: '3:00'},
            {url:'https://v.qq.com/x/page/c0386w6ppdr.html',photo:'https://m.ringpu.com/ringpu/public/images/live/live-106.jpg', title: '赵继勋教授-白羽商品肉鸡养殖的几个关键点-8', duration: '3:00'},
        ];*/
        this.fetchMore1();
        this.fetchMore2();
    }
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
    @action fetchMore1 = async (next) => {
        if(!this.isNoMore1 || next) {
            this.isFetching1 = true;
            if(!next){
                this.pageIndex1 = 1;
            }else {
                this.pageIndex1 = this.pageIndex1 + 1;
            }
            request.getJson(urls.apis.CMS_LIVE_LIST, {page: this.pageIndex1, t: 1}).then((res) => {
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
    @action fetchMore2 = async (next) => {
        if(!this.isNoMore2 || next) {
            this.isFetching2 = true;
            if(!next){
                this.pageIndex2 = 1;
            }else {
                this.pageIndex2 = this.pageIndex2 + 1;
            }
            request.getJson(urls.apis.CMS_LIVE_LIST, {page: this.pageIndex2, t: 2}).then((res) => {
                runInAction(() => {
                    this.isFetching2 = false;
                    this.isNoMore2 = this.pageIndex2 === res.pagecount;

                    let ds = res.rows;
                    this.list2.splice(this.list2.length, 0, ...ds);
                });
            }).catch((err) => {
                runInAction(() => {
                    this.isFetching2 = false;
                });
                tools.showToast(err.message)
            });
        }
    }
    @action switch =()=> {
        this.currentType = this.currentType === 1 ? 2 : 1;
    }
}
liveStore = new LiveStore();
export default liveStore;