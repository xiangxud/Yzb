import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {MapView, Marker} from 'react-native-amap3d';
import {observer, inject} from 'mobx-react/native';
import RefreshListView from 'react-native-refresh-list-view';
import {Text, Icon, Button, List, Fab, ListItem, Left, Body, Right, Thumbnail, Segment, Spinner} from 'native-base'
import {Container, Content, MaskLoading} from "../../components";
import {Geolocation} from "react-native-amap-geolocation";

const VetItem = observer(({item, i, navigation}) => {
    return <ListItem avatar onPress={() => navigation.navigate('VetInfo', {vet: item})}>
        <Left>
            <Thumbnail source={{uri: item.head_photo}}/>
        </Left>
        <Body>
        <Text>{item.name}</Text>
        <Text note>擅长：{item.skill}</Text>
        </Body>
        <Right>
            <Text note>{item.distance}</Text>
        </Right>
    </ListItem>;
});

@inject('didiStore')
@observer
export default class Didi extends Component {
    static navigationOptions = {
        title: '滴滴兽医',
        headerRight: <View/>
    }
    _onItemPress = (point) => {
        //alert(JSON.stringify(point))
        didiStore.setCurrent(point);
    }

    //componentDidMount() {
        //didiStore.getMyPosition();
    //}
    componentWillMount() {
        Geolocation.init({
            //TODO ios的要改
            ios: "9bd6c82e77583020a73ef1af59d0c759",
            android: "441ca727f44230561fd486a2139e4213"
        })
    }
    async componentDidMount() {
        Geolocation.setOptions({
            interval: 10 * 60 * 1000,
            distanceFilter: 10,
            reGeocode: true
        });
        Geolocation.addLocationListener(location => {
            this.updateLocationState(location);
        });
        this.startLocation();
    }

    componentWillUnmount() {
        this.stopLocation();
    }

    getLastLocationTStart = () => {
        this.stopLocation();
        this.startLocation();
    }

    //开始定位
    startLocation = () => Geolocation.start();
    //结束定位
    stopLocation = () => Geolocation.stop();
    //获取最新定位
    getLastLocation = async () => {
        try{
            this.updateLocationState(await Geolocation.getLastLocation());
        }catch (e){
            //alert(e)
        }
    }

    updateLocationState(location) {
        if (location) {
            tools.showToast('已成功获得您的位置');
            location.timestamp = new Date(location.timestamp).toLocaleString()
            didiStore.getMyPosition(location);
        }
    }

    renderItem = (item, i) => {
        return <MapView.Marker key={i} title={item.name} icon={() =>
                    <TouchableOpacity onPress={() => this._onItemPress(item)}>
                        <Text style={{fontSize:10, textAlign:'center', color:'black',
                            textShadowOffset:{width:2, height:2},
                            textShadowRadius:2,
                            textShadowColor:'gray'}}>{item.name}</Text>
                        <Image source={{uri: item.head_photo}} style={styles.avatar}/>
                    </TouchableOpacity>
                    }
                   onInfoWindowPress={() => this._onItemPress(item)}
                   coordinate={{latitude: item.latitude, longitude: item.longitude}}
        ></MapView.Marker>
    }


