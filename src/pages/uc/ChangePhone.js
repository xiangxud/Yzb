import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {observer, inject} from 'mobx-react/native'
import {Container, Content, Form, Item, Input, Label, Text, Button} from 'native-base';
import {MaskLoading} from '../../components'

@inject('userStore')
@observer
export default class ChangePhone extends Component {
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
        headerTitle: '绑定新手机',
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
        request.getJson(urls.apis.USER_GET_REBIND_CODE, {phone: userStore.loginPhone, shareid: null}).then((res) => {
            userStore.setLoading();
            this._countDownAction();
            userStore.setValidateCode(res);
            tools.showToast('验证码：' + res);
        }).catch((err) => {
            userStore.setLoading();
            tools.showToast(err.message);
        })
    }
    submit = () => {
        const {userStore} = this.props;
        if (userStore.validateErrorLoginPhone) {
            tools.showToast(userStore.validateErrorLoginPhone);
            return;
        } else if (userStore.validateErrorValidateCode) {
            tools.showToast(userStore.validateErrorValidateCode);
            return;
        }
        this.rebind();
    }
    rebind = () => {
        const {userStore, navigation} = this.props;
        userStore.setLoading();
        request.postJson(urls.apis.USER_REBIND, {
            Mobile: userStore.loginPhone,
            VCode: userStore.validateCode
        }).then((res) => {
            userStore.setLoading();
            if (this.props.userStore.logout()) {
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login', params: {token: null}})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                alert('处理失败，请稍后再试');
            }
        }).catch((err) => {
            userStore.setLoading();
            tools.showToast(err.message);
        })
    }

    render() {
        const {userStore, navigation} = this.props;
        return (
            <Container>
                <Content>
                    <MaskLoading show={userStore.loading}/>
                    <Form>
                        <Item fixedLabel>
                            <Label>手机号</Label>
                            <Input placeholder="请输入新手机号"
                                   maxLength={11}
                                   keyboardType={'phone-pad'}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   onChangeText={(text) => userStore.setLoginPhone(text)}/>
                        </Item>
                        <Item fixedLabel>
                            <Label>验证码</Label>
                            <Input placeholder="请输入6位验证码"
                                   maxLength={6}
                                   keyboardType={'numeric'}
                                   onChangeText={(text) => userStore.setValidateCode(text)}/>
                            <Button rounded success small
                                    style={styles.btnGetCode}
                                    disabled={userStore.loading || this.state.counting}
                                    onPress={() => {
                                        !this.state.counting && this.state.selfEnable && this.getValidateCode(2)
                                    }}>
                                <Text>{this.state.timerTitle}</Text>
                            </Button>
                        </Item>
                    </Form>
                    <Button block success disabled={userStore.loading} onPress={() => {
                        this.submit()
                    }} style={{margin: 10}}>
                        <Text>确认修改</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    btnGetCode: {
        position: 'absolute',
        top: 10,
        right: 5,
    }
});