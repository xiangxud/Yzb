/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Linking,
} from 'react-native';
import {Container, Content} from "../../components";
import {Button, Icon, Text,} from 'native-base';

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
                            <Text style={{fontSize:20, fontWeight:'bold', color:'#459d26'}}>
                                { vet.name }
                            </Text>
                            <Text style={styles.item_line}>
                                已服务{vet.service_count}人
                            </Text>
                            <Text style={styles.item_line}>
                                服务评分：{vet.star? vet.star: '暂无评分'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descContainer}>
                        <Text>
                            从事临床生产经验：{vet.clinic_year? vet.clinic_year: '未知'}
                        </Text>
                        <Text>
                            专长：{vet.major_skill}
                        </Text>
                    </View>
                    <View style={styles.descContainer}>
                        <Text>
                            简介：{vet.vitae} {vet.skill}
                        </Text>
                    </View>
                    <View style={{margin:20}}>
                        <Button block success large onPress={()=>{Linking.canOpenURL('tel:' + vet.phone).then(supported => {
                            if(supported){
                                Linking.openURL('tel:' + vet.phone);
                            }else{
                                tools.showToast('无法拨打电话' + vet.phone);
                            }
                        })}}>
                            <Icon name={'ios-call-outline'} style={{color:'#fff'}}/>
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
    item_line:{
        fontSize:14,
        marginTop:5,
        color:'#6f6f6f'
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