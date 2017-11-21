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
export default class Didi extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '滴滴兽医',
        headerRight: <View></View>
    });

    componentDidMount(){
        didiStore.fetchVets()
    }

    _points = Array(1000).fill(0).map(i => ({
            "id": "8254e1bd-cadc-41f3-8bb2-666cebb8bf08",
            "name": "上官柳村",
            "phone": "18307722503",
            "head_photo": "http://src.onlinedown.net/images/h_imges/wdj/3/logo/e77ab24ba0217fbc91a7af1f121cf1eb_256_256.png",
            "remark": "这是一个好医生",
            latitude: 39.5 + Math.random(),
            longitude: 116 + Math.random(),
            "title": "上官柳村",
            "subtitle": "高级专家，农艺师"
        })
    )

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
                                <Text style={{marginTop: 5}}>{current.remark}</Text>
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
        backgroundColor:'#363bc3',
        padding:5,
    },
    noCurrent:{
        justifyContent:'center',
        alignSelf:'center'
    }
});