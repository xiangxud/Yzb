import {action, computed, extendObservable, observable, reaction, runInAction, useStrict} from 'mobx'
import {RefreshState} from 'react-native-refresh-list-view';

useStrict(true);

//1、免疫
class alarmCollection {
    @observable
    count = 0;

    @observable
    list = [];

    @observable
    end = false

    @observable
    mored = true
}

class _immStore {
    queryConfig = {
        PageIndex: 1,
        PageSize: 10,
        StyName: '',
        StartDate: null,
        EntDate: null,
        PlanState: 0,
        Config: true,
        Cyc: false
    }

    @observable
    FilterConfig = {
        @observable
        StartDate: null,
        @observable
        EntDate: null,
        @observable
        PlanState: 0,
    }

    EnumPlanState = [
        {title: '未执行', value: 0},
        {title: '已执行', value: 1},
        {title: '忽略', value: 2}]

    @action
    OnUpdateConfig(o) {
        Object.assign(this.FilterConfig, this.FilterConfig, o);
    }

    @observable
    collection = new alarmCollection();

    onChangedState(plan, state, callback, falied) {
        request.postJson(urls.apis.IMM_POST_IMPLEMENT, {
            PlanId: plan.Id,
            StyId: plan.StyId,
            State: state
        }).then(data => {
            runInAction(() => {
                this.collection.count = this.collection.list.removeItem(o => o.Id == plan.Id).length;
                if (callback) callback(data);
            });
        }).catch(err => {
            if (falied) falied("执行失败");
        });
    }

    @action
    clear() {
        this.collection.list = [];
        this.collection.count = 0;
    }

    @action
    fillList(rows) {
        this.collection.list = rows;
        this.collection.count = rows.length;
        this.closeEnd();
    }

    @action
    addList(rows) {
        rows.forEach(item => {
            this.collection.list.push(item);
        });
        this.collection.count = this.collection.list.length;
        if (rows.length < this.queryConfig.PageSize) {
            this.collection.mored = false
        }
        this.closeEnd();
    }

    @action
    closeEnd() {
        this.collection.end = true;
    }

    @action
    openEnd() {
        this.collection.end = false;
    }

    @action
    onMore(callback, falied) {
        if (!this.collection.mored || !this.collection.end) {
            return;
        }

        this.openEnd();
        this.queryConfig.PageIndex = this.queryConfig.PageIndex + 1;
        this.onLoadData(callback, falied);
    }


    @action
    onLoadData(c, e) {
        this.getDataFromApi(this.queryConfig).then(d => {
            this.addList(d.Rows);
            c();
        }, err => {
            this.closeEnd();
            if (e) {
                e(err);
            }
        });
    }


    @action
    onLoad(config, callback, falied) {
        if (config) {
            Object.assign(this.queryConfig, this.queryConfig, config);
        }
        this.openEnd();
        this.queryConfig.PageIndex = 1;
        this.clear();

        this.onLoadData(callback, falied);

        // this.getDataFromApi(this.queryConfig).then(data=>{
        //     this.fillList(data.Rows);
        //     if( callback && callback != null ) {
        //         callback(data.Rows)
        //     };
        // },(err)=>{
        //     this.closeEnd();
        //     if( falied && falied != null ) {
        //         falied(err)
        //     };
        // });
    }

    @action
    getDataFromApi(_config) {
        return request.postJson(urls.apis.IMM_GET_DETAIL, _config);
    }
}

//2、预警
class WaringStore {
    constructor() {
    }

    @observable
    genus = "";//种属
    @observable
    count = "";//数量
    @observable
    temperature = "";//温度
    @observable
    humidity = "";//湿度
    @observable
    co2 = "";//二氧化碳

    @action
    onParse(data, parent) {
        this.genus = parent.genus;
        this.count = parent.count;
        this.temperature = data.TemWar;
        this.humidity = data.HumWar;
        this.co2 = data.O2cWar;
    }
}

//3、监控
class MonitorStore {
    @observable
    current = null;

    @observable
    cameras = [];

    constructor() {
        // let cams = [];
        // for(let i = 1; i <= 15; i++){
        //     cams.push({Name: '摄像头00'+i, Id: '00000'+i});
        // }
        // this.cameras = cams;
        // this.current = cams[0];
    }
}

//4、环控
//环控数据

