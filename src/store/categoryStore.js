import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
useStrict(true);


class CtgModel {
    type_name = '';
    type_id = 0;
    code = '';
}

class CategoryStore {

    @observable categories = [];
    @observable isLoading = true;

    constructor(){
    }

    @action
    onLoad(){
        this.fetchState();
        this.getCtg((items)=>{
            this.mapCtg(items);
            this.fetchState();
        },(err)=>{
            tools.showToast('加载栏目失败');
            this.fetchState();
        });
    };

    @action
    getCtg(success, failed){
        request.getJson(urls.apis.CMS_CATEGORIES,{t: 1}).then((data) => {
            success(data);
        }).catch((err) => {
            tools.showToast('没有更多内容了');
            failed(err);
        });
    }


    @action
    mapCtg(list){
        //清空菜单
        this.categories.splice(0, this.categories.length);
        //默认添加【推荐】用于做用户喜好分析栏
        let recommend = new CtgModel();
        recommend.type_id = -2;
        recommend.code = '';
        recommend.type_name = '推荐';
        this.categories.push(recommend);

        //数据导入
        list.forEach((o)=>{
            let item = new CtgModel();
            item.type_id = o.Id;
            item.code = o.Code;
            item.type_name = o.Name;
            this.categories.push(item);
        })
    }

    @action
    fetchState(){
        this.isLoading = !this.isLoading;
    }
}

categoryStore = new CategoryStore();
export default categoryStore;