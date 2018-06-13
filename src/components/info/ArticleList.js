import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableNativeFeedback
} from 'react-native';
//import {observer, inject} from 'mobx-react/native';

import {InfoItem, InfoItemPic} from '../../components/info/InfoItem';
//import {Loading, MaskLoading} from '../../components';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
//import infoStore from '../../store/infoStore';

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            dataList: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        //infoStore.onLoad(this.props.data.type_id);
        this.onHeaderRefresh();
    }

    onHeaderRefresh = () => {
        this.setState({pageIndex: 1, refreshState: RefreshState.HeaderRefreshing},()=>{ });
        this.getArcList(true);
    }

    onFooterRefresh = () => {
        this.setState({pageIndex: this.state.pageIndex++, refreshState: RefreshState.FooterRefreshing});
        this.getArcList(false);
    }

    // 获取测试数据
    getArcList = (isReload: boolean) => {
        if(isReload){
            tools.showToast('new_'+this.state.pageIndex);
        }else{
            tools.showToast('next_'+this.state.pageIndex);
        }
        request.getJson(urls.apis.CMS_ARTICLE_LIST, {page: this.state.pageIndex, ctg: this.props.data.type_id}).then((data) => {
            let list = [];
            if(isReload) {
                list = data;
            }else{
                list = [...this.state.dataList, ...data];
            }

            setTimeout(()=>{
                this.setState({
                    page: 1,
                    dataList: list,
                    refreshState: data.length === 0 ? (isReload? RefreshState.EmptyData: RefreshState.NoMoreData) : RefreshState.Idle,
                });
            }, 2000)
        }).catch((err) => {
            this.setState({refreshState: RefreshState.Failure})
            tools.showToast('请求失败了，'+JSON.stringify(err));
        });
    }

    itemPress = (info) => {
        const {navigation} = this.props;
        navigation.navigate("InfoDetail", {code: info.code, title: info.title})
    }

    renderRow = (info) => {
        if(info.face_url) {
            return <InfoItemPic info={info} press={this.itemPress}/>
        }else{
            return <InfoItem info={info} press={this.itemPress}/>
        }
    }

    render() {
        return <View style={style.container}>
            {/*<FlatList data={arc.article_list.slice()}
                      renderItem={(item)=>this.renderRow(item.item)}
                      onEndReachedThreshold={0.5}
                      ItemSeparatorComponent={this._separator}
                      ListFooterComponent={this._renderFooter()}
                      ListEmptyComponent={this.emptyRender()}
                      onEndReached={() => {
                          //infoStore.onMore();
                      }}
                      refreshing={arc.isLoading}
                      onRefresh={() => {
                          infoStore.onLoad(this.props.data.type_id);
                      }}
                      keyExtractor={(item, index) => index.toString()}>
            </FlatList>
            */}
            {/*<MaskLoading show={this.props.source.isLoading} text={''}/>*/}

            <RefreshListView
                data={this.state.dataList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item)=>this.renderRow(item.item)}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}
                onFooterRefresh={this.onFooterRefresh}

                // 可选
                footerRefreshingText= '玩命加载中 >.<'
                footerFailureText = '我擦嘞，居然失败了 =.=!'
                footerNoMoreDataText= '-我是有底线的-'
                footerEmptyDataText= '-好像什么东西都没有-'
            />
        </View>
    }
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});