class EnvironmentalStore {
    @observable data = {
        @observable recent: [],
        @observable list: []
    }
    @observable sty_id = null;
    @observable currentSensorId = null;
    //@observable loading = false;
    //@observable loadEnd = false;
    //@observable loadFirst = false;


    @observable page = 0;
    @observable size = 10;
    @observable refreshState: RefreshState.Idle;

    @action
    onInit(id) {
        this.page = 1;
        this.sty_id = id;
        this.currentSensorId = '';
        this.loadHistory(true);
    }

    onSwitchSensor = (id: string) => {
        this.currentSensorId = this.currentSensorId === id ? '' : id;
        this.onHeaderRefresh();
    }
    @action
    onHeaderRefresh = () => {
        this.refreshState = RefreshState.HeaderRefreshing;
        this.loadHistory(true);
    }

    @action
    onFooterRefresh = () => {
        this.refreshState = RefreshState.FooterRefreshing;
        this.loadHistory(false);
    }

    @action
    loadHistory(isReload: boolean) {
        if (!this.sty_id) {
            return;
        }
        if (isReload) {
            this.page = 1;
            //tools.showToast('new_' + this.page);
        } else {
            //tools.showToast('next_' + this.page);
        }

        request.getJson(urls.apis.IMM_GET_STY_SENSOR_HISTORY, {
            id: this.sty_id,
            sensorId: this.currentSensorId,
            page: this.page,
            size: this.size
        }).then((data) => {

            let list = isReload ? data.Rows : [...this.data.list, ...data.Rows];

            runInAction(() => {
                this.page++;
                this.data.list = list;
                this.refreshState = data.Rows.length === 0 ? (isReload ? RefreshState.EmptyData : RefreshState.NoMoreData) : RefreshState.Idle;
            });

        }).catch((err) => {
            runInAction(() => {
                this.refreshState = RefreshState.Failure;
                tools.showToast('请求失败了，原因：' + JSON.stringify(err));
            });
        });
    }

    @action
    setRecent(recent) {
        this.data.recent = recent;
    }
}

class StyStore {
    constructor() {
    }

    @observable
    code = "";

    @observable
    title = "";

    @observable
    count = 0;

    @observable
    genus = "";

    @observable
    day = "";

    @observable
    unit = "";

    @observable
    defaultCamera = "";

    //环控数据
    @observable
    environmental = new EnvironmentalStore();

    @observable
    immCollection = new _immStore();

    @observable
    waring = new WaringStore();

    @observable
    monitor = new MonitorStore();

    @action
    onIni(id) {
        this.onLoadFromApi(id).then(data => {
            runInAction(() => {
                //1、基础数据
                this.code = data.Id;
                this.title = data.Name;
                this.genus = data.Genus;
                this.count = data.Total;
                this.day = data.Day;
                this.unit = data.Unit;
                this.defaultCamera = data.DefaultCamera;
                //2、环控数据
                if (data.sensors) {
                    this.environmental.setRecent(data.sensors);//环控数据
                    // this.waring.onParse(data.Env, this);
                }
                //3、预警信息
                if (data.Imm) {
                    this.immCollection.fillList(data.Imm);
                }
                //4、摄像头数据
                this.monitor.cameras = data.Cameras;
                if (this.monitor.cameras.length) {
                    this.monitor.current = this.monitor.cameras[0];
                } else {
                    this.monitor.current = null;
                }
            });
        }, err => {
            tools.showToast("无法获取该栋舍信息，请稍后再试");
        });
    }

    @action switchCamera = (o) => {
        this.monitor.current = o;
    }

    @action onUpdateCameras = (o) => {
        let t = this.monitor.cameras.fristOne((c) => c.Id == o.Id);
        if (t) {
            Object.assign(t, t, o);
        }
    };
    @action onPushCameras = (o) => {
        let t = {};
        Object.assign(t, t, o);
        this.monitor.cameras.push(t);
    };
    @action onRemove = (id) => {
        this.monitor.cameras.removeItem(o => o.Id == id);
    };
    @action onChangeCameras = (id) => {
        this.defaultCamera = id;
    };

    @action
    onLoadFromApi(id, callback, failed) {
        return request.getJson(urls.apis.IMM_STY_BASIC, {id: id});
    }
}

styStore = new StyStore();
export default styStore;