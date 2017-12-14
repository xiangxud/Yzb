import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { inject, observer } from 'mobx-react/native'
import {Container, Content, Body, CheckBox, Icon, Form, Item, Input, Label, Text, Button} from 'native-base';
import {MaskLoading} from '../components'
import userStore from "../store/userStore";

@inject('userStore')
@observer
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            stepTitle: '登录',
            loginErrors: {},
            agree: false,
            loading: false,
            timerCount: 60,
            timerTitle: '获取验证码',
            counting: false,
            selfEnable: true,
        }
    }

    static navigationOptions = {
        header: null
    }

    onChangeStep = (step, stepTitle) => {
        this.setState({step: step, stepTitle: stepTitle});
    }
    _countDownAction(){
        this.setState({
            counting: true,
            selfEnable: false
        });

        const codeTime = this.state.timerCount;
        const now = Date.now();
        const overTimeStamp = now + codeTime * 1000 + 100;/*过期时间戳（毫秒） +100 毫秒容错*/
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
            }else{
                const leftTime = parseInt((overTimeStamp - nowStamp)/1000, 10);
                this.setState({
                    timerCount: leftTime,
                    timerTitle: `${leftTime}s后再获取`,
                });
            }
        }, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    getValidateCode = (t) =>{
        if (this.state.counting) {return}
        //if (shouldStart) {
        //}else{
        //    this.setState({selfEnable: true});
        //}
        if(userStore.validateErrorLoginPhone){
            tools.showToast(userStore.validateErrorLoginPhone);
            return;
        }
        this.setState({loading: true});
        request.getJson(urls.apis.USER_GET_PHONE_CODE, {phone: userStore.loginPhone, type: t}).then((res)=>{
            this.setState({loading: false});
            this._countDownAction();
            alert(res);
        }).catch((err)=>{
            this.setState({loading: false});
            tools.showToast(err.message);
        })
    }

    _login = () => {
        const { userStore, navigation }= this.props;

        if (this.state.step === 1) {
            //登录
            if(userStore.validateErrorLoginPhone){
                tools.showToast(userStore.validateErrorLoginPhone);
                return;
            }else if(userStore.validateErrorLoginPassword){
                tools.showToast(userStore.validateErrorLoginPassword);
                return;
            }

            this.setState({loading: true});
            userStore.login((status, resp)=> {
                this.setState({loading: false});
                if(!status){
                    tools.showToast(resp)
                }else {
                    userStore.fetchLoginUser().then((data) => {
                        userStore.setLoginUser(data)
                        let resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Main', params: {token: resp.access_token}})
                            ]
                        });
                        navigation.dispatch(resetAction);
                    }).catch((err) => {
                        tools.showToast(err.message);
                    });
                }
            })
        }
        else if (this.state.step === 2) {
            //注册
            if(!this.state.agree){
                tools.showToast('请先同意许可条款');
                return;
            } else if(userStore.validateErrorLoginPhone){
                tools.showToast(userStore.validateErrorLoginPhone);
                return;
            }else if(userStore.validateErrorRegisterPassword){
                tools.showToast(userStore.validateErrorRegisterPassword);
                return;
            }else if(userStore.validateErrorRegisterPasswordRepeat){
                tools.showToast(userStore.validateErrorRegisterPasswordRepeat);
                return;
            }else if(userStore.validateErrorRegisterValidateCode){
                tools.showToast(userStore.validateErrorRegisterValidateCode);
                return;
            }
            this.setState({loading: true});
            userStore.register().then(() => {
                this.setState({loading: false});
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main', params: {token: ''}})
                    ]
                });
                navigation.dispatch(resetAction);
            });
        }
        else if (this.state.step === 3) {
            //找回密码
            if(userStore.validateErrorLoginPhone){
                tools.showToast(userStore.validateErrorLoginPhone);
                return;
            }else if(userStore.validateErrorRegisterPassword){
                tools.showToast(userStore.validateErrorRegisterPassword);
                return;
            }else if(userStore.validateErrorRegisterPasswordRepeat){
                tools.showToast(userStore.validateErrorRegisterPasswordRepeat);
                return;
            }else if(userStore.validateErrorRegisterValidateCode){
                tools.showToast(userStore.validateErrorRegisterValidateCode);
                return;
            }
            this.setState({loading: true});
            userStore.find().then(() => {
                this.setState({loading: false});
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main', params: {token: ''}})
                    ]
                });
                navigation.dispatch(resetAction);
            });
        }
    }

    renderBackArrow() {
        if (this.state.step > 1) {
            return (
                <TouchableWithoutFeedback onPress={()=>{ this.onChangeStep(1, '登录'); }}>
                    <Icon name="ios-arrow-round-back" style={styles.backArrow} />
                </TouchableWithoutFeedback>
            )
        }
    }
    renderForm() {
        const {userStore} = this.props;
        if (this.state.step === 1) {
            return (
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
                               maxLength={16}
                               secureTextEntry={true}
                               onTextChange={(text)=> userStore.setLoginPassword(text)}

                        />
                    </Item>
                </Form>
            );
        }
        else if (this.state.step === 2) {
            return (
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
                               onChangeText={(text)=> userStore.setRegisterValidateCode(text)} />
                        <Button rounded success small
                                style={styles.btnGetCode}
                                disabled={ this.state.counting }
                                onPress={()=>{
                                    !this.state.counting && this.state.selfEnable && this.getValidateCode(1)
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
                    <Item fixedLabel>
                        <Label>真实姓名</Label>
                        <Input placeholder="请输入您的真实姓名"
                               maxLength={20}
                               onChangeText={(text)=> {}} />
                    </Item>
                    <Item fixedLabel>
                        <Label>企业名称</Label>
                        <Input placeholder="请输入您的养殖场名称"
                               maxLength={100}
                               onChangeText={(text)=> {}} />
                    </Item>
                    <Item fixedLabel last>
                        <Label>养殖类型</Label>
                        <Input placeholder="家禽家畜"
                               maxLength={20}
                               onChangeText={(text)=> {}} />
                    </Item>
                    <View style={{flexDirection:'row', margin:20}}>
                        <CheckBox checked={this.state.agree} color='#377cc3' onPress={()=>this.setState({agree: !this.state.agree})} />
                        <Text style={{marginLeft:15}}>同意</Text>
                        <Text style={{color:'#377cc3'}} onPress={()=>this.props.navigation.navigate('Web', {url: urls.webPath+'/yzb/about/protocol', title:'用户协议'})}>许可协议</Text>
                    </View>
                </Form>
            )
        }
        else if(this.state.step === 3){
            return (
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
                               onChangeText={(text)=> userStore.setRegisterValidateCode(text)}/>
                        <Button rounded success small style={styles.btnGetCode} onPress={()=>this.getValidateCode(2)}>
                            <Text>获取验证码</Text>
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
            )
        }
    }
    render() {
        return (
            <Container>
                <Content>
                    <View style={{height:200, justifyContent:'center', alignItems:'center', backgroundColor:'#009688'}}>
                        <Text style={{color:'#fff',fontSize:24,}}>养殖宝</Text>
                    </View>
                    {this.renderBackArrow()}
                    {this.state.loading? <MaskLoading /> :null}
                    {this.renderForm()}
                    <Button block success disabled={this.state.loading} onPress={() => { this._login() }} style={{margin:10}}>
                        <Text>{this.state.stepTitle}</Text>
                    </Button>
                    <View style={{margin:10, flexDirection:'row'}}>
                        {this.state.step!==2?
                            <TouchableOpacity onPress={() => { this.onChangeStep(2, '注册') }} style={{alignItems:'flex-start', flex:1,}}>
                                <Text>没有账号？现在注册</Text>
                            </TouchableOpacity>
                            : null }
                        {this.state.step!==3?
                            <TouchableOpacity onPress={() => { this.onChangeStep(3, '找回密码') }} style={{alignItems:'flex-end', flex:1,}}>
                                <Text style={{}}>忘记密码？</Text>
                            </TouchableOpacity>
                            : null }
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        paddingBottom: 20
    },
    backArrow: {
        top: 15,
        left: 15,
        fontSize:36,
        fontWeight:'bold',
        color:'#fff',
        position: 'absolute',
        alignSelf: 'flex-start',
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '40%'
    },
    btnGetCode: {
        position:'absolute',
        top:10,
        right:5,
    }
});