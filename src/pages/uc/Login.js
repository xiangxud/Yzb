import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { observer, inject } from 'mobx-react/native'
import {Container, Content, Form, Item, Input, Label, Text, Button} from 'native-base';
import {MaskLoading} from '../../components'

@inject('userStore')
@observer
export default class Login extends Component {

    static navigationOptions = {
        header: null
    }
    _login = () =>{
        const { userStore, navigation }= this.props;
        userStore.login((status, resp)=> {
            if(!status){
                tools.showToast(resp);
            }else {
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main', params: {token: resp}})
                    ]
                });
                navigation.dispatch(resetAction);
            }
        });
    }

    submit = () => {
        const { userStore }= this.props;
        if(userStore.validateErrorLoginPhone){
            tools.showToast(userStore.validateErrorLoginPhone);
            return;
        }else if(userStore.validateErrorLoginPassword){
            tools.showToast(userStore.validateErrorLoginPassword);
            return;
        }
        this._login();
    }

    render() {
        const {userStore, navigation} = this.props;
        return (
            <Container>
                <Content>
                    <MaskLoading show={userStore.loading}/>
                    <View style={styles.topScene}>
                        <Text style={styles.logo}>`${config.appName}`</Text>
                    </View>
                    <Form>
                        <Item fixedLabel>
                            <Label>手机号</Label>
                            <Input placeholder="请输入手机号码"
                                   maxLength={11}
                                   keyboardType={'phone-pad'}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   onChangeText={(text)=> userStore.setLoginPhone(text)} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>登录密码</Label>
                            <Input placeholder="请输入登陆密码"
                                   maxLength={20}
                                   secureTextEntry={true}
                                   onTextChange={(text)=> userStore.setLoginPassword(text)}

                            />
                        </Item>
                    </Form>
                    <Button block success disabled={userStore.loading} onPress={() => { this.submit() }} style={{margin:10}}>
                        <Text>登录</Text>
                    </Button>
                    <View style={{margin:10, flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{alignItems:'flex-start', flex:1,}}>
                            <Text>没有账号？现在注册</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('FindPassword')} style={{alignItems:'flex-end', flex:1,}}>
                            <Text style={{}}>忘记密码？</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    topScene: {
        height:200,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#009688',
    },
    logo:{
        color:'#fff',
        fontSize:24,
    },
});