    renderListHeader = () => {
        let {position} = didiStore;
            return <View>
                {/*Object.keys(position).map(key => (
                    <View key={key}>
                        <Text>{key}</Text>
                        <Text>{position[key]}</Text>
                    </View>
                ))*/}
                <Button bordered success iconLeft rounded block style={{margin:15}}><Icon name='ios-pin' /><Text>{position.address}</Text></Button>
            </View>

    }
    render() {
        const {navigation} = this.props;
        const {vets, refreshState, current, currentType, isFetching, located, position} = didiStore;
        return (
            <Container>
                <Segment style={{backgroundColor: '#dd3215'}}>
                    <Button first active={currentType === 'list'} onPress={() => didiStore.switch()}>
                        <Text>列表</Text>
                    </Button>
                    <Button last active={currentType === 'map'} onPress={() => didiStore.switch()}>
                        <Text>地图</Text>
                    </Button>
                </Segment>
                {currentType === 'map' ?
                    <Content>
                        <MapView
                            showsCompass={true}
                            zoomLevel={8}
                            locationEnabled={false}
                            rotateEnabled={false}
                            showsZoomControls={false}
                            distanceFilter={10}
                            onPress={()=>{didiStore.setCurrent({})}}
                            coordinate={{
                                latitude: position.latitude,
                                longitude: position.longitude,
                            }}
                            onLocation={({ nativeEvent }) => alert(JSON.stringify(nativeEvent))}
                            style={StyleSheet.absoluteFill}>
                            {
                                vets.map((item, i) => this.renderItem(item, i))
                            }
                            {/*
                            <MapView.Marker color="green" coordinate={{latitude: position.latitude, longitude: position.longitude}} icon={() => <View><Text>TITLE LIST</Text></View>}>
                                <TouchableOpacity activeOpacity={0.9} onPress={()=>alert('ok...')}>
                                    <View style={styles.customInfoWindow}>
                                        <Image source={{uri: 'http://imm.ringpu.com/breed/upload/carousel/20180615/carousel_20180615142940_7742_1348.jpg'}} style={styles.avatar}/>
                                        <Text>自定义信息窗口</Text>
                                        <Text>{JSON.stringify(position)}</Text>
                                    </View>
                                </TouchableOpacity>
                            </MapView.Marker>*/}
                        </MapView>
                        {didiStore.current.name ?
                            <View style={styles.userProfile}>
                                <Image style={styles.head} source={{uri: current.head_photo}}></Image>
                                <View style={styles.profile}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{fontSize: 18}}>{current.name}</Text>
                                        <Text style={styles.phone}>手机{current.phone}</Text>
                                    </View>
                                    <Text style={{marginTop: 5}}>专长：{current.major_skill ? current.major_skill : '未知'}</Text>
                                </View>
                                <Button bordered info onPress={() => { navigation.navigate("VetInfo", {vet: current}) }}>
                                    <Text>详情</Text>
                                </Button>
                                {false ? <Icon name={'ios-close-circle-outline'} onPress={() => this._onItemPress({})} style={styles.closeButton}/> : null}
                            </View> :
                            <View style={styles.noCurrent}>
                                {
                                    isFetching ?
                                    <Spinner color={'red'}/>
                                    :
                                    <Text style={styles.loadingText}>触摸兽医姓名可进行呼叫</Text>
                                }
                            </View>
                        }
                    </Content>
                    :
                    <Content white>
                        <MaskLoading show={false} text={'正在查找您附近的兽医，请稍后...'}/>
                        {
                            located ?
                            <List>
                                <RefreshListView data={vets}
                                                 keyExtractor={(item, i) => i.toString()}
                                                 renderItem={({item, i}) => <VetItem item={item} i={i} navigation={navigation}/>}
                                                 ListHeaderComponent={this.renderListHeader}
                                                 refreshState={refreshState}
                                                 onHeaderRefresh={didiStore.onHeaderRefresh}
                                                 onFooterRefresh={didiStore.onFooterRefresh}/>
                            </List>
                            :
                            <Button bordered danger iconLeft rounded block style={{margin:15}}><Icon name='ios-pin' /><Text>正在获取您的位置...</Text></Button>
                        }
                    </Content>
                }
                <Fab
                    active={didiStore.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => didiStore.changeActive()}>
                    <Icon name="md-list" />
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={this.getLastLocationTStart }>
                        <Icon name="ios-pin" />
                    </Button>
                    <Button style={{ backgroundColor: '#DD5144' }} onPress={()=>didiStore.onFooterRefresh()}>
                        <Icon name="ios-shuffle" />
                    </Button>
                </Fab>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#8bc34a',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#689F38',
        marginBottom: 5,
    },
    customMarker: {
        backgroundColor: '#009688',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    markerText: {
        color: '#fff',
    },

    loadingText: {
        padding: 10,
        fontSize: 16,
        color: 'white',
        backgroundColor: '#000',
        borderRadius: 3,
        opacity: 0.5
    },
    userProfile: {
        flexDirection: 'row',
        padding: 10,
        height: 80,
        backgroundColor: '#fff',
        borderTopColor: '#ccc',
        alignItems: 'center',
    },
    head: {
        width: 60,
        height: 60,
    },
    avatar: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    profile: {
        flex: 1,
        marginLeft: 10,
    },
    phone: {
        fontSize: 14,
        color: '#909090',
        marginLeft: 5
    },
    noCurrent: {
        height: 80,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    row: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 1,
    },
    closeButton: {
        position: 'absolute',
        left: 0,
        bottom: -2,
        color: 'red'
    }
})