/**
 * Created by TomChow on 17/11/12.
 */
import React, { PureComponent  } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    FlatList
} from 'react-native';
import {observer} from 'mobx-react/native'
import TitleBar from '../common/TitleBar'
import {Loading} from './'

const Toutiao = observer(({list, newsPress, page, loadMore, isFetching,navigation})=>{
    openNewInfo = newsPress==null || newsPress == undefined ? (info) =>{
        navigation.navigate("InfoDetail",{ key : info.key , title:info.title });
    } : newsPress;

    _keyExtractor = (item, index) => index;

    renderRow = (info) =>{
        return (
        <TouchableNativeFeedback
            onPress={()=>{openNewInfo(info)}}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{justifyContent:'center', padding:10, borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#ccc'}}>
                <Text style={{fontSize:18}}>
                    {info.title}
                </Text>
                <Text style={{fontSize:12, color:'#ccc'}}>
                    {info.from} {info.publishdate} {info.comment_count}评论
                </Text>
            </View>
        </TouchableNativeFeedback>)
    }

    return (
        <View style={styles.container}>
            <TitleBar icon={'newspaper-o'}
                      iconColor={'red'}
                      title={'养殖头条'}
                      showMore = {true}
                      onMorePress={()=>{this.more()}} />
            <FlatList
                data={list.slice()}
                renderItem={({ item }) => renderRow(item) }
                ListFooterComponent={loading(isFetching, styles.loading)}
                keyExtractor={ this._keyExtractor }
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    alert(page)
                    if (page > 0) {
                        loadMore()
                    }
                }}
            />
        </View>
    )
})

export default Toutiao

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
    },
    loading:{
        margin:32,
    }
});