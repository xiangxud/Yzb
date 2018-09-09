/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    Alert
} from 'react-native'
import {NavigationActions} from 'react-navigation';
import {observer, inject} from 'mobx-react/native'

import {Container, Content, Button, Text} from 'native-base';
import UserHead from '../components/uc/UserHead';
import MyList from '../components/uc/MyList';

@inject('userStore')
@observer
export default class Uc extends Component {
    logout = () => {
        Alert.alert(
            '您确认要注销登录吗？',
            '注销后将退出系统，您需要重新登录后才能正常访问。',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确认注销', onPress: () => {
                    if(this.props.userStore.logout()){
                        let resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Login', params: { token: null }})
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
                    }else{
                        alert('注销失败，请稍后再试');
                    }
                }},
            ],
            { cancelable: true }
        )
    }

    render() {
        const {loginUser} = this.props.userStore;
        return (
            <Container>
                <Content>
                    <UserHead navigation={this.props.navigation} />
                    <MyList navigation={this.props.navigation} user={loginUser} />
                    {__DEV__?
                        <Button rounded danger bordered block onPress = {()=>this.error()}>
                            <Text style={{color: 'red'}}>SYSTEM ERROR...</Text>
                        </Button>
                        : null}
                    <Button rounded danger block style={styles.logoutBtn} onPress={()=>this.logout()}>
                        <Text style={{color: '#fff'}}>退出登录</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 50
    },
    accountWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 30,
        justifyContent: 'space-between',
    },
    accountItem: {
        alignItems: 'center'
    },
    logoutBtn:{
        marginLeft:50,
        marginRight:50,
        marginTop: 10,
        marginBottom: 10,
    },
    backgroundVideo: {
        height:200,
    },
})