import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Button, ActionSheet, Text, Icon} from 'native-base';
import {TitleBar, ActionTitleBar, EChart, SeparatorArea} from '../../components';
import RefreshListView from 'react-native-refresh-list-view'

@inject('styReportStore')
@observer
export default class StyReport extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '栋舍报表',
        headerRight: <Button transparent light
                             onPress={navigation.state.params ? navigation.state.params.inputPress : null}><Text></Text></Button>
    })

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {styReportStore, navigation} = this.props;
        styReportStore.onInit(navigation.state.params.id);
        this.props.navigation.setParams({
            inputPress: this.inputPress
        });
    }

    inputPress = () => {
        alert('填写报告');
    }
    onTPress = () => {
        const {styReportStore} = this.props;
        let actions = [{
            name: 'TEMPERATURE',
            text: '温度',
            icon: 'ios-thermometer',
            onPress: () => {
                styReportStore.onSwitch("TEMPERATURE");
                //alert(styReportStore.currReport)
            }
        }, {
            name: 'HUMIDITY',
            text: '湿度',
            icon: 'ios-water',
            onPress: () => {
                styReportStore.onSwitch("HUMIDITY");
                //alert(styReportStore.currReport)
            }
        }, {
            name: 'CO2',
            text: '二氧化碳',
            icon: 'ios-speedometer',
            onPress: () => {
                styReportStore.onSwitch("CO2");
                //alert(styReportStore.currReport)
            }
        }];

        ActionSheet.show({
            title: '栋舍操作',
            options: actions,
            destructiveButtonIndex: 0,
            cancelButtonIndex: -1
        }, (index) => {
            if (index < 0 || index >= actions.length) {
                return;
            }
            actions[index].onPress();
        });
    };

    renderListHeader = () => {
        const {styReportStore} = this.props;

        return (
            <View>
                <View style={styles.titleWrap}>
                    <Icon name={'ios-stats'} style={{color: 'red'}}/>
                    <Text style={styles.titleText}>传感器最近24小时数据</Text>
                    <TouchableOpacity style={styles.more} onPress={()=>this.onTPress()}>
                        <Icon name="ios-arrow-down-outline" style={{fontSize: 16}}/>
                        <Text style={{marginRight: 5}}>{styReportStore.currReport.label}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.canvas}>
                    {styReportStore.chart_loaded?<EChart data={styReportStore.currReport.data} style={{flex: 1}}></EChart>:<View/>}
                </View>
                <SeparatorArea/>
                <TitleBar icon={'file-text'}
                          iconColor={'red'}
                          title={'日报记录'}
                          showMore={false}/>
            </View>
        )
    }

    renderRow = (item) => {
        return (
            <View style={styles.row}>
                <View style={styles.dt}>
                    <Text style={styles.year}>{item.Daily.ToDate().Format("yyyy")}年</Text>
                    <Text style={styles.day}>{item.Daily.ToDate().Format("MM-dd")}</Text>
                </View>
                <View style={{flex: 1,}}>
                    <Text>补栏 {item.ToDayAddPet ? item.ToDayAddPet : 0} 头，温度：{item.Temperature}℃</Text>
                    <Text>风机数量：{item.WmCount ? item.WmCount : 0}，通风方式：{item.WindMode}</Text>
                </View>
            </View>
        );
    }

    render() {
        const {styReportStore, navigation} = this.props;
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={styReportStore.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => this.renderRow(item)}

                    onHeaderRefresh={styReportStore.onHeaderRefresh}
                    onFooterRefresh={styReportStore.onFooterRefresh}

                    ItemSeparatorComponent={() => <SeparatorArea style={{backgroundColor: '#f7f7f7'}}/>}
                    ListHeaderComponent={this.renderListHeader}

                    refreshState={styReportStore.refreshState}
                    // 可选
                    footerRefreshingText='玩命加载中 >.<'
                    footerFailureText='我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText='-我是有底线的-'
                    footerEmptyDataText='-好像什么东西都没有-'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    canvas: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
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
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    year: {
        color: '#888',
    },
    day: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    footer: {
        height: 35, justifyContent: 'center', alignItems: 'center'
    },
    emptyTips: {height: 100, justifyContent: 'center', alignItems: 'center'},

    titleWrap: {
        height: 40,
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        borderBottomColor: '#ccc',
    },
    titleText: {
        fontSize: 18,
        color: '#000',
        marginLeft: 3,
        flex: 1
    },
    more: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})