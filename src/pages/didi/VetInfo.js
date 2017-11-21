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
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Content} from "../../components";
import {observer, inject} from 'mobx-react/native'
import {MapView, Marker, Polyline, MultiPoint} from 'react-native-amap3d'

@inject('didiStore')
@observer
export default class VetInfo extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '呼叫兽医',
        headerRight: <View></View>
    });

    componentDidMount(){
        didiStore.fetchVets()
    }

    _onItemPress = (point) => {
        didiStore.setCurrent(point);
    }

    render() {
        const {vets, current, isFetching} = didiStore;
        return (
            <Container>
                <Content white delay={isFetching}>
                    <View style={{flex:1,}}>
                        {!isFetching ?
                            <MapView
                                locationEnabled={true}
                                showsLocationButton={true}
                                rotateEnabled={false}
                                zoomLevel={8}
                                style={StyleSheet.absoluteFill}>
                                <MultiPoint
                                    image='point'
                                    points={vets.slice()}
                                    onItemPress={(point) => this._onItemPress(point)}
                                />
                            </MapView>
                        : null}
                    </View>
                    {didiStore.current.name ?
                        <View style={styles.userProfile}>
                            <Image style={styles.head} source={{uri: current.head_photo}}></Image>
                            <View style={styles.profile}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontSize: 18}}>{current.name}</Text>
                                    <Text style={{fontSize: 14, color: '#ccc', marginLeft: 5}}>手机{current.phone}</Text>
                                </View>
                                <Text style={{marginTop: 5}}>简介：{current.remark}</Text>
                            </View>
                            <TouchableHighlight style={styles.detailButton} onPress={() => {
                                alert('hi')
                            }}>
                                <Text style={{color: '#fff'}}>详情</Text>
                            </TouchableHighlight>
                        </View> :
                        <View style={styles.noCurrent}>
                            <Text>请点击地图标记选择兽医</Text>
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