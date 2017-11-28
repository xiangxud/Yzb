import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class ImmCollectionStore
{
    constructor(){
        this.onIni();
    }
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
        this.onLoad();
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

class WaringStore {
    constructor(){
        this.breed="种猪";
        this.count=20;
        this.temperature="";
        this.humidity="30ml";
        this.co2="";
    }
    breed="";//种属
    count="";//数量
    temperature="";//温度
    humidity="";//湿度
    co2="";//二氧化碳
}

class MoitorStore{
    constructor(){
        this.name='005摄像头';
        this.timer='2017-09-09 14时35分69秒2983S';
        this.camera=['001摄像头','002摄像头','003摄像头','004摄像头','005摄像头'];
    }
    @observable
    name:'';
    @observable
    timer:'';
    @observable
    camera:[];
}

class styStore {
    constructor(){
        //1、imm collection
        this.immCollection = new ImmCollectionStore();
        //2、预警信息
        this.waring = new WaringStore();
        //3、监控信息
        this.moitor = new MoitorStore();
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
    immCollection:{};
    //预警信息
    waring:{};
    //监控信息
    moitor:{};
}
styStore = new styStore();

export default styStore;