import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import ArticleList from "../components/info/ArticleList";

@inject('categoryStore')
@observer
export default class Headlines extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '养殖头条',
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        categoryStore.onLoad();
    }

    onItemPress(code, title) {
        const {navigation} = this.props;
        navigation.navigate("InfoDetail", {code: code, title: title})
    }

    render() {
        const {categories} = categoryStore;
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    initialPage={0}
                    scrollWithoutAnimation={true}
                    renderTabBar={() => <ScrollableTabBar
                        underlineColor='#ce3d3a'
                        activeTextColor='#fff'
                        inactiveTextColor='rgba(255, 255, 255, 0.7)'
                        underlineHeight={0}
                        underlineStyle={{backgroundColor: '#fff', height: 2}}
                        textStyle={{fontSize: 18}}
                        style={{height: 39}}
                        tabStyle={{paddingLeft: 12, paddingRight: 12, paddingBottom: 0, paddingTop: 0, height: 38}}
                        backgroundColor='#ce3d3a'
                    />}
                >
                    {categories.map((item, index) => <ArticleList key={index} tabLabel={item.type_name} data={item}
                                                                  navigation={this.props.navigation}/>)}
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
    itemLayout: {flex: 1, alignItems: 'center', justifyContent: 'center'}
});