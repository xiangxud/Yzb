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
    TouchableHighlight,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Content} from "../../components";
import {Button} from 'native-base';

export default class VetInfo extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '呼叫兽医',
        headerRight: <View></View>
    });

    render() {
        const { vet } = this.props.navigation.state.params;
        return (
            <Container>
                <Content gray>
                    <View style={styles.cardContainer}>
                        <Image source={{uri: vet.head_photo}} style={styles.head}/>
                        <View style={styles.userProfile}>
                            <Text style={{fontSize:18, fontWeight:'bold',}}>
                                <Icon name={'user-circle-o'} size={20} /> { vet.name }
                            </Text>
                            <Text style={{fontSize:14, marginTop:5, color:'#ccc'}}>
                                <Icon name={'thumbs-o-up'} size={16} /> 已服务{vet.service_count}人
                            </Text>
                            <Text style={{fontSize:14, marginTop:5, color:'#ccc'}}>
                                <Icon name={'star-half-o'} size={16} /> 服务评分：{vet.star?vet.star:'暂无评分'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descContainer}>
                        <Text>
                            专长：{vet.goodat}
                        </Text>
                        <Text>
                            成就：{vet.remark}
                        </Text>
                    </View>
                    <View style={{margin:20}}>
                        <Button block success onPress={()=>{Linking.canOpenURL('tel:'+vet.phone).then(supported => {
                            if(supported){
                                Linking.openURL('tel:'+vet.phone);
                            }else{
                                tools.showToast('无法拨打电话'+vet.phone);
                            }
                        })}}>
                            <Text>给他打电话</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection:'row',
        backgroundColor:'#fff',
        alignItems:'center',
        marginTop:20,
    },
    head:{
        width:70,
        height:70,
        margin:15,
    },
    profile: {
        flex:1,
        justifyContent:'center',
    },
    descContainer:{
        marginTop:20,
        padding:15,
        backgroundColor:'#fff'
    },
    detailButton:{
        backgroundColor:'#69aecc',
        padding:15,
        borderRadius:5,
    }
});