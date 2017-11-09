/**
 * Created by TomChow on 17/11/8.
 */
import React, {PureComponent} from 'react'
import {observer, inject} from 'mobx-react/native'

@inject('app')
@observer
export default class TabBarView extends PureComponent {

    onChangeTab = ({i}) => {
        const {app} = this.props
        if (i === 1) {
            app.updateBarStyle('default')
        } else {
            app.updateBarStyle('light-content')
        }
    }

    /*renderTabBar = () => {
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
            <View><Text>Empty...</Text></View>
        )
    }
}