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
import {Text, Icon, Button, Spinner} from 'native-base'
import {Container, Content} from "../../components";

@inject('didiStore')
@observer
export default class MarkerExample extends Component {
    static navigationOptions = {
        title: '滴滴兽医',
        headerRight: <View/>
    }
    _onItemPress = (point) => {
        didiStore.setCurrent(point);
    }

    render() {
        const {navigation} = this.props;
        const {vets, current, isFetching, locationInterval, position} = didiStore;
        return(
            <Container>
                <Content>
                    <MapView locationEnabled
                             locationInterval={locationInterval}
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
                        <MultiPoint
                            image='point'
                            points={vets.slice()}
                            onItemPress={(point) => this._onItemPress(point)}
                        />
                    </MapView>
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
                            <Button bordered info onPress={() => { navigation.navigate("VetInfo",{ vet: current }) }}>
                                <Text>详情</Text>
                            </Button>
                            {false?<Icon name={'ios-close-circle-outline'} onPress={()=>this._onItemPress({})} style={{position:'absolute', left:0, bottom:-2, color:'red'}}/>:null}
                        </View> :
                        <View style={styles.noCurrent}>
                            {isFetching ?
                                <View>
                                    <Spinner color={'red'}/>
                                    <Text style={styles.loadingText}>正在查找您附近的医生，请稍后...</Text>
                                </View>
                                :
                                <Text style={styles.loadingText}>请点击地图中的标记选择兽医</Text>
                            }
                        </View>
                    }
                </Content>
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
    profile:{
        flex:1,
        marginLeft:10,
    },
    noCurrent:{
        height:80,
        justifyContent:'center',
        alignSelf:'center'
    }
})