import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import AnooTextInput from '../components/AnooTextInput';
import { observer, inject } from 'mobx-react/native'

@inject('userStore')
@observer
export default class LoginSteps extends Component {

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(field, text) {
        this.props.userStore.setUserField(field, text);
    }

    renderForm() {
        const {userStore} = this.props;
        if (this.props.step === 1) {
            return (
                <View style={styles.animView}>
                    <AnooTextInput
                        placeHolder={'请输入手机号码'}
                        label = {'手机号'}
                        inputProps={{
                            keyboardType: 'email-address',
                            autoCapitalize: 'none',
                            autoCorrect: false,
                            autoFocus: true
                        }}
                        errorText={this.props.errors.email}
                        onChange={(text)=>this.onInputChange('email', text)}/>
                    <AnooTextInput
                        label = {'密码'}
                        placeHolder={'请输入登陆密码'}
                        inputProps={{secureTextEntry: true}}
                        errorText={this.props.errors.password}
                        onChange={(text)=>this.onInputChange('password', text)}/>
                </View>
            );
        }
        else if (this.props.step === 2) {
            return (
                <View style={styles.animView}>
                    <AnooTextInput
                        placeHolder={'请输入手机号'}
                        label={'手机号'}
                        inputProps={{value: userStore.user.fullName}}
                        onChange={(text)=>this.onInputChange('fullName', text)}/>
                    <AnooTextInput
                        label={'验证码'}
                        placeHolder={'请输入6位验证码'}
                        inputProps={{secureTextEntry: true, value: userStore.user.password}}
                        errorText={this.props.errors.password}
                        onChange={(text)=>{}}/>
                    <AnooTextInput
                        label={'登陆密码'}
                        placeHolder={'登录密码(6-20位)'}
                        inputProps={{secureTextEntry: true, value: userStore.user.password}}
                        errorText={this.props.errors.password}
                        onChange={(text)=>this.onInputChange('password', text)}/>
                    <AnooTextInput
                        label={'推荐人'}
                        placeHolder={'请输入推荐人手机号，选填'}
                        onChange={(text)=>{}}/>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
        marginBottom: 50,
    },
    animView: {
        alignSelf: 'flex-start'
    }
});