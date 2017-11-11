import React, {Component} from 'react';
import {
    View,
    Text,
    Animated,
    Easing,
    StyleSheet
} from 'react-native';
import AnooTextInput from '../components/AnooTextInput';
import { observer, inject } from 'mobx-react/native'

@inject('userStore')
@observer
export default class LoginSteps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            introTextOpacity: new Animated.Value(0),
            loginFieldsOpacity: new Animated.Value(0),
            signupFieldsOpacity: new Animated.Value(0)
        };

        this.onInputChange = this.onInputChange.bind(this);
    }


    static propTypes = {
    };

    componentDidUpdate(prevProps, prevState){
        Animated.sequence([
            Animated.timing(
                this.state.introTextOpacity,
                {
                    toValue: this.props.step === 0 ? 1 : 0,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad)
                }
            ),
            Animated.timing(
                this.state.loginFieldsOpacity,
                {
                    toValue: this.props.step === 1 ? 1 : 0,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad)
                }
            ),
            Animated.timing(
                this.state.signupFieldsOpacity,
                {
                    toValue: this.props.step === 2 ? 1 : 0,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad)
                }
            )
        ]).start();
    }

    componentDidMount() {
        Animated.timing(
            this.state.introTextOpacity,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.quad)
            }
        ).start();
    }

    onInputChange(field, text) {
        this.props.userStore.setUserField(field, text);
    }

    renderForm() {
        let signUpStepMarginTop = 40;
        const {userStore} = this.props;
        if (this.props.step === 1) {
            return (
                <Animated.View style={[styles.animView, {opacity: this.state.loginFieldsOpacity}]}>
                    <AnooTextInput
                        placeHolder={'USER NAME'}
                        inputProps={{
                            keyboardType: 'email-address',
                            autoCapitalize: 'none',
                            autoCorrect: false,
                            autoFocus: true
                        }}
                        errorText={this.props.errors.email}
                        onChange={(text)=>this.onInputChange('email', text)}/>
                    <AnooTextInput style={{marginTop: 53}}
                                   placeHolder={'PASSWORD'}
                                   inputProps={{secureTextEntry: true}}
                                   errorText={this.props.errors.password}
                                   onChange={(text)=>this.onInputChange('password', text)}/>
                </Animated.View>
            );
        }
        else if (this.props.step === 2) {
            return (
                <Animated.View style={[styles.animView, {opacity: this.state.signupFieldsOpacity}]}>
                    <AnooTextInput placeHolder={'FULL NAME'}
                                   inputProps={{value: userStore.user.fullName}}
                                   onChange={(text)=>this.onInputChange('fullName', text)}/>
                    <AnooTextInput style={{marginTop: signUpStepMarginTop}}
                                   placeHolder={'EMAIL'}
                                   inputProps={{
                                       keyboardType: 'email-address',
                                       autoCapitalize: 'none',
                                       autoCorrect: false,
                                       autoFocus: true,
                                       value: userStore.user.email
                                   }}
                                   errorText={this.props.errors.email}
                                   onChange={(text)=>this.onInputChange('email', text)}/>
                    <AnooTextInput style={{marginTop: signUpStepMarginTop}}
                                   placeHolder={'COMPANY NAME'}
                                   inputProps={{value: userStore.user.companyName}}
                                   errorText={this.props.errors.companyName}
                                   onChange={(text)=>this.onInputChange('companyName', text)}/>
                    <AnooTextInput style={{marginTop: signUpStepMarginTop}}
                                   placeHolder={'TYPE OF BUSINESS'}
                                   inputProps={{value: userStore.user.typeOfBusiness}}
                                   errorText={this.props.errors.typeOfBusiness}
                                   onChange={(text)=>this.onInputChange('typeOfBusiness', text)}/>
                    <AnooTextInput style={{marginTop: signUpStepMarginTop}}
                                   placeHolder={'PASSWORD'}
                                   inputProps={{secureTextEntry: true, value: userStore.user.password}}
                                   errorText={this.props.errors.password}
                                   onChange={(text)=>this.onInputChange('password', text)}/>
                    <AnooTextInput style={{marginTop: signUpStepMarginTop}}
                                   placeHolder={'CONFIRM PASSWORD'}
                                   inputProps={{secureTextEntry: true}}
                                   onChange={(text)=>{}}/>
                </Animated.View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.animView, {opacity: this.state.introTextOpacity}]}>
                    <Text style={styles.majorText}>养殖宝 V2.0</Text>
                    <Text style={styles.minorText}>您贴身的养殖助手</Text>
                </Animated.View>
                {this.renderForm()}
            </View>
        )
    }
}

LoginSteps.defaultProps = {
    errors: {},
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 50
    },
    majorText: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 22,
        width: 220,
        fontWeight: '600',
        textAlign: 'center'
    },
    minorText: {
        color: '#fafafa',
        backgroundColor: 'transparent',
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 10,
        width: 230,
        lineHeight: 24,
        opacity: 0.8
    },
    animView: {
        position: 'absolute',
        alignSelf: 'center'
    }
});