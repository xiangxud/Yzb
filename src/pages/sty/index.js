import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity, DeviceEventEmitter
} from 'react-native';
import {Button, Text} from 'native-base';
import Modal from 'react-native-modalbox';
import moment from 'moment';
import {observer, inject} from 'mobx-react/native';
import {TitleBar, SeparatorArea} from '../../components';
import StyBar from '../../components/sty/StyBar';
import Waring from '../../components/sty/Waring';
import Monitor from '../../components/sty/Monitor';
import SensorView from '../../components/sty/SensorView';
import RefreshListView from 'react-native-refresh-list-view'

@inject('styStore')
@observer
export default class Sty extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerRight: <StyBar
            onInPetPress={() => {
                navigation.navigate("InPet", {
                    code: navigation.state.params.id,
                    title: navigation.state.params.title,
                    farm: navigation.state.params.farm
                })
            }}
            onSetting={() => {
                navigation.navigate("StySetting", {
                    styId: navigation.state.params.id,
                    styName: navigation.state.params.title
                })
            }}
            onOutPetPress={() => {
                navigation.navigate("OutPet", {
                    code: navigation.state.params.id,
                    title: navigation.state.params.title,
                    farm: navigation.state.params.farm
                })
            }}
            onEditPress={() => {
                navigation.navigate("EditSty", {
                    id: navigation.state.params.id,
                    title: navigation.state.params.title,
                    farm: navigation.state.params.farm
                })
            }}
        />
    });

    switchCamera = (c) => {
        styStore.switchCamera(c);
        this.refs.modal_choose_monitor.close();
    }
    onPlay = (url) => {
        this.props.navigation.navigate("VodPlay", {url: url});
    }
    openSwitch = () => {
        this.refs.modal_choose_monitor.open()
    }

    componentDidMount() {
        const {styStore, navigation} = this.props;
        let id = navigation.state.params.id;

        styStore.onInit(id);

        this.subscription = DeviceEventEmitter.addListener("noticeChangedCamera", (events) => {
            styStore.onInit(id);
        });
    }

    componentWillUnmount() {
        this.subscription && this.subscription.remove();
    }

    renderListHeader = () => {
        const {styStore, navigation} = this.props;
        const {waring, monitor, immCollection, environmental} = styStore;
        return (
            <View>
                <Waring waring={waring}/>
                <Monitor monitor={monitor} switchVideo={this.openSwitch} onPlay={this.onPlay}/>
                <SensorView data={environmental.data.recent} onItemPress={() => {
                }}/>
                <TitleBar icon={'bell-o'}
                          title='免疫提醒'
                          morePress={() => navigation.navigate("ImmTab", {})}
                          sub={<Text style={styles.count}>({immCollection.collection.count})</Text>}/>
            </View>
        );
    }
    renderRow = (item) => {
        return (
            <View style={styles.row}>
                <View style={styles.first}>
                    <Text style={styles.immTitle} numberOfLines={1}>
                        {item.VaccineName}
                    </Text>
                    <View style={styles.desc}>
                        <Text style={styles.block}>{item.VaccineMethod}</Text>
                        <Text style={styles.block}>{item.Dose}</Text>
                    </View>
                    <Text style={styles.immTime} numberOfLines={1}>
                        {moment(item.ImmuneTime).format("YYYY-MM-DD")}
                    </Text>
                </View>
                <View style={styles.actions}>
                    <Button success small disabled style={styles.action} onPress={this.exec(item.Id)}><Text>执行</Text></Button>
                    <Button warning small disabled style={styles.action} onPress={this.ignore(item.Id)}><Text>忽略</Text></Button>
                </View>
            </View>
        );
    }

    ignore = key => {

    };
    exec = (key) => {

    }
    render() {
        const {styStore} = this.props;
        const {monitor, immCollection} = styStore;
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={immCollection.collection.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => this.renderRow(item)}

                    onHeaderRefresh={() => styStore.onInit(styStore.code)}

                    ItemSeparatorComponent={() => <SeparatorArea style={{backgroundColor: '#f7f7f7'}}/>}
                    ListHeaderComponent={this.renderListHeader}

                    refreshState={styStore.refreshState}
                    // 可选
                    footerRefreshingText='玩命加载中 >.<'
                    footerFailureText='我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText='-我是有底线的-'
                    footerEmptyDataText='-好像什么东西都没有-'
                />
                <Modal
                    ref={"modal_choose_monitor"}
                    position={"center"}
                    style={styles.modal}
                    onClosed={() => {
                    }}>
                    <ScrollView style={{flex: 1}}>
                        {
                            monitor.cameras.map((camera, i) => (
                                <TouchableOpacity key={i} onPress={() => this.switchCamera(camera)}>
                                    <View
                                        style={[styles.item, monitor.current && monitor.current.Name === camera.Name ? styles.current : null]}>
                                        <Text>{camera.Name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        width: 300,
        height: 200,
    },
    item: {
        padding: 15,
        margin: .5,
        width: 300,
        backgroundColor: '#d6d6d6',
    },
    current: {
        backgroundColor: '#009d7b'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    first: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 0
    },
    desc: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3
    },
    immTitle: {
        color: '#101010',
        fontSize: 16,
        flex: 1,
    },
    immTime: {
        color: '#ababab',
        fontSize: 12,
        marginLeft: 3,
        width: 100
    },
    block:{
        color:'#AEAEAE',
        fontSize:12,
        textAlignVertical:'center',
    },
    actions: {
        flexDirection: 'column',
        height: 55,
        alignItems: 'stretch'
    },
    action: {}
})