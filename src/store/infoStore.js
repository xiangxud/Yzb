/**
 * Created by TomChow on 2017/10/25.
 */
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'

class InfoStore {

    @observable count = "5";
    @observable showModel = false;
    @observable comment_text_total_count = 200;
    @observable comment_input_count = 0;
    @observable allow_comment = false;
    @observable comment = '';
    @observable info = {};

    @action
    getArticle = (info) => {
        this.count = info.hits > 9 ? '...' : info.hits.toString();
        this.info = info;
    };

    @action
    onFailed = (mess) => {
        tools.showToast(mess);
    };

    @action
    toogleModel = () => {
        this.showModel = !this.showModel;
    };

    @action
    onChangText = (e) => {
        let txt = e.nativeEvent.text;
        this.comment_input_count = txt.length;
        this.allow_comment = txt.length > 0;
        this.comment = txt;
    };

    @action
    postComment = (code, content, sucess, failed) => {
        request.postJson(urls.apis.CMS_Publish, {code: code, content: content}).then((data) => {
            sucess(data)
        }).catch((err) => {
            //err.Message
            failed("网络请求失败，请检查网络设置")
        });
    }
}

infoStore = new InfoStore();
export default infoStore