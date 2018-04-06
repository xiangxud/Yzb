import React, {Component} from 'react';
import {
    View,
    Image,
    FlatList,
    StyleSheet,
} from 'react-native';

import {Button, Icon, Text} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import Search from 'react-native-search-box';

import {Container, Content, MaskLoading} from "../../components";
import LiveItem from '../../components/live/LiveItem';

@inject('liveStore')
@observer
export default class LiveSearch extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: '搜索直播内容',
        headerRight: <View/>
    });

    renderListHeader = () => {
        return (
            <Search backgroundColor={'#bdbdbd'}
                    placeholder='请输入搜索关键字'
                    cancelTitle='取消搜索'
                    onSearch={this.fetchData}/>
        )
    }

    fetchData =(kw)=>{
        kw = kw.replace(/\s*/g, '');
        if(kw.length < 2){
            tools.showToast('请输入至少两个汉字');
            return;
        }
        liveStore.fetchMore(true, kw);
    }

    render() {
        const {navigation} = this.props;
        const {list, isFetching} = liveStore;
        return (<Container>
            <Content gray>
                <MaskLoading show={isFetching}/>
                    <FlatList
                        data={list.slice()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => <LiveItem v={item} index={index.toString()} navigation={navigation}/>}
                        ListHeaderComponent={this.renderListHeader()}
                        ListFooterComponent={
                            <Button full light onPress={() => liveStore.fetchMore(true)}><Text>获取更多</Text></Button>
                        }
                        numColumns={2}
                        onRefresh={() => {
                            liveStore.fetchMore()
                        }}
                        refreshing={isFetching}
                    />
            </Content>
        </Container>);
    }
}
