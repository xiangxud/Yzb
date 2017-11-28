import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import { persist } from 'mobx-persist'
import _ from "lodash";
useStrict(true);

class styStore {
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
    immCollection:{
        count:0,
        list:[],
    }
}
styStore = new styStore();

export default styStore;