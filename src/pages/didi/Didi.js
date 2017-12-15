/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

import {Container, Content} from "../../components";
import {observer, inject} from 'mobx-react/native'
import {MapView, Marker, Polyline, MultiPoint} from 'react-native-amap3d'

@inject('didiStore')
@observer
export default class Didi extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '滴滴兽医',
        headerRight: <View></View>
    });

    componentDidMount(){
        this._getPosition();
        //didiStore.fetchVets();
    }

    _onItemPress = (point) => {
        didiStore.setCurrent(point);
    }

    _getPosition = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                didiStore.setMyPosition(position.coords);
                //alert(JSON.stringify(position))
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        watchID = navigator.geolocation.watchPosition((position) => {
            didiStore.setMyPosition(position.coords);
            //var lastPosition = JSON.stringify(position);
            //alert(JSON.stringify('watch'+lastPosition))
        });
    }

    render() {
        const {vets, current, isFetching, position} = didiStore;
        return (
            <Container>
                <Content white delay={isFetching}>
                    <View style={{flex:1,}}>
                        <MapView
                            locationEnabled={true}
                            showsLocationButton={false}
                            rotateEnabled={false}
                            showsCompass={true}
                            zoomLevel={8}
                            coordinate={{
                                latitude: position.latitude,
                                longitude: position.longitude,
                            }}
                            onLocation={({nativeEvent}) => {
                                //alert(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
                                //alert(JSON.stringify(nativeEvent))
                                }
                            }
                            style={StyleSheet.absoluteFill}
                        >
                            <MultiPoint
                                image='point'
                                points={vets.slice()}
                                onItemPress={(point) => this._onItemPress(point)}
                            />
                        </MapView>
                    </View>
                    {didiStore.current.name ?
                        <View style={styles.userProfile}>
                            <Image style={styles.head} source={{uri: current.head_photo}}></Image>
                            <View style={styles.profile}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontSize: 18}}>{current.name}</Text>
                                    <Text style={{fontSize: 14, color: '#ccc', marginLeft: 5}}>手机{current.phone}</Text>
                                </View>
                                <Text style={{marginTop: 5}}>专长：{current.goodat}</Text>
                            </View>
                            <TouchableHighlight style={styles.detailButton} onPress={() => {
                                const {navigation} = this.props;
                                navigation.navigate("VetInfo",{ vet: current })
                            }}>
                                <Text style={{color: '#fff'}}>详情</Text>
                            </TouchableHighlight>
                        </View> :
                        <View style={styles.noCurrent}>
                            {isFetching ?
                                <Text style={{fontSize: 16, color: 'red',}}>正在查找您附近的医生，请稍后...</Text>
                                :
                                <Text>请点击地图标记选择兽医</Text>
                            }
                        </View>
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    profile:{
        flex:1,
        marginLeft:10,
    },
    detailButton:{
        backgroundColor:'#69aecc',
        padding:15,
        borderRadius:5,
    },
    noCurrent:{
        height:80,
        justifyContent:'center',
        alignSelf:'center'
    }
});