import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { observer, inject } from 'mobx-react/native'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import {Container, Content, Form, Item, Input, Label, Text, Button} from 'native-base';
import BreedList from '../../components/info/BreedList';

@inject('myCollectionStore')
@observer
export default class myCollection extends Component{
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        headerTitle: "我的收藏"
    }
    componentDidMount(){
        let {myCollectionStore} = this.props;
        myCollectionStore.onChanged(myCollectionStore.labels[0]);
    }
    onItemPress(code,title){
        const {navigation} = this.props;
        navigation.navigate("InfoDetail",{ code : code , title:title })
    }
    render(){
        let {myCollectionStore} = this.props;
        return (
            <View style={{flex:1}}>
                <ScrollableTabView
                    tabStyle={{height:30}}
                    tabBarTextStyle={{color:'#15856e',}}
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor:'#15856e'}}
                    renderTabBar={() => <ScrollableTabBar />}>
                    <BreedList tabLabel={myCollectionStore.labels[0]}
                               source={myCollectionStore.data0}
                               onItemPress={(c,t) => this.onItemPress(c,t)}>
                    </BreedList>
                </ScrollableTabView>
            </View>
        )
    }
}