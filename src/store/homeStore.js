/**
 * Created by TomChow on 2017/11/13.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'
import {get} from '../common/HttpTool'

useStrict(true);

export default class HomeStore {
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
    constructor(){
        this.isFetching = true;
        this.fetchHomeData();
    }

    @action fetchHomeData = async() =>{
        try {
            if (this.isFetching) {
                this.news_page = 1
            }
            const url = 'http://www.yinway.cn/homeData.js'
            const params = {}
            const responseData = await get({url, params, timeout: 30}).then(res => res.json())
            const {fields, reminds, news} = responseData
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
                //alert(this.reminds.length)
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
            alert(this.errorMsg)
        }
    }

    @action pageIncrease = () =>{
        this.news_page++
    }
    @computed
    get isLoadMore() {
        return this.news_page !== 1
    }
}