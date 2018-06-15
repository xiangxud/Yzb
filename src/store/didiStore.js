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
    @observable isFetching = false;
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
        const params = {page: this.pageIndex, latitude: this.position.latitude, longitude: this.position.longitude};
        request.getJson(urls.apis.DIDI_NEARBY_VETS, params).then((res) => {
            runInAction(() => {
                // if(this.pageIndex === 1){
                //     this.vets.replace(res);
                // }else{
                //     this.vets.splice(this.vets.length, 0, ...res);
                // }
                if(res.length > 0) {
                    this.vets.replace(res);
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
            tools.showToast(JSON.stringify(error))
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
        //this.locationInterval = 120000;
        this.vets.splice(0, this.vets.length);
        // {
        //     "id": 'guid',
        //     "name": "何金星",
        //     "phone": "13072252285",
        //     "head_photo": "https://m.ringpu.com/assets/images/user/201703/8CEB64B67ED9AEB5F9C366747DA93330_HD.png",
        //     "skill": "全科 疫病预防 实验室诊断 临床诊断 生物安全控制  场舍建设 饲养管理 动物营养 生产效益分析",
        //     "major_skill": "全科",
        //     "score_total": "总分",
        //     "score_avg": "平均分",
        //     "service_count": 0,
        //     "clinic_year": null,
        //     "latitude": 38.157626028762962,
        //     "longitude": 117.11688188301254,
        //     "vitae": "",
        //      "distance": "12公里",
        // }
        alert(JSON.stringify(po))
        if(po.accuracy > 0 && this.vets.length === 0){
            this.fetchVets(1);
        }
    }
}

didiStore = new DidiStore();
export default didiStore