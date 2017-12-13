/**
 * Created by TomChow on 2017/11/13.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'

useStrict(true);
class HomeStore {
    @observable fields = {
        out: 0, //出栏
        in: 0, //入栏
        now: 0, //当前养殖量
        dead: 0, //死淘
        month_imm: 0, //本月免疫
    };
    @observable sties = [];
    @observable currentSty = {};
    @observable remindsCount=0;
    @observable reminds = [];
    @observable news = [];

    @observable pageIndex = 1;
    @observable isFetching = true;
    @observable isNoMore = true;
    @observable loadingMore = true;
    @observable farm = {};

    @action fetchHomeData = async () => {
        this.pageIndex = 1
        this.isFetching = true;
        request.getJson(urls.apis.HOME_ALL, {}).then((res) => {
            const {fields, sties, reminds, news, farm} = res;
            runInAction(() => {
                this.isFetching = false;
                this.fields = fields;
                this.sties = sties;
                this.farm = farm;
                this.reminds.replace(reminds);
                this.news.replace(news);
                if(sties && sties.length){
                    this.setCurrentSty(sties[0]);
                }
            });
        }).catch((err) => {
            tools.showToast(err.message)
            this.isFetching = false;
        })
    }

    @action fetchMore = async () => {
        if(this.isNoMore) {
            this.loadingMore = true;
            this.pageIndex = this.pageIndex + 1;
            request.getJson(urls.apis.INFORMATION_LIST, {page: this.pageIndex}).then((res) => {
                runInAction(() => {
                    this.loadingMore = false;
                    if (res.length < 15) {
                        this.isNoMore = false;
                    }
                    this.news.splice(this.news.length, 0, ...res);
                });
            }).catch((err) => {
                this.loadingMore = false;
                tools.showToast(err.message)
            });
        }
    }
    //设置当前选中的栋舍
    @action setCurrentSty(sty){
        this.currentSty = sty;
    }

    onChangedState(id,state,callback,falied){
        let item = this.reminds.fristOne(o=>o.id==id);
        if( item==null && falied ){
            falied("操作失败");
            return;
        }
        request.postJson(urls.apis.IMM_POST_IMPLEMENT,{PlanId:item.id,StyId:item.styId,State:state}).then(data=>{
            runInAction(()=>{
                this.remindsCount = this.reminds.removeItem(o=>o.id == id).length;
                if(callback) callback(data);
            });
        }).catch(err=>{
            if(falied)falied(err);
        });
    }
}

homeStore = new HomeStore()
export default homeStore