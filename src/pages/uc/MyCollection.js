import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {observer, inject} from 'mobx-react/native'
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import {Container, Content} from '../../components';
import CollectArticleList from '../../components/info/CollectArticleList';

@inject('myCollectionStore')
@observer
export default class MyCollection extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle: "我的收藏",
        headerRight: <View />
    }

    componentDidMount() {
        myCollectionStore.onChanged(0);
    }

    onItemPress(code, title) {
        const {navigation} = this.props;
        navigation.navigate("InfoDetail", {code: code, title: title})
    }

    render() {
        let {myCollectionStore} = this.props;
        return (
            <Container>
                <Content gray>
                    <ScrollableTabView
                        initialPage={0}
                        tabBarUnderlineStyle={{backgroundColor: '#15856e'}}
                        renderTabBar={() => <ScrollableTabBar
                            underlineColor='#ce3d3a'
                            activeTextColor='#15856e'
                            inactiveTextColor='#888'
                            underlineHeight={2}
                            underlineStyle={{backgroundColor:'#009d7b', height:2}}
                            textStyle={{fontSize: 18}}
                            style={{height:39, borderBottomWidth:1, borderBottomColor:'#ccc'}}
                            tabStyle={{paddingLeft:5, paddingRight:5, paddingBottom: 0, paddingTop:0, height:38}}
                            backgroundColor='#fff'/>}>
                        <CollectArticleList tabLabel={myCollectionStore.typeLabels[0]}
                                            navigation={this.props.navigation} />
                        <View tabLabel={myCollectionStore.typeLabels[1]} style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>暂无收藏</Text></View>
                    </ScrollableTabView>
                </Content>
            </Container>
        )
    }
}