import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class ImmCollection
{
    @observable
    End:true;
    @observable
    count:0;
    @observable
    list:[];

    @action
    onIni(){
        this.End = true;
        this.list = [];
        this.count = 0;
    }

    @action
    onLoad(){
        this.list = [{
            id:'8E0DF754-91F4-4557-BF47-005C9E4E9B0D',
            vaccineTitle:'疫苗鸡球虫病',
            vaccineType:'活疫苗',
            vaccineMethod:'胸肌注射',
            dose:'200ml x 200',
            immuneTime:'2017-07-21',
            status:'未完成'
        },{
            id:'B8BDBF1B-9AA7-491F-AE9A-01FEBF6C0C0B',
            vaccineTitle:'猪支原体肺炎灭活疫苗（DJ-166株）',
            vaccineType:'活疫苗',
            vaccineMethod:'胸肌注射',
            dose:'200ml x 200',
            immuneTime:'2017-07-21',
            status:'未完成'
        },{
            id:'B8BDBF1B-9AA7-491F-AE9A-01FEBF6C0C0B',
            vaccineTitle:'猪支原体肺炎灭活疫苗（DJ-166株）',
            vaccineType:'活疫苗',
            vaccineMethod:'胸肌注射',
            dose:'200ml x 200',
            immuneTime:'2017-07-21',
            status:'未完成'
        },{
            id:'B8BDBF1B-9AA7-491F-AE9A-01FEBF6C0C0B',
            vaccineTitle:'猪支原体肺炎灭活疫苗（DJ-166株）',
            vaccineType:'活疫苗',
            vaccineMethod:'胸肌注射',
            dose:'200ml x 200',
            immuneTime:'2017-07-21',
            status:'未完成'
        }];
        this.count = this.list.length;
        this.End = true;

    }
}

class styStore {
    constructor(){
        this.immCollection = new ImmCollection();
        let h = this.immCollection.onIni.bind(this.immCollection);
        h();
    }

    //code
    code="";
    //栋舍名称
    title="";
    //数量
    count=0;
    //种属
    genus="";
    //环控数据
    environmental:{
        //温度
        temperature:0,
        temperatureWaring:'',

        //湿度
        humidity:0,
        humidityWaring:'',

        //二氧化碳
        co2:'',
        co2Waring:''
    }
    //免疫
    immCollection:{}
}
styStore = new styStore();

export default styStore;