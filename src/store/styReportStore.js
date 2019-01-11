import {action, computed, extendObservable, observable, reaction, runInAction, useStrict} from 'mobx'
import {RefreshState} from 'react-native-refresh-list-view';
import request from "../common/request";

useStrict(true);

class styReportStore {
    @observable list = {};

    @observable page = 0;
    @observable size = 10;
    @observable refreshState: RefreshState.Idle;

    @observable query_id = '';

    @observable
    reportData = {
        TEMPERATURE: {
            label: '温度',
            data: {
                title: {},
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: 10,
                    left: '1%',
                    right: '1%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    min: -10,
                    max: 40,
                    splitNumber: 10,
                    type: 'value'
                },
                series: [
                    {
                        name: '温度',
                        type: 'line',
                        stack: '温度',
                        data: []
                    }
                ]
            }
        },
        HUMIDITY: {
            label: '湿度',
            data: {
                title: {},
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: 10,
                    left: '1%',
                    right: '1%',
                    bottom: '1%',
                    containLabel: true
                },
                toolbox: {
                    feature: {}
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    min: 30,
                    splitNumber: 10,
                    type: 'value'
                },
                series: [
                    {
                        name: '湿度',
                        type: 'line',
                        stack: '湿度',
                        data: []
                    }
                ]
            }
        },
        CO2: {
            label: '二氧化碳',
            data: {
                title: {},
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: 10,
                    left: '1%',
                    right: '1%',
                    bottom: '1%',
                    containLabel: true
                },
                toolbox: {
                    feature: {}
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    min: 300,
                    splitNumber: 10,
                },
                series: [
                    {
                        name: '二氧化碳',
                        type: 'line',
                        stack: '二氧化碳',
                        data: []
                    }
                ]
            }
        }
    }

    @observable
    currReport = {};

    @observable
    chart_loaded = false;
    @observable title = '';

    @action
    onInit(id) {
        this.page = 1;
        this.query_id = id;
        this.loadReport(true);

        this.loadChartHistory();
    }

    @action onSwitch = (r) => {
        this.currReport = this.reportData[r];
        this.onHeaderRefresh();
    }

    @action
    onHeaderRefresh = () => {
        this.refreshState = RefreshState.HeaderRefreshing;
        this.page = 1;
        this.loadReport(true);

        //this.onSwitch('HUMIDITY')
    }

    @action
    onFooterRefresh = () => {
        this.refreshState = RefreshState.FooterRefreshing;
        this.loadReport(false);
    }

    @action
    loadReport = (isReload: boolean) => {
        return request.getJson(urls.apis.IMM_GET_STY_DAILY_REPORT,
            {page: this.page, size: this.size, id: this.query_id}).then((data) => {

            let list = isReload ? data.Rows : [...this.list, ...data.Rows];

            runInAction(() => {
                this.page++;
                this.list = list;
                this.refreshState = data.Rows.length === 0 ? (isReload ? RefreshState.EmptyData : RefreshState.NoMoreData) : RefreshState.Idle;
            });

        }).catch((err) => {
            runInAction(() => {
                this.refreshState = RefreshState.Failure;
                tools.showToast('请求数据失败，原因：' + JSON.stringify(err));
            });
        });
    }

    @action loadChartHistory = () =>{
        return request.getJson(urls.apis.IMM_GET_STY_SENSOR_REPORT, {styId: this.query_id}).then(data=>{
            runInAction(()=>{
                //alert(JSON.stringify(data))
                data.forEach((e) => {
                    /*let item = new ItemModel();
                    item.sensor_name = e.sensor_name;
                    item.sensor_type = e.sensor_type;
                    item.his_datas = e.his_datas;
                    item.his_dates = e.his_dates;
                    this.chart_datas.push(item);*/
                    if(this.reportData[e.sensor_type]){
                        this.reportData[e.sensor_type].data.xAxis.data = e.his_dates;
                        this.reportData[e.sensor_type].data.series[0].data = e.his_datas;
                    }
                });
                this.onSwitch('TEMPERATURE');
                this.chart_loaded = true;
            });
        }).catch((err) => {
            runInAction(() => {
                tools.showToast('请求数据失败，原因：' + JSON.stringify(err));
            });
        });
    }
}

export default new styReportStore();