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

    @observable reminds = [];
    @observable news = [];

    @observable news_page = 1;
    @observable errorMsg = '';
    @observable isFetching = false;
    @observable isNoMore = true;

    constructor() {
        this.isFetching = true;
    }

    @action fetchHomeData = async () => {
        if (this.isFetching) {
            this.news_page = 1
        }
        const params = {}
        request.getJson(urls.apis.HOME_ALL, params).then((res) => {
            const {fields, reminds, news} = res;
            runInAction(() => {
                this.isFetching = false
                this.errorMsg = ''
                if (this.news_page === 1) {
                    this.fields = fields;
                    this.reminds.replace(reminds);
                    this.news.replace(news);
                } else {
                    this.reminds.splice(this.reminds.length, 0, ...reminds);
                }
            });
        }).catch((error) => {
            tools.showToast(JSON.stringify(error))
        })
    }

    @action fetchNextInfos = async () => {
        this.isFetching = true;
        this.news_page = this.news_page + 1;
        request.getJson(urls.apis.INFORMATION_LIST, {page: this.news_page}).then((res) => {
            runInAction(() => {
                this.isFetching = false;
                this.news.splice(this.news.length, 0, ...res);
                //alert(JSON.stringify(res))
            });
        }).catch((error) => {
            this.isFetching = false;
            tools.showToast(JSON.stringify(error))
        });
    }

    @computed
    get isLoadMore() {
        return this.news_page !== 1
    }
}

homeStore = new HomeStore()
export default homeStore