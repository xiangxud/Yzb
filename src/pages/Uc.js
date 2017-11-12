/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity,
    StyleSheet
} from 'react-native'
import {observer, inject} from 'mobx-react/native'

@inject('userStore')
@observer
export default class Uc extends Component {
    /*onChangeTab = ({i}) => {
        const {app} = this.props
        if (i === 1) {
            app.updateBarStyle('default')
        } else {
            app.updateBarStyle('light-content')
        }
    }

    renderTabBar = () => {
        return (
            <TabBar
                tabNames={tabTitles}
                tabIconNames={tabIcons}
                selectedTabIconNames={tabSelectedIcon}
            />
        )
    }*/
    _onLogout = () =>{
        const {userStore, navigator} = this.props;
        // if(userStore.logout()){
        //     alert('注销成功');
        // }else{
        //     alert('Error');
        // }
    }
    render() {
        return (
            <View>
                <Text>{this.props.userStore.user.token}</Text>
                <TouchableOpacity onPress={()=>{this.go()}}>
                    <Text>报错方便刷新...</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.registerBtn}
                    onPress = {this._onLogout()}
                >
                    <Text style={{fontSize: 16, color: 'red'}}>注销登陆</Text>
                </TouchableOpacity>
            </View>
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
        width: gScreen.width * 0.4,
        marginTop: 20,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})