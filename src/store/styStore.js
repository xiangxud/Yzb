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

class MoitorStore{
    @observable
    name='';
    @observable
    timer='';
    @observable
    cameras=[];

    constructor(){
        this.name='005摄像头';
        this.timer='2017-09-09 14时35分69秒2983S';
        let cams = [];
        for(let i =1; i<=15; i++){
            cams.push({name: '摄像头00'+i, camera_id: '00000'+i});
        }
        this.cameras = cams;
    }
}

class  EnvironmentalStore{
    constructor(){
        this.temperature="";
        this.humidity="";
        this.o2c="";
    }
    @action
    onParse(data){
        this.temperature=data.Temperature;
        this.humidity=data.Humidity;
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
    moitor=new MoitorStore();

    @action
    onIni( id ){
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
                try {
                    //this.moitor.cameras = data.Cameras;
                }catch(e){
                    alert(JSON.stringify(e))
                }
            });
        }, (err)=>{
            tools.showToast("获取栋舍信息失败");
        });
    }
    @action
    onLoadFromApi(id, callback, failed){
        request.getJson(urls.apis.IMM_STYBASIC, {id: id}).then((data) => {
            callback(data);
        }).catch((err) => {
            failed(err);
        });
    }
}

styStore = new StyStore();
export default styStore;