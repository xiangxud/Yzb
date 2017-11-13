/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {observer, inject} from 'mobx-react/native'

//@inject('app')
@observer
export default class Live extends Component {
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

    render() {
        return (
            <View style={{flex:1}}>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
                <Text>直播间首页</Text>
            </View>
        )
    }
}