import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import validate from 'mobx-form-validate';
import storeBase from "./common/storeBase";

useStrict(true);
class AddFarmStore extends storeBase{
    @observable sales = [];//销售列表
    @observable area = [];//地区
    @observable
    data = {
        @observable
        @validate(/\S+$/, '养殖场名称不能为空')
        farmName: '',

        @observable
        @validate(/\S+$/, '养殖场联系人不能为空')
        contactPerson: '',

        @observable
        @validate(/\S+$/, '养殖场联系方式不能为空')
        contactPhone: '',

        @observable emailNo: '',

        @observable farmCode: null,

        @observable
        @validate(/\S+$/, '请选择养殖场所在省份')
        province: '',

        @observable
        @validate(/\S+$/, '请选择养殖场所在城市')
        city: '',

        @observable
        @validate(/\S+$/, '养殖场详细地址不能为空')
        address: '',

        @observable
        @validate(/\S+$/, '请选择销售')
        salesId: '',

        @observable sales: '',
    }

    @action
    onChangedData = (uo) => {
        Object.assign(this.data, this.data, uo);
    }

    @action
    onIni = (farm) => {
        this.farm=farm;
        this.getParams((data)=>{
            this.area = data;
        },(err)=>{
            alert(err);
        })
    }
    //获取需要的参数
    @action
    getParams = (callback,failed) => {
        request.getJson(urls.apis.BH_GET_FARM_PARAMS, {}).then((data) => {
            callback(data);
        }).catch((err) => {
            failed(err);
        });
    }

    @action
    getStyFromApi = (code, callback, failed) => {
        request.getJson(urls.apis.IMM_GET_STY_BASE,{id:code}).then(data=>{
            callback(data);
        }).catch(err => {
            failed(err);
        });
    }

    @action
    onUpdateSty = (callback, failed) => {
        let item = {
            StyId: this.data.code,
            Name: this.data.name,
            Day: this.data.day,
            Genus: this.data.genus,
            Number: this.data.number,
            AddDate: this.data.addDate,
            BatchNumber: this.data.batchNumber,
            EquNum:this.data.equNum
        };
        request.postJson(urls.apis.IMM_POST_STY,item).then(data=>{
            callback(data);
        }).catch(err => {
            failed(err);
        });
    }


    @action
    onCommit(callback, failed) {
        request.postJson(urls.apis.BH_POST_SAVE_FARM,{
            farmName: this.data.farmName,
            farmCode: null,
            contactPerson: this.data.contactPerson,
            contactPhone: this.data.contactPhone,
            emailNo: this.data.emailNo,
            province: this.data.province,
            city: this.data.city,
            address: this.data.address,
            sales: this.data.sales,
            salesId: this.data.salesId,
        }).then((data)=>{
            callback(data);
        }).catch((err)=>{
            failed(err);
        });
    }
}

addFarmStore = new AddFarmStore();
export default addFarmStore;