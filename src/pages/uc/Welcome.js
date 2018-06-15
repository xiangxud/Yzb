import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Container, Content, Body,Badge,Text, Button,Left,ActionSheet,Footer,FooterTab} from 'native-base';
import {MaskLoading} from '../../components'

export default class WelcomeRegister extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        headerTitle: '欢迎注册',
        headerRight: <View/>
    }
    render(){
        const {navigation} = this.props;

        return (
                <View style={{flex:1}}>
                    <View style={{flex:3,justifyContent:'center',alignItems:'center',alignContent:'space-between'}}>
                        <Image resizeMode="contain" source={require('../../resource/logo_1.png')}></Image>
                        <View style={{marginTop:3}}>
                            <Text>您身边的养殖专家</Text>
                        </View>
                    </View>
                    <View style={{ flex : 1 }}>
                        <Button full success onPress={()=> navigation.navigate('Join')} style={{ margin:10, flex:1 }}>
                            <Text>已有邀请码</Text>
                        </Button>
                        <Button full success onPress={()=> navigation.navigate('Register')} style={{ margin:10, flex:1 }}>
                            <Text>注册新养殖场</Text>
                        </Button>
                    </View>
                </View>);
    }
}
const styles = StyleSheet.create({
    btnGetCode: {
        position:'absolute',
        top:10,
        right:5,
    }
});