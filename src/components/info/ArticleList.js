import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableNativeFeedback
} from 'react-native';
import {observer, inject} from 'mobx-react/native';

import {InfoItem, InfoItemPic} from '../../components/info/InfoItem';
import {Loading, MaskLoading} from '../../components';
import infoStore from '../../store/infoStore';


@observer
export default class ArticleList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        infoStore.onLoad(this.props.data.type_id);
    }
    newsPress = (info) => {
        const {navigation} = this.props;
        navigation.navigate("InfoDetail", {code: info.code, title: info.title})
    }

    renderRow = (info) => {
        if(info.face_url) {
            return <InfoItemPic info={info} press={this.newsPress}/>
        }else{
            return <InfoItem info={info} press={this.newsPress}/>
        }
    }
    _separator = () => {
        return null;
    }

    _renderFooter() {
        if (!this.props.source) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        }
        return null;
        //return <Loading show={true}/>
    }

    emptyRender = () => {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../resource/noitem.png')} style={{width: 180, height: 166}}/>
            <Text>暂时没有内容，小编正绞尽脑汁筹备中</Text>
        </View>
    }

    render() {
        let {arc} = infoStore;
        return <View style={style.container}>
            <FlatList data={arc.article_list.slice()}
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
            {/*<MaskLoading show={this.props.source.isLoading} text={''}/>*/}
        </View>
    }
};

const style = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: 'red',
    },
    row: {
        flex: 1,
        padding: 8,
        //borderBottomWidth:StyleSheet.hairlineWidth,
        //borderBottomColor:'#ccc',
        backgroundColor: '#fff',
    },
    title: {
        flex: 1,
        color: '#1b1b1b',
        fontSize: 18
    },
    desc: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3
    },
    block: {
        color: '#AEAEAE',
        fontSize: 12,
        textAlignVertical: 'center',
        marginRight: 8
    }
});