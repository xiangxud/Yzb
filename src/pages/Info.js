import React, {Component} from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import BreedList from '../components/info/BreedList';
import { Icon} from 'native-base';
//import infoStore from '../store/infoStore';

@inject('infoStore')
@observer
export default class Info extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '养殖头条',
        headerRight:<TouchableOpacity onPress={()=>navigation.navigate('SettingColumn')}><Icon name="md-settings" style={{ fontSize:20,color:'#ffffff', marginRight:5}}></Icon></TouchableOpacity>
            /*(<SearchBar goBack={navigation.goBack} navigate={navigation.navigate} onChanged={
            (txt)=> navigation.state.params.onChanged(txt)
        } Title="养殖头条"></SearchBar>)*/
    });
    constructor(props){
        super(props);
    }
    componentDidMount() {
        infoStore.onChanged(infoStore.labels[0]);
    }
    onItemPress(code,title){
        const {navigation} = this.props;
        navigation.navigate("InfoDetail",{ code : code , title:title })
    }
    render(){
        return (
            <View style={{flex:1}}>
                <ScrollableTabView
                    tabStyle={{height:30}}
                    tabBarTextStyle={{color:'#15856e',}}
                    initialPage={0}
                    tabBarUnderlineStyle={{backgroundColor:'#15856e'}}
                    renderTabBar={() => <ScrollableTabBar />}>
                    <BreedList tabLabel={infoStore.labels[0]}
                               source={infoStore.data0}
                               onItemPress={(c,t) => this.onItemPress(c, t)}>
                    </BreedList>
                    <BreedList tabLabel={infoStore.labels[1]}
                               source={infoStore.data1}
                               onItemPress={(c,t) => this.onItemPress(c, t)}>
                    </BreedList>
                    <BreedList tabLabel={infoStore.labels[2]}
                               source={infoStore.data2}
                               onItemPress={(c,t) => this.onItemPress(c, t)}>
                    </BreedList>
                </ScrollableTabView>
            </View>
        )
    }
}