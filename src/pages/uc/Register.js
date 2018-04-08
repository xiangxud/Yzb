import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { inject, observer } from 'mobx-react/native'
import {Container, Content, Body, CheckBox, Icon, Form, Item, Input, Label, Text, Button,Left,ActionSheet} from 'native-base';
import {MaskLoading} from '../../components'

@inject('userStore')
@observer
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agree: false,
            timerCount: 60,
            timerTitle: '获取',
            counting: false,
            selfEnable: true,
        }
    }

    static navigationOptions = {
        headerTitle: '注册养殖宝',
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
        if(!userStore.loginPhone || userStore.loginPhone==""){
            tools.showToast("请输入手机号");
            return;
        }

        userStore.setLoading();
        request.getJson(urls.apis.USER_GET_PHONE_CODE, {phone: userStore.loginPhone, type: t}).then((res) => {
            userStore.setLoading();
            this._countDownAction();
            userStore.setValidateCode(res);
            //tools.showToast('验证码：' + res);
            tools.showToast('验证码已发送，请注意查收手机短信');
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

        if (!this.state.agree) {
            tools.showToast('请先同意许可条款');
            return;
        } else if (userStore.validateErrorLoginPhone) {
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
        } else if (!userStore.name || userStore.name.length<2) {
            tools.showToast('请输入正确的姓名');
            return;
        } else if (!userStore.farmName) {
            tools.showToast('请输入养殖场名称');
            return;
        } else if (!userStore.animalType.length) {
            tools.showToast('请选择您的养殖类型');
            return;
        }
        userStore.setLoading();
        userStore.register((res) => {
            this._login();
        }, (err) => {
            userStore.setLoading();
            tools.showToast(err.message);
            //alert(JSON.stringify(err));
        });
    }
    onDisplayUserType=()=>{
        const {userStore} = this.props;
        options = userStore.onGetUserTypeOptions();
        ActionSheet.show(
            {
                options: options,
                title: "用户类型"
            },
            index => {
                userStore.onUpdateUserType(options[index]);
            }
        )
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
                                   placeholderTextColor='#b1b1b1'
                                   maxLength={11}
                                   keyboardType={'phone-pad'}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   onChangeText={(text)=> userStore.setLoginPhone(text)} />
                        </Item>
                        <Item fixedLabel>
                            <Label>验证码</Label>
                            <Input placeholder="请输入6位验证码"
                                   placeholderTextColor='#b1b1b1'
                                   maxLength={6}
                                   keyboardType={'numeric'}
                                   onChangeText={(text)=> userStore.setValidateCode(text)} />
                            <Button rounded success small
                                    style={styles.btnGetCode}
                                    disabled={ userStore.loading || this.state.counting }
                                    onPress={()=>{
                                        !this.state.counting && this.state.selfEnable && this.getValidateCode(1)
                                    }}>
                                <Text>{this.state.timerTitle}</Text>
                            </Button>
                        </Item>
                        <Item fixedLabel>
                            <Label>登陆密码</Label>
                            <Input placeholder="请输入(6-20位)登录密码"
                                   placeholderTextColor='#b1b1b1'
                                   maxLength={20}
                                   secureTextEntry={true}
                                   onChangeText={(text)=> userStore.setRegisterPassword(text)} />
                        </Item>
                        <Item fixedLabel>
                            <Label>重复密码</Label>
                            <Input placeholder="请输入上面相同的密码"
                                   placeholderTextColor='#b1b1b1'
                                   maxLength={20}
                                   secureTextEntry={true}
                                   onChangeText={(text)=> userStore.setRegisterPasswordRepeat(text)} />
                        </Item>
                        <Item fixedLabel>
                            <TouchableOpacity
                                style={{flex:1,flexDirection:'row',alignItems:'center'}}
                                onPress={()=>this.onDisplayUserType()}>
                                <Label>类型</Label>
                                <Input placeholder="请选择用户类型"
                                       placeholderTextColor='#b1b1b1'
                                       value={userStore.userTypeLabel}
                                       editable={false}
                                />
                            </TouchableOpacity>
                        </Item>
                        <Item fixedLabel>
                            <Label>真实姓名</Label>
                            <Input placeholder="请输入您的真实姓名"
                                   placeholderTextColor='#b1b1b1'
                                   maxLength={20}
                                   onChangeText={(text)=> userStore.setName(text)} />
                        </Item>
                        <Item fixedLabel>
                            <Label>企业名称</Label>
                            <Input placeholder="请输入您的企业名称"
                                   placeholderTextColor='#b1b1b1'
                                   maxLength={100}
                                   onChangeText={(text)=> userStore.setFarm(text)} />
                        </Item>
                        <Item fixedLabel last style={{paddingBottom:10, paddingTop:10}}>
                            <Label>养殖类型</Label>
                            <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>userStore.setBreed(0)}>
                                <CheckBox checked={userStore.animalType.indexOf(0)>-1} onPress={()=>userStore.setBreed(0)} />
                                <Text style={{marginLeft:15}}>家禽</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>userStore.setBreed(1)}>
                                <CheckBox checked={userStore.animalType.indexOf(1)>-1} onPress={()=>userStore.setBreed(1)} />
                                <Text style={{marginLeft:15}}>家畜</Text>
                            </TouchableOpacity>
                        </Item>
                        <View style={{flexDirection:'row', margin:20,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>this.setState({agree: !this.state.agree})} style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <CheckBox checked={this.state.agree} onPress={()=>this.setState({agree: !this.state.agree})} />
                                <Text style={{marginLeft:15}}>同意</Text>
                            </TouchableOpacity>
                            <Text style={{color:'#377cc3'}} onPress={()=>this.props.navigation.navigate('Web', {url: urls.pages.PROTOCOL, title:'用户协议'})}>许可协议</Text>
                        </View>
                    </Form>
                    <Button block success disabled={userStore.loading} onPress={() => { this.submit() }} style={{margin:10}}>
                        <Text>注册</Text>
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