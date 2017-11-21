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

export default class VetInfo extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '呼叫兽医',
        headerRight: <View></View>
    });

    render() {
        const {vet} = this.props;
        return (
            <Container>
                <Content white>
                    <View style={{backgroundColor:'#fff', padding:15}}>
                        <Text>医生信息</Text>
                    </View>
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