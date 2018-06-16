/**
 * Created by TomChow on 2017/11/13.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'
import Geolocation from 'Geolocation';
import {RefreshState} from 'react-native-refresh-list-view';
import {persist} from 'mobx-persist'

useStrict(true);

class DidiStore {
    @observable pageIndex = 0;
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
    @observable active = false;
    @observable located = false;

    @action setCurrent = (vet) => { this.current = vet; this.active = false; }
    @action changeActive = () => { this.active = !this.active; }
    @action switch = () => {
        if (this.isFetching) {
            tools.showToast('正在获取您的位置，请稍后再试');
            return;
        }
        this.currentType = this.currentType === 'map' ? 'list' : 'map';
    }

    @action fetchVets = (isReload) => {
        this.isFetching = true;
        const params = {
            page: isReload ? 1 : this.pageIndex + 1,
            latitude: this.position.latitude,
            longitude: this.position.longitude
        };
        request.getJson(urls.apis.DIDI_NEARBY_VETS, params).then((data) => {
            runInAction(() => {
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
                let list_ = [];
                if (isReload) {
                    list_ = data;
                } else {
                    list_ = [...this.vets, ...data];
                }
                if (data.length > 0) {
                    this.vets.replace(list_);
                }
                this.pageIndex = isReload ? 1 : this.pageIndex + 1;
                this.refreshState = data.length === 0 ? (isReload ? RefreshState.EmptyData : RefreshState.NoMoreData) : RefreshState.Idle;
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
    @action onHeaderRefresh = () => {
        this.refreshState = RefreshState.HeaderRefreshing;
        this.fetchVets(true);
    }
    @action onFooterRefresh = () => {
        this.refreshState = RefreshState.FooterRefreshing;
        this.fetchVets(false);
    }

    @action getMyPosition(po) {
        /*this.getLongitudeAndLatitude().then((po) => {
            tools.showToast('已完成定位');
            runInAction(() => {
                this.position = po;
                this.located = true;
                if (po.accuracy > 0) {
                    this.vets.splice(0, this.vets.length);
                    this.onHeaderRefresh();
                }
            });
        }).catch((err) => {
            tools.showToast('定位失败，请稍后重试，'+err.message);
        });
        */
        this.position = po;
        this.located = true;
        this.vets.splice(0, this.vets.length);
        this.onHeaderRefresh();
    }

    /*
    @action
    getLongitudeAndLatitude = () => {
        //获取位置再得到城市先后顺序，通过Promise完成
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                location => {
                    //可以获取到的数据
                    var result = "速度：" + location.coords.speed +
                        "\n经度：" + location.coords.longitude +
                        "\n纬度：" + location.coords.latitude +
                        "\n准确度：" + location.coords.accuracy +
                        "\n行进方向：" + location.coords.heading +
                        "\n海拔：" + location.coords.altitude +
                        "\n海拔准确度：" + location.coords.altitudeAccuracy +
                        "\n时间戳：" + location.timestamp;
                    //alert("定位结果//" + result);
                    resolve(location.coords);
                },
                error => {
                    // Alert.alert("获取位置失败：" + error, "")
                    reject(error);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 10000
                }
            );
        })
    }*/
}

didiStore = new DidiStore();
export default didiStore