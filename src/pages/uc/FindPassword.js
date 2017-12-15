import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { inject, observer } from 'mobx-react/native'
import {Container, Content, Icon, Form, Item, Input, Label, Text, Button} from 'native-base';
import {MaskLoading} from '../../components'

@inject('userStore')
@observer
export default class FindPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agree: false,
            timerCount: 60,
            timerTitle: '获取验证码',
            counting: false,
            selfEnable: true,
        }
    }

    static navigationOptions = {
        headerTitle: '找回我的密码',
        headerRight: <View/>
    }

    _countDownAction() {
        this.setState({
            counting: true,
            selfEnable: false
        });

        const codeTime = this.state.timerCount;
        const now = Date.now();
        const overTimeStamp = now + codeTime * 1000 + 100;
        /*过期时间戳（毫秒） +100 毫秒容错*/
        this.interval = setInterval(() => {
            const nowStamp = Date.now();
            if (nowStamp >= overTimeStamp) {
                /* 倒计时结束*/
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: '获取验证码',
                    counting: false,
                    selfEnable: true,
                });
            } else {
                const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10);
                this.setState({
                    timerCount: leftTime,
                    timerTitle: `${leftTime}s后再获取`,
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getValidateCode = (t) => {
        const {userStore} = this.props;
        if (this.state.counting) {
            return
        }
        if (userStore.validateErrorLoginPhone) {
            tools.showToast(userStore.validateErrorLoginPhone);
            return;
        }
        userStore.setLoading();
        request.getJson(urls.apis.USER_GET_PHONE_CODE, {phone: userStore.loginPhone, type: t}).then((res) => {
            userStore.setLoading();
            this._countDownAction();
            userStore.setValidateCode(res);
            tools.showToast('验证码：' + res);
        }).catch((err) => {
            userStore.setLoading();
            tools.showToast(err.message);
        })
    }
    _login = () => {
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
        const {userStore} = this.props;

        if (userStore.validateErrorLoginPhone) {
            tools.showToast(userStore.validateErrorLoginPhone);
            return;
        } else if (userStore.validateErrorRegisterPassword) {
            tools.showToast(userStore.validateErrorRegisterPassword);
            return;
        } else if (userStore.validateErrorRegisterPasswordRepeat) {
            tools.showToast(userStore.validateErrorRegisterPasswordRepeat);
            return;
        }else if(userStore.registerPassword!=userStore.registerPasswordRepeat){
            tools.showToast('两次密码不一致，请修改');
            return;
        } else if (userStore.validateErrorValidateCode) {
            tools.showToast(userStore.validateErrorValidateCode);
            return;
        }
        userStore.setLoading();
        userStore.find((res) => {
            this._login();
        }, (err) => {
            userStore.setLoading();
            //tools.showToast(err.message);
            alert(JSON.stringify(err))
        });
    }
    render() {
        const {userStore} = this.props;
        return (
            <Container>
                <Content>
                    {userStore.loading? <MaskLoading /> :null}
                    <Form>
                        <Item fixedLabel>
                            <Label>手机号码</Label>
                            <Input placeholder="请输入手机号码"
                                   maxLength={11}
                                   keyboardType={'phone-pad'}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   onChangeText={(text)=> userStore.setLoginPhone(text)} />
                        </Item>
                        <Item fixedLabel>
                            <Label>验证码</Label>
                            <Input placeholder="请输入6位验证码"
                                   maxLength={6}
                                   keyboardType={'numeric'}
                                   onChangeText={(text)=> userStore.setValidateCode(text)} />
                            <Button rounded success small
                                    style={styles.btnGetCode}
                                    disabled={ userStore.loading || this.state.counting }
                                    onPress={()=>{
                                        !this.state.counting && this.state.selfEnable && this.getValidateCode(2)
                                    }}>
                                <Text>{this.state.timerTitle}</Text>
                            </Button>
                        </Item>
                        <Item fixedLabel>
                            <Label>登陆密码</Label>
                            <Input placeholder="请输入(6-20位)登录密码"
                                   maxLength={20}
                                   secureTextEntry={true}
                                   onChangeText={(text)=> userStore.setRegisterPassword(text)} />
                        </Item>
                        <Item fixedLabel>
                            <Label>重复密码</Label>
                            <Input placeholder="请输入上面相同的密码"
                                   maxLength={20}
                                   secureTextEntry={true}
                                   onChangeText={(text)=> userStore.setRegisterPasswordRepeat(text)} />
                        </Item>
                    </Form>
                    <Button block success disabled={userStore.loading} onPress={() => { this.submit() }} style={{margin:10}}>
                        <Text>重置登录密码</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    btnGetCode: {
        position:'absolute',
        top:10,
        right:5,
    }
});