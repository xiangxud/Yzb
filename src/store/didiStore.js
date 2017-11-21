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

    @action setCurrent(vet){
        this.current = vet;
    }
    @action fetchVets = async () => {
        const params = {count: 30};
        request.getJson(urls.apis.DIDI_NEARBY_VETS, params).then((res) => {
            runInAction(() => {
                this.errorMsg = '';
                this.vets = res;
                this.isFetching = false;
            });
        }).catch((error) => {
            tools.showToast(JSON.stringify(error))
        })
    }
}

didiStore = new DidiStore();
export default didiStore