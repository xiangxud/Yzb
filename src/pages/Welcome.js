import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import hydrate from "../common/hydrate";
//import SplashScreen from 'react-native-splash-screen'

@inject('userStore')
@observer
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        const {userStore} = this.props;

        hydrate('user', userStore).then(() => {
            userStore.hydrate = true;
            const { dispatch } = this.props.navigation;
            if (userStore.token.access_token) {
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

        console.log(`user token is: ${userStore.token}`);
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