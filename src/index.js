import React, { Component } from "react";
import {View, StatusBar} from 'react-native'
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import RootNavigator from './common/RootNavigator';

class NavigationStore {
    @observable.ref navigationState = {
        index: 0,
        routes: [
            {
                key: "Login",
                routeName: "Login",
                params: { title: "Login" }
            }
        ]
    };

    @action dispatch = (action, stackNavState = true) => {
        const previousNavState = stackNavState ? this.navigationState : null;
        return (this.navigationState = RootNavigator.router.getStateForAction(
            action,
            previousNavState
        ));
    };
}

@observer class YzbApp extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = new NavigationStore();
    }

    render() {
        return (
            /*<RootNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.store.dispatch,
                    state: this.store.navigationState
                })}
            />*/
            <View style={{flex:1}}>
                <StatusBar backgroundColor={'rgba(0,156,136,1)'}/>
                {
                    <RootNavigator />
                }
            </View>
        );
    }
}


export default YzbApp;