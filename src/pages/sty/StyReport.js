import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Button, Spinner, Text, Icon} from 'native-base';
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

    reports = [{
        name: 'tem',
        text: '温度',
        icon: 'ios-thermometer',
        onPress: () => {
            const {styReportStore} = this.props;
            styReportStore.onChangedReport("tem");
        }
    }, {
        name: 'hum',
        text: '湿度',
        icon: 'ios-water',
        onPress: () => {
            const {styReportStore} = this.props;
            styReportStore.onChangedReport("hum");
        }
    }];
    renderListHeader = () => {
        const {styReportStore} = this.props;

        return (
            <View>
                <ActionTitleBar
                    icon={'ios-stats'}
                    iconColor={'red'}
                    title={'传感数据趋势'}
                    actions={this.reports}
                    actionLabel={styReportStore.reportData[styReportStore.currReport].label}
                    showMore={false}/>
                <View style={styles.canvas}>
                    <EChart data={styReportStore.reportData[styReportStore.currReport].data} style={{flex: 1}}></EChart>
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
})