/**
 * Created by TomChow on 2017/11/13.
 */
import {observable, computed, action, runInAction, useStrict} from 'mobx'

useStrict(true);
class DidiStore {
    @observable vets = [];
    @observable current = {};
    @observable errorMsg = '';
    @observable isFetching = true;
    @observable position = {
        accuracy: 1,
        latitude: 39.907723,
        longitude: 116.391350,
    }
    @action setCurrent(vet){
        this.current = vet;
    }
    @action fetchVets = () => {
        const params = {count: 30, latitude: this.position.latitude, longitude: this.position.longitude};
        request.getJson(urls.apis.DIDI_NEARBY_VETS, params).then((res) => {
            runInAction(() => {
                this.vets = res;
                this.isFetching = false;
            });
        }).catch((error) => {
            tools.showToast(JSON.stringify(error))
        })
    }
    @action setMyPosition(po){
        this.position = po;
        if(po.accuracy > 0 && this.vets.length === 0){
            this.fetchVets();
        }
    }
}

didiStore = new DidiStore();
export default didiStore