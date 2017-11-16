import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import {NavigationActions} from 'react-navigation';
import { inject, observer } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import AnooTextInput from '../components/AnooTextInput';
const dismissKeyboard = require('dismissKeyboard');

@inject('userStore')
@observer
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            stepTitle: '登录',
            loginErrors: {},
            showSpinner: false,
        }
    }

    static navigationOptions = {
        header: null
    }

    onChangeStep = (step, stepTitle) => {
        this.setState({step: step, stepTitle: stepTitle});
    }
    onTextChange = (v) =>{
        const {userStore} = this.props;
        userStore.setLoginPhone(v)
    }
    _login = () => {
        this.loginRequest = requestAnimationFrame(() => {

            dismissKeyboard();

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

                this.setState({showSpinner: true});
                userStore.login((status, resp)=> {
                    this.setState({showSpinner: false});
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
                //注册
                this.setState({showSpinner: true});
                userStore.register().then(() => {
                    this.setState({showSpinner: false});
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
                this.setState({showSpinner: true});
                userStore.register().then(() => {
                    this.setState({showSpinner: false});
                    let resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'Main', params: {token: ''}})
                        ]
                    });
                    navigation.dispatch(resetAction);
                });
            }
        })
    }
    componentWillUnmount() {
        this.loginRequest && cancelAnimationFrame(this.loginRequest)
    }

    renderBackArrow() {
        if (this.state.step > 1) {
            return (
                <TouchableWithoutFeedback onPress={()=>{ this.onChangeStep(1, '登录'); }}>
                    <Icon style={styles.backArrow} name="keyboard-backspace" size={30} color="#fff" />
                </TouchableWithoutFeedback>
            )
        }
    }
    renderForm() {
        const {userStore} = this.props;
        if (this.state.step === 1) {
            return (
                <View style={styles.animView}>
                    <AnooTextInput
                        placeHolder={'请输入手机号码'}
                        label = {'手机号'}
                        inputProps={{
                            keyboardType: 'phone-pad',
                            autoCapitalize: 'none',
                            autoCorrect: false,
                            maxLength: 11
                        }}
                        onChange={(text)=> userStore.setLoginPhone(text)}/>
                    <AnooTextInput
                        label = {'密码'}
                        placeHolder={'请输入登陆密码'}
                        inputProps={{
                            secureTextEntry: true,
                            maxLength: 16
                        }}
                        onChange={(text)=> userStore.setLoginPassword(text)}/>
                </View>
            );
        }
        else if (this.state.step === 2) {
            return (
                <View style={styles.animView}>
                    <AnooTextInput
                        placeHolder={'请输入手机号'}
                        label={'手机号'}
                        inputProps={{
                            keyboardType: 'phone-pad',
                            autoCapitalize: 'none',
                            autoCorrect: false,
                            autoFocus: false
                        }}
                        maxLength={11}
                        onChange={(text)=>userStore.setLoginPhone(text)}/>
                    <View>
                        <AnooTextInput
                            label={'验证码'}
                            placeHolder={'请输入6位验证码'}
                            inputProps={{
                                value: '123456',
                                maxLength:6
                            }}
                            onChange={(text)=>userStore.setRegisterValidateCode(text)}/>
                        <TouchableOpacity style={styles.btnGetCode}>
                            <Text style={{color:'#fff'}}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                    <AnooTextInput
                        label={'登陆密码'}
                        placeHolder={'登录密码(6-20位)'}
                        inputProps={{
                            secureTextEntry: true,
                            maxLength:16,
                            value: '123456'
                        }}
                        onChange={(text)=>userStore.setRegisterPassword(text)}/>
                    <AnooTextInput
                        label={'重复密码'}
                        placeHolder={'请输入上面相同的密码'}
                        inputProps={{
                            secureTextEntry: true,
                            maxLength:16,
                            value: '123456'
                        }}
                        onChange={(text)=>userStore.setRegisterPasswordRepeat(text)}/>
                </View>
            )
        }
        else if(this.state.step === 3){
            return (
                <View style={styles.animView}>
                    <AnooTextInput
                        placeHolder={'请输入手机号'}
                        label={'手机号'}
                        inputProps={{
                            keyboardType: 'phone-pad',
                            autoCapitalize: 'none',
                            autoCorrect: false,
                            autoFocus: false
                        }}
                        maxLength={11}
                        onChange={(text)=>userStore.setLoginPhone(text)}/>
                    <View>
                        <AnooTextInput
                            label={'验证码'}
                            placeHolder={'请输入6位验证码'}
                            inputProps={{value: '123456', maxLength:6}}
                            onChange={(text)=>userStore.setRegisterValidateCode(text)}/>
                        <TouchableOpacity style={styles.btnGetCode}>
                            <Text style={{color:'#fff'}}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                    <AnooTextInput
                        label={'登陆密码'}
                        placeHolder={'登录密码(6-20位)'}
                        inputProps={{
                            secureTextEntry: true,
                            maxLength:6,
                            value: '123456'
                        }}
                        onChange={(text)=>userStore.setRegisterPassword(text)}/>
                    <AnooTextInput
                        label={'重复密码'}
                        placeHolder={'请输入上面相同的密码'}
                        inputProps={{
                            secureTextEntry: true,
                            maxLength:6,
                            value: '123456'
                        }}
                        onChange={(text)=>userStore.setRegisterPasswordRepeat(text)}/>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{height:200, justifyContent:'center', alignItems:'center', backgroundColor:'#009688'}}>
                    <Text style={{color:'#fff',fontSize:24,}}>养殖宝</Text>
                </View>
                {this.renderBackArrow()}
                <Spinner
                    style={styles.spinner}
                    isVisible={this.state.showSpinner}
                    size={100}
                    type={'ThreeBounce'}
                    color={'#888'}/>
                {this.renderForm()}
                <TouchableOpacity disabled={this.state.showSpinner} onPress={() => { this._login() }} style={styles.roundedButton}>
                    <Text style={styles.buttonText}>{this.state.stepTitle}</Text>
                </TouchableOpacity>
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
            </View>
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
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 15,
        alignSelf: 'flex-start',
        left: 15
    },
    logo: {
        height: 65,
        width: 65,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // position: 'absolute'
    },
    endText: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50
    },
    signIn: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        width: 260,
        textAlign: 'center',
        letterSpacing :1
    },
    softText: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        lineHeight: 28,
        opacity: 0.5
    },
    roundedButton: {
        backgroundColor: '#009688',
        borderRadius: 5,
        height: 45,
        margin:10,
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontFamily: 'OpenSans-Regular',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 1
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '40%'
    },
    btnGetCode: {
        position:'absolute',
        top:5,
        right:5,
        padding:8,
        marginTop:3,
        backgroundColor:'#009688'
    }
});