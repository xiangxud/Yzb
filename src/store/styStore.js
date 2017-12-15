import {AsyncStorage} from 'react-native'
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
useStrict(true);

class ImmCollectionStore {
    constructor(){
    }
    @observable
    End=true;
    @observable
    count=0;
    @observable
    list=[];

    @action
    onParse(data){
        this.list = data;
        this.count = data.length;
        this.End = true;
    }

    @action
    onLoad(){
    }
}

class WaringStore {
    constructor(){
    }
    @observable
    genus="";//种属
    @observable
    count="";//数量
    @observable
    temperature="";//温度
    @observable
    humidity="";//湿度
    @observable
    co2="";//二氧化碳

    @action
    onParse(data,parent){
        this.genus = parent.genus;
        this.count = parent.count;
        this.temperature = data.TemWar;
        this.humidity = data.HumWar;
        this.co2=data.O2cWar;
    }
}

class MonitorStore{
    @observable
    current=null;

    @observable
    cameras=[];

    constructor(){
        // let cams = [];
        // for(let i = 1; i <= 15; i++){
        //     cams.push({Name: '摄像头00'+i, Id: '00000'+i});
        // }
        // this.cameras = cams;
        // this.current = cams[0];
    }
}

class EnvironmentalStore{
    constructor(){
        this.temperature="";
        this.humidity="";
        this.o2c="";
    }
    @action
    onParse(data){
        this.temperature = data.Temperature;
        this.humidity = data.Humidity;
        this.o2c = data.O2c;
    }
    @observable
    temperature="";//温度
    @observable
    humidity="";//湿度
    @observable
    o2c="";//二氧化碳
}

class StyStore {
    constructor(){
    }

    @observable
    code="";

    @observable
    title="";

    @observable
    count=0;

    @observable
    genus="";

    @observable
    day="";

    @observable
    unit="";

    //环控数据
    @observable
    environmental=new EnvironmentalStore();

    @observable
    immCollection=new ImmCollectionStore();

    @observable
    waring=new WaringStore();

    @observable
    monitor=new MonitorStore();

    @action onIni(id){
        this.onLoadFromApi(id, (data)=>{
            runInAction(()=>{
                //1、基础数据
                this.code = data.Id;
                this.title = data.Name;
                this.genus = data.Genus;
                this.count = data.Total;
                this.day = data.Day;
                this.unit = data.Unit;
                //2、环控数据
                if(data.Env){
                    this.environmental.onParse(data.Env);//环控数据
                    this.waring.onParse(data.Env, this);
                }
                //3、预警信息
                if(data.Imm){
                    this.immCollection.onParse(data.Imm);
                }
                //4、摄像头数据
                this.monitor.cameras = data.Cameras;
                if(this.monitor.cameras.length){
                    this.monitor.current = this.monitor.cameras[0];
                }
            });
        }, (err)=>{
            tools.showToast("无法获取该栋舍信息，请稍后再试");
        });
    }

    @action switchCamera=(o)=>{
        this.monitor.current = o;
    }

    @action onUpdateCameras=(o)=>{
        let t = this.monitor.cameras.fristOne((c)=> c.Id==o.Id );
        if(t){
            Object.assign(t,t,o);
        }
    };
    @action onPushCameras=(o)=>{
        let t = {};
         Object.assign(t,t,o);
        this.monitor.cameras.push(t);
    };
    @action onRemove=(id)=>{
        this.monitor.cameras.removeItem(o=>o.Id == id);
    };

    @action
    onLoadFromApi(id, callback, failed){
        request.getJson(urls.apis.IMM_STY_BASIC, {id: id}).then((data) => {
            callback(data);
        }).catch((err) => {
            failed(err);
        });
    }
}

styStore = new StyStore();
export default styStore;