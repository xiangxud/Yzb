import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,} from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import {NavigationActions} from 'react-navigation';
import { inject } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-spinkit';
import AnooTextInput from '../components/AnooTextInput';

@inject('userStore')
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            stepTitle: '登录',
            loginErrors: {},
            showSpinner: false
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onChangeStep = this.onChangeStep.bind(this);
    }

    static navigationOptions = {
        header: null
    }

    onInputChange(field, text) {
        this.props.userStore.setUserField(field, text);
    }
    onChangeStep(step, stepTitle){
        this.setState({step: step, stepTitle: stepTitle});
    }

    _operate = () => {
        if (this.state.step === 1) {
            //登录
            this.setState({showSpinner: true});
            this.props.userStore.login().then((resp)=>{
                console.log(`resp is ${JSON.stringify(resp)}`);
                this.setState({showSpinner: false});
                let bodyObj = JSON.parse(resp._bodyText);
                if (resp.status !== 200) {
                    console.log('Error calling login '+resp._bodyText+' for user: '+JSON.stringify(this.props.userStore.user));

                    if (bodyObj.error === 'No such user') {
                        this.setState({loginErrors: {email:bodyObj.error}})
                    }
                    else {
                        console.log(`Unknown error ${bodyObj.error}`);
                    }

                }
                else {
                    this.props.userStore.setUserField('token', bodyObj.token);
                    let resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'Main', params: { token: '' }})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            })
        }
        else if (this.state.step === 2) {
            //注册
            this.setState({showSpinner: true});
            this.props.userStore.register().then(()=>{
                this.setState({showSpinner: false});
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main', params: { token: '' }})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            });
        }
        else if (this.state.step === 3) {
            //找回密码
            this.setState({showSpinner: true});
            this.props.userStore.register().then(()=>{
                this.setState({showSpinner: false});
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main', params: { token: '' }})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            });
        }
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
                            autoFocus: true
                        }}
                        errorText={this.state.loginErrors.email}
                        maxLength={11}
                        onChange={(text)=>this.onInputChange('email', text)}/>
                    <AnooTextInput
                        label = {'密码'}
                        placeHolder={'请输入登陆密码'}
                        inputProps={{secureTextEntry: true}}
                        errorText={this.state.loginErrors.password}
                        onChange={(text)=>this.onInputChange('password', text)}/>
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
                        onChange={(text)=>this.onInputChange('email', text)}/>
                    <View>
                        <AnooTextInput
                            label={'验证码'}
                            placeHolder={'请输入6位验证码'}
                            inputProps={{value: '123456', maxLength:6}}
                            errorText={this.state.loginErrors.password}
                            onChange={(text)=>{}}/>
                        <TouchableOpacity style={styles.btnGetCode}>
                            <Text style={{color:'#fff'}}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                    <AnooTextInput
                        label={'登陆密码'}
                        placeHolder={'登录密码(6-20位)'}
                        inputProps={{secureTextEntry: true, value: '123456'}}
                        errorText={this.state.loginErrors.password}
                        onChange={(text)=>this.onInputChange('password', text)}/>
                    <AnooTextInput
                        label={'推荐人'}
                        placeHolder={'请输入推荐人手机号，选填'}
                        onChange={(text)=>{}}/>
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
                            autoFocus: true
                        }}
                        maxLength={11}
                        onChange={(text)=>this.onInputChange('email', text)}/>
                    <View>
                        <AnooTextInput
                            label={'验证码'}
                            placeHolder={'请输入6位验证码'}
                            inputProps={{value: '123456', maxLength:6}}
                            errorText={this.state.loginErrors.password}
                            onChange={(text)=>{}}/>
                        <TouchableOpacity style={styles.btnGetCode}>
                            <Text style={{color:'#fff'}}>获取验证码</Text>
                        </TouchableOpacity>

                    </View>
                    <AnooTextInput
                        label={'登陆密码'}
                        placeHolder={'登录密码(6-20位)'}
                        inputProps={{secureTextEntry: true, value: userStore.user.password}}
                        errorText={this.state.loginErrors.password}
                        onChange={(text)=>this.onInputChange('password', text)}/>
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
                    color={'red'}/>
                {this.renderForm()}
                <TouchableOpacity onPress={() => { this._operate() }} style={styles.roundedButton}>
                    <Text style={styles.buttonText}>{this.state.stepTitle}</Text>
                </TouchableOpacity>
                <View style={{marginLeft:10, marginRight:10, flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => { this.onChangeStep(2, '注册') }} style={{alignItems:'flex-start', flex:1,}}>
                        <Text style={{}}>没有账号？去注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.onChangeStep(3, '找回密码') }} style={{alignItems:'flex-end', flex:1,}}>
                        <Text style={{}}>忘记密码？</Text>
                    </TouchableOpacity>
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