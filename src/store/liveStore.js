import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'

useStrict(true);
class LiveStore {
    @observable pageIndex = 0;
    @observable list = [];
    @observable currentType = true;
    @observable isNoMore = false;
    @observable isFetching = true;

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
        this.fetchMore();
    }
    @action fetchMore = async (next) => {
        if(!this.isNoMore || next) {
            this.isFetching = true;
            if(!next){
                this.pageIndex = 1;
            }else {
                this.pageIndex = this.pageIndex + 1;
            }
            request.getJson(urls.apis.CMS_LIVE_LIST, {page: this.pageIndex}).then((res) => {
                runInAction(() => {
                    this.isFetching = false;
                    if(this.pageIndex === res.pagecount){
                        this.isNoMore = true;
                    }
                    let ds = res.rows;
                    this.list.splice(this.list.length, 0, ...ds);
                    //alert(JSON.stringify(this.list))
                });
            }).catch((err) => {
                this.isFetching = false;
                tools.showToast(err.message)
            });
        }
    }
    @action switch =()=>{
        this.currentType = !this.currentType;
    }
}
liveStore = new LiveStore();
export default liveStore;