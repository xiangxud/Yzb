import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import storeBase from "./common/storeBase";

useStrict(true);

class CameraEditStore extends storeBase {

    @observable
    data = {
        @observable
        Id: '',
        @observable
        StyId: '',
        @observable
            @validate(/\S+$/, '视频名称不能为空')
        Name: '',
        @observable
            @validate(/\S+$/, '视频流地址不能为空')
        Url: ''
    }

    @action
    onInit(c) {
        Object.assign(this.data, this.data, c);
        return this;
    }

    @action
    onUpdate(o) {
        Object.assign(this.data, this.data, o);
    }

    @action
    onCommit(callback, failed) {
        request.postJson(urls.apis.IMM_POST_CAMERA, this.data).then(data => {
            if (callback) {
                callback(data);
            }
        }).catch(err => {
            if (failed) {
                failed(err)
            }
        });
    }

    @action
    onCommitUpdate(callback, failed) {
        request.postJson(urls.apis.IMM_UPDATE_CAMERA, this.data).then(data => {
            if (callback) {
                callback(data);
            }
        }).catch(err => {
            if (failed) {
                failed(err)
            }
        });
    }
}

class CameraStore {
    @observable
    defaultId = ''

    @observable
    list = [];

    @action
    onInit(source, defaultCamera) {
        this.list = [];
        source.forEach(c => this.list.push(new CameraEditStore().onInit(c)));
        this.defaultId = defaultCamera;
    }

    @action
    onChangDefault(id, styId, callback, failed) {
        request.getJson(urls.apis.IMM_DEFAULT_CAMERA, {id: id, styId: styId}).then(data => {
            runInAction(() => {
                this.defaultId = id;
            });
            if (callback) {
                callback(data);
            }
        }).catch(err => {
            if (failed) {
                failed(err)
            }
        });
    }

    @action
    onPush(o) {
        this.list.push(o);
    }

    @action
    onUpdate(o) {
    }

    @action
    onRemove(id, callback, failed) {
        request.getJson(urls.apis.IMM_REMOVE_CAMERA, {id: id}).then((data) => {
            runInAction(() => {
                this.list.removeItem(o => o.data.Id == id);
            });
            callback(data);
        }).catch((err) => {
            failed(err);
        });
    }
}

export {CameraStore, CameraEditStore};
