import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
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

        return (<Container>
            <Content>
                <Text style={{margin:5}}>
                    养殖宝® 是一款专业的智能养殖App，为您提供：
                </Text>
                <Badge info style={{margin:5}}>
                    <Text>栋舍监控</Text>
                </Badge>
                <Badge info style={{margin:5}}>
                    <Text>环控监控</Text>
                </Badge>
                <Badge info style={{margin:5}}>
                    <Text>动物诊疗</Text>
                </Badge>
                <Badge info style={{margin:5}}>
                    <Text>智能报表</Text>
                </Badge>
                <Badge info style={{margin:5}}>
                    <Text>智能报表</Text>
                </Badge>

                <Button full success onPress={()=> navigation.navigate('Join')} style={{ margin:10, flex:1 }}>
                    <Text>已有邀请码</Text>
                </Button>
                <Button full success onPress={()=> navigation.navigate('Register')} style={{ margin:10, flex:1 }}>
                    <Text>注册新养殖场</Text>
                </Button>
            </Content>
        </Container>);
    }
}
const styles = StyleSheet.create({
    btnGetCode: {
        position:'absolute',
        top:10,
        right:5,
    }
});