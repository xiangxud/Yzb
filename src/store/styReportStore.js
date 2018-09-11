import {action, computed, extendObservable, observable, reaction, runInAction, useStrict} from 'mobx'
import {RefreshState} from 'react-native-refresh-list-view';

useStrict(true);

class styReportStore {
    @observable list = {};

    @observable page = 0;
    @observable size = 10;
    @observable refreshState: RefreshState.Idle;

    @observable query_id = '';

    reportData = {
        tem: {
            label: '温度',
            data: {
                title: {},
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['室内', '中区', '室外'],
                    height: 300
                },
                grid: {
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
                    data: ['23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '07:00']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '室内',
                        type: 'line',
                        stack: '室内',
                        data: [20.5, 21.2, 22.5, 20.3, 20.1, 22.6, 25.0]
                    },
                    {
                        name: '中区',
                        type: 'line',
                        stack: '中区',
                        data: [22.5, 22.2, 25.5, 21.3, 19.1, 18.6, 19.0]
                    },
                    {
                        name: '室外',
                        type: 'line',
                        stack: '室外',
                        data: [10, 11.2, 12.5, 8.3, 10.1, 15.6, 7.0]
                    }
                ]
            }
        },
        hum: {
            label: '湿度',
            data: {
                title: {},
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['室内', '中区', '室外'],
                    height: 300
                },
                grid: {
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
                    data: ['23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '07:00']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '室内',
                        type: 'line',
                        stack: '室内',
                        data: [20.5, 21.2, 22.5, 20.3, 20.1, 22.6, 25.0]
                    },
                    {
                        name: '中区',
                        type: 'line',
                        stack: '中区',
                        data: [22.5, 22.2, 25.5, 21.3, 19.1, 18.6, 19.0]
                    },
                    {
                        name: '室外',
                        type: 'line',
                        stack: '室外',
                        data: [10, 11.2, 12.5, 8.3, 10.1, 15.6, 7.0]
                    }
                ]
            }
        }
    }

    @observable
    currReport = 'tem'


    @action
    onInit(id) {
        this.page = 1;
        this.query_id = id;
        this.loadReport(true);
    }

    @action onChangedReport = (r) => {
        this.currReport = r;
    }

    @action
    onHeaderRefresh = () => {
        this.refreshState = RefreshState.HeaderRefreshing;
        this.loadReport(true);
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
}

export default new styReportStore();