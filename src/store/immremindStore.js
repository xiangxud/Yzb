/**
 * Created by TomChow on 2017/11/13.
 */
import {observable, computed, action, runInAction} from 'mobx'
import {get} from '../common/HttpTool'

export default class ImmRemindStore {
    @observable page = 1;
    @observable reminds = [];
    @observable errorMsg = '';
    @observable isFetching = false;
    @observable isNoMore = true;
    constructor(){
        this.isFetching = true;
        this.fetchHomeRemind();
    }

    @action fetchHomeRemind = async() =>{
        try {
            if (this.isFetching) this.page = 1
            const url = 'http://food.boohee.com/fb/v1/feeds/category_feed'
            const params = {
                page: this.page,
                category: '',
                per: 10
            }
            const responseData = await get({url, params, timeout: 30}).then(res => res.json())
            const {feeds, page, total_pages} = responseData

            runInAction(() => {
                this.isFetching = false
                this.errorMsg = ''
                this.isNoMore = page >= total_pages

                if (this.page === 1) {
                    this.reminds.replace(feeds)
                } else {
                    this.reminds.splice(this.reminds.length, 0, ...feeds);
                }
                alert(this.page)
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        }
    }

    @action pageIncrease = () =>{
        this.page++
    }
    @computed
    get isLoadMore() {
        return this.page !== 1
    }
}