/**
 * Created by TomChow on 2017/11/13.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'
import {RefreshState} from 'react-native-refresh-list-view';
import { persist } from 'mobx-persist'

useStrict(true);
class DidiStore {
    @observable pageIndex = 1;
    @observable pageSize = 5;
    @observable refreshState = RefreshState.Idle;
    @persist @observable vets = [];
    @observable current = {};
    @observable currentType = 'list';
    @observable errorMsg = '';
    @observable isFetching = true;
    @observable locationInterval = 2000;
    @observable position = {
        accuracy: 1,
        latitude: 39.13,
        longitude: 117.20,
    }
    @action setCurrent(vet){
        this.current = vet;
    }
    @action switch(){
        if(this.isFetching){
            tools.showToast('正在获取您的位置，请稍后再试');
            return;
        }
        this.currentType = this.currentType === 'map'? 'list': 'map';
    }
    @action fetchVets = (page) => {
        const params = {count: this.pageSize, page: page, latitude: this.position.latitude, longitude: this.position.longitude};
        request.getJson(urls.apis.DIDI_NEARBY_VETS, params).then((res) => {
            runInAction(() => {
                if(this.pageIndex === 1){
                    this.vets.replace(res);
                }else{
                    this.vets.splice(this.vets.length, 0, ...res);
                }
                this.refreshState = res.length > this.pageSize ? RefreshState.NoMoreData : RefreshState.Idle,
                this.pageIndex++;
                this.isFetching = false;
            });
        }, (error) => {
            runInAction(() => {
                this.isFetching = false;
                this.refreshState = RefreshState.Failure;
            });
            tools.showToast(error)
        });
    }
    @action onHeaderRefresh=()=>{
        this.pageIndex = 1;
        this.refreshState = RefreshState.HeaderRefreshing;
        this.fetchVets(this.pageIndex);
    }
    @action onFooterRefresh=()=>{
        this.refreshState = RefreshState.FooterRefreshing;
        this.fetchVets(this.pageIndex);
    }
    @action setMyPosition(po){
        this.position = po;
        this.locationInterval = 120000;
        if(po.accuracy > 0 && this.vets.length === 0){
            this.fetchVets(this.pageIndex);
        }
    }
}

didiStore = new DidiStore();
export default didiStore