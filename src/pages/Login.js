import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import {NavigationActions} from 'react-navigation';
import { inject, observer } from 'mobx-react/native'
import {Container, Content, Icon, Form, Item, Input, Label, Text, Button} from 'native-base';
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
            loading: false,
            canSend: true,
        }
    }

    static navigationOptions = {
        header: null
    }

    onChangeStep = (step, stepTitle) => {
        this.setState({step: step, stepTitle: stepTitle});
    }

    getValidateCode = (t) =>{
        request.getJson(urls.apis.USER_GET_PHONE_CODE, {phone: userStore.loginPhone, type: t}).then((res)=>{
            alert(res)
        }).catch((err)=>{
            tools.showToast(err);
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
                        tools.showToast('bbb'+JSON.stringify(err))
                    });
                }
            })
        }
        else if (this.state.step === 2) {
            //注册
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
                    <Item fixedLabel style={styles.pdR}>
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
                    <Item fixedLabel style={styles.pdR}>
                        <Label>手机号码</Label>
                        <Input placeholder="请输入手机号码"
                               maxLength={11}
                               keyboardType={'phone-pad'}
                               autoCapitalize='none'
                               autoCorrect={false}
                               onChangeText={(text)=> userStore.setLoginPhone(text)} />
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>验证码</Label>
                        <Input placeholder="请输入6位验证码"
                               maxLength={6}
                               keyboardType={'numeric'}
                               onChangeText={(text)=> userStore.setRegisterValidateCode(text)} />
                        <Button rounded success small style={styles.btnGetCode} disabled={this.state.canSend} onPress={()=>this.getValidateCode(1)}>
                            <Text>获取验证码</Text>
                        </Button>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>登陆密码</Label>
                        <Input placeholder="请输入(6-20位)登录密码"
                               maxLength={20}
                               secureTextEntry={true}
                               onChangeText={(text)=> userStore.setRegisterPassword(text)} />
                    </Item>
                    <Item fixedLabel last style={styles.pdR}>
                        <Label>重复密码</Label>
                        <Input placeholder="请输入上面相同的密码"
                               maxLength={20}
                               secureTextEntry={true}
                               onChangeText={(text)=> userStore.setRegisterPasswordRepeat(text)} />
                    </Item>
                </Form>
            )
        }
        else if(this.state.step === 3){
            return (
                <Form>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>手机号码</Label>
                        <Input placeholder="请输入手机号码"
                               maxLength={11}
                               keyboardType={'phone-pad'}
                               autoCapitalize='none'
                               autoCorrect={false}
                               onChangeText={(text)=> userStore.setLoginPhone(text)} />
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>验证码</Label>
                        <Input placeholder="请输入6位验证码"
                               maxLength={6}
                               keyboardType={'numeric'}
                               onChangeText={(text)=> userStore.setRegisterValidateCode(text)}/>
                        <Button rounded success small style={styles.btnGetCode} onPress={()=>this.getValidateCode(2)}>
                            <Text>获取验证码</Text>
                        </Button>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>登陆密码</Label>
                        <Input placeholder="请输入(6-20位)登录密码"
                               maxLength={20}
                               secureTextEntry={true}
                               onChangeText={(text)=> userStore.setRegisterPassword(text)} />
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
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
                    <View style={{marginLeft:10, marginRight:10, flexDirection:'row'}}>
                        {this.state.step!==2?
                            <TouchableOpacity visible={false} onPress={() => { this.onChangeStep(2, '注册') }} style={{alignItems:'flex-start', flex:1,}}>
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