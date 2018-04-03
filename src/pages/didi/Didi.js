import React, {Component} from 'react'
import {
    View,
    Alert,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import {MapView, Marker, MultiPoint} from 'react-native-amap3d';
import {observer, inject} from 'mobx-react/native';
import RefreshListView from 'react-native-refresh-list-view';
import { Text, Icon, Button, List, ListItem, Left, Body, Right, Thumbnail, Segment, Spinner} from 'native-base'
import {Container, Content, MaskLoading} from "../../components";

const VetItem = observer(({item, i, navigation}) => {
    return <ListItem avatar onPress={()=>navigation.navigate('VetInfo', {vet: item})}>
        <Left>
            <Thumbnail source={{uri: item.head_photo}} />
        </Left>
        <Body>
            <Text>{item.name}</Text>
        <Text note>擅长：{item.skill}</Text>
        </Body>
        <Right>
            <Text note>3.43km</Text>
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
    componentDidMount(){
        didiStore.setMyPosition(didiStore.position);
    }
    renderItem=(item, i)=>{
        return <Marker
            key={i}
            title={item.name}
            icon={() =>
                <TouchableOpacity onPress={() => this._onItemPress(item)}>
                    <Image source={{uri: item.head_photo}} style={styles.avatar}/>
                </TouchableOpacity>
            }
            onInfoWindowPress={()=>this._onItemPress(item)}
            coordinate={{latitude:item.latitude, longitude:item.longitude}}
        ></Marker>
    }
    render() {
        const {navigation} = this.props;
        const {vets, refreshState, current, currentType, isFetching, locationInterval, position} = didiStore;
        return(
            <Container>
                <Segment style={{backgroundColor:'#459d26'}}>
                    <Button first active={currentType==='list'} onPress={()=>didiStore.switch()}>
                        <Text>列表</Text>
                    </Button>
                    <Button last active={currentType==='map'} onPress={()=>didiStore.switch()}>
                        <Text>地图</Text>
                    </Button>
                </Segment>
                {currentType === 'map' ?
                    <Content>
                        <MapView
                                 showsCompass={true}
                                 zoomLevel={8}
                                 rotateEnabled={false}
                                 onLocation={({nativeEvent}) => {
                                     if (nativeEvent.latitude && nativeEvent.longitude) {
                                         tools.showToast('已更新您的位置');
                                         didiStore.setMyPosition({
                                             latitude: nativeEvent.latitude,
                                             longitude: nativeEvent.longitude,
                                             accuracy: nativeEvent.accuracy,
                                         });
                                     }
                                 }
                                 }
                                 coordinate={{
                                     latitude: position.latitude,
                                     longitude: position.longitude,
                                 }}
                                 style={StyleSheet.absoluteFill}>

                            {
                                vets.map((item, i)=>this.renderItem(item, i)
                                    //alert(JSON.stringify(item));
                                )
                            }
                        </MapView>
                        {didiStore.current.name ?
                            <View style={styles.userProfile}>
                                <Image style={styles.head} source={{uri: current.head_photo}}></Image>
                                <View style={styles.profile}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{fontSize: 18}}>{current.name}</Text>
                                        <Text style={styles.phone}>手机{current.phone}</Text>
                                    </View>
                                    <Text
                                        style={{marginTop: 5}}>专长：{current.major_skill ? current.major_skill : '未知'}</Text>
                                </View>
                                <Button bordered info onPress={() => {
                                    navigation.navigate("VetInfo", {vet: current})
                                }}>
                                    <Text>详情</Text>
                                </Button>
                                {false ? <Icon name={'ios-close-circle-outline'} onPress={() => this._onItemPress({})}
                                               style={{
                                                   position: 'absolute',
                                                   left: 0,
                                                   bottom: -2,
                                                   color: 'red'
                                               }}/> : null}
                            </View> :
                            <View style={styles.noCurrent}>
                                {isFetching ?
                                    <View>
                                        <Spinner color={'red'}/>
                                        <Text style={styles.loadingText}>正在查找您附近的兽医，请稍后...</Text>
                                    </View>
                                    :
                                    <Text style={styles.loadingText}>请点击地图中的标记选择兽医</Text>
                                }
                            </View>
                        }
                    </Content>
                    :
                    <Content white>
                        <MaskLoading show={isFetching} text={'正在查找您附近的兽医，请稍后...'}/>
                        <List>
                            <RefreshListView data={vets}
                                         keyExtractor={(item, i)=> i}
                                         renderItem={({item, i})=><VetItem item={item} i={i} navigation={navigation}/>}
                                         refreshState={refreshState}
                                         onHeaderRefresh={didiStore.onHeaderRefresh}
                                         onFooterRefresh={didiStore.onFooterRefresh} />
                        </List>
                    </Content>
                }
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

    loadingText:{
        padding:10,
        fontSize: 16,
        color: 'white',
        backgroundColor:'#000',
        borderRadius:3,
        opacity:0.5
    },
    userProfile: {
        flexDirection:'row',
        padding:10,
        height:80,
        backgroundColor:'#fff',
        borderTopColor:'#ccc',
        alignItems:'center',
    },
    head:{
        width:60,
        height:60,
    },
    avatar:{
        width:30,
        height:30,
        borderWidth:1,
        borderColor:'white',
        borderRadius:1,
    },
    profile:{
        flex:1,
        marginLeft:10,
    },
    phone:{
        fontSize: 14,
        color: '#909090',
        marginLeft: 5
    },
    noCurrent:{
        height:80,
        justifyContent:'center',
        alignSelf:'center'
    },
    row:{
        backgroundColor:'#fff',
        padding:10,
        marginBottom:1,
    }
})