import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
//import Icon from 'react-native-vector-icons/Ionicons';
//import ArticleList from '../components/info/ArticleList';
import {Container, Content} from 'native-base';
import ArticleList from "../components/info/ArticleList";
import InfcnWebView from "../components/common/WebView";

@inject('categoryStore')
@observer
export default class Headlines extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '养殖头条',
    });
    constructor(props){
        super(props);
    }
    componentDidMount() {
        categoryStore.onLoad();
    }
    onItemPress(code, title){
        const {navigation} = this.props;
        navigation.navigate("InfoDetail", {code: code, title: title})
    }
    render(){
        const {categories} = categoryStore;
        return (
            <View style={styles.container}>

                    {/*<ScrollableTabView
                        tabStyle={{height:30}}
                        tabBarTextStyle={{color:'#15856e',}}
                        initialPage={0}
                        tabBarUnderlineStyle={{backgroundColor:'#15856e'}}
                        renderTabBar={() => <ScrollableTabBar />}>
                        <BreedList tabLabel={'推荐'}
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
                    </ScrollableTabView>*/
}
                    <ScrollableTabView
                        initialPage={0}
                        scrollWithoutAnimation={true}
                        renderTabBar={()=><ScrollableTabBar
                            underlineColor='#ce3d3a'
                            activeTextColor='#fff'
                            inactiveTextColor='rgba(255, 255, 255, 0.7)'
                            underlineHeight={0}
                            underlineStyle={{backgroundColor:'#fff', height:2}}
                            textStyle={{fontSize: 18}}
                            style={{height:39}}
                            tabStyle={{paddingLeft:12, paddingRight:12, paddingBottom: 0, paddingTop:0, height:38}}
                            backgroundColor='#ce3d3a'
                        />}
                    >
                        {categories.map((item, index) => <ArticleList key={index} tabLabel={item.type_name} data={item} navigation={this.props.navigation}/>)}
                    </ScrollableTabView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    itemLayout:{flex:1,alignItems:'center',justifyContent:'center'}
});