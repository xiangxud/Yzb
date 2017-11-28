/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {
    Text,
    StyleSheet,
    Alert
} from 'react-native'
import {NavigationActions} from 'react-navigation';
import {observer, inject} from 'mobx-react/native'
import {View,ScrollView,TouchableOpacity} from "react-native";
import {Container, Content} from '../components';
import UserHead from '../components/uc/UserHead';
import MyList from '../components/uc/MyList';

@inject('userStore')
@observer
export default class Uc extends Component {
    _onLogout = () =>{
        Alert.alert(
            '您确认要注销登录吗？',
            '注销后将退出系统，您需要重新登录后才能正常访问。',
            [
                {text: '暂不注销', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确认退出登录', onPress: () => {
                    const {userStore} = this.props;
                    if(userStore.logout()){
                        let resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Login', params: { token: null }})
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
                    }else{
                        alert('Error');
                    }
                }},
            ],
            { cancelable: false }
        )
    }
    render() {
        const {loginUser} = this.props.userStore;
        return (
            <ScrollView>
                <Container>
                    <Content gray>
                        <UserHead />
                        <MyList navigation={this.props.navigation} user={loginUser} />
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.registerBtn}
                            onPress = {()=>this.error()}>
                            <Text style={{fontSize: 16, color: 'red'}}>SYSTEM ERROR...</Text>
                        </TouchableOpacity>
                    </Content>
                </Container>
            </ScrollView>
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
    registerBtn: {
        width: 200,
        marginTop: 20,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
})