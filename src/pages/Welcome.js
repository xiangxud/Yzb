import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { AsyncStorage } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { inject } from 'mobx-react/native';
import { create } from 'mobx-persist';
//import SplashScreen from 'react-native-splash-screen'

@inject('userStore')
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        const {userStore} = this.props;
        const hydrate = create({ storage: AsyncStorage });
        hydrate('user', userStore).then(() => {
            console.log(`user hydrated ${JSON.stringify(userStore.user)}`);
            const { dispatch } = this.props.navigation;
            if (userStore.user.token) {
                alert(userStore.user.token)
                userStore.setUserField('token', null)
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main', params: { token: '' }})
                    ]
                });
                dispatch(resetAction);
            }
            else {
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login', params: { token: '' }})
                    ]
                });
                dispatch(resetAction);
            }
            //SplashScreen.hide();
        });
        console.log(`user token is: ${userStore.user.token}`);
    }

    static navigationOptions = {
        header: null
    };


    render() {

        return (<View style={styles.container}><Text>欢迎使用养殖宝</Text></View>)

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
});