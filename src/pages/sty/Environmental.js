import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import moment from 'moment';
import {Text} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import SensorView from '../../components/sty/SensorView';
import {TitleBar, SeparatorArea} from '../../components';
import RefreshListView from 'react-native-refresh-list-view';

@inject('styStore')
@observer
export default class Environmental extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: <View></View>
    })

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        const {styStore, navigation} = this.props;
        const sensorStore = styStore.environmental;
        sensorStore.onInit(navigation.state.params.id);
    };

    onRecentPress = (sensor) => {
        const {styStore, navigation} = this.props;
        const sensorStore = styStore.environmental;
        sensorStore.onSwitchSensor(sensor.SensorId);
    }

    renderListHeader = () => {
        const {styStore} = this.props;
        return (
            <View>
                <SensorView data={styStore.environmental.data.recent} currentId={styStore.environmental.currentSensorId} onItemPress={this.onRecentPress}/>
                <SeparatorArea/>
                <TitleBar icon={'history'}
                          iconColor={'gray'}
                          title={'传感器历史记录'}
                          showMore={false}/>
            </View>
        );
    }

    renderRow = (item) => {
        let d = moment(item.CreatedAt);
        return (
            <View style={styles.row}>
                <View style={styles.dt}>
                    <Text style={styles.time}>{d.format('HH:mm:ss')}</Text>
                    <Text style={styles.day}>{d.format('YYYY-MM-DD')}</Text>
                </View>
                <View style={styles.data}>
                    <Text style={{fontSize: 26, color: '#dd3215', fontWeight: 'bold'}}>{item.Data}</Text>
                    <Text style={{fontSize: 14, color: '#e69d63'}}>{item.SensorName}</Text>
                </View>
            </View>
        );
    }

    render() {
        const {styStore, navigation} = this.props;
        const sensorStore = styStore.environmental;
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={sensorStore.data.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => this.renderRow(item)}

                    onHeaderRefresh={sensorStore.onHeaderRefresh}
                    onFooterRefresh={sensorStore.onFooterRefresh}

                    ItemSeparatorComponent={() => <SeparatorArea style={{backgroundColor: '#f7f7f7'}}/>}
                    ListHeaderComponent={this.renderListHeader}

                    refreshState={sensorStore.refreshState}
                    // 可选
                    footerRefreshingText='玩命加载中 >.<'
                    footerFailureText='我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText='-我是有底线的-'
                    footerEmptyDataText='-好像什么东西都没有-'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
    },
    dt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    day: {
        color: '#888',
    },
    time: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    data: {flex: 2, paddingLeft: 10, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#bababa'}
})