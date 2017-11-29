import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import { persist } from 'mobx-persist'
import hydrate from "../common/hydrate";
import _ from "lodash";

useStrict(true);

class BHUserStore {
    //loginForm
    @observable
    appid='yangzhibaoV2';

    @observable
    appsecrect='e378297724414a1383291c3b82852f50';

    //userSession
    @observable hydrated = false;

    @persist('object') @observable loginUser = {};
    @persist('object') @observable location = {};

    @action setLoginUser = (u) =>{
        this.loginUser = u;
    }

    @action login(){
        request.getJson(urls.apis.BH_LOGIN, {appid: this.appid, appsecrect: this.appsecrect}).then((res)=>{
            alert('ok,'+JSON.stringify(res));
        }).catch((err)=>{
            alert(JSON.stringify(err));
        })
    }

}

const bhUserStore = new BHUserStore();
export default bhUserStore;

hydrate('bhUser', bhUserStore).then(() => {
    bhUserStore.hydrated = true;
});