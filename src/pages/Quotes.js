/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Container, Content} from '../components';
import {Icon} from 'native-base'
import {Loading} from '../components'

//@inject('app')
@observer
export default class Info extends Component {
    static navigationOptions = {
        headerTitle: '行情动态',
        headerRight: <View />
    }
    /*
    * <View style={styles.header}>
                            <Text style={styles.headerText}>
                                <Icon name={'ios-locate-outline'} style={{fontSize:18}}/> 天津11月28日行情
                            </Text>
                        </View>
                        <View>

                        </View>*/
    componentDidMount(){

    }
    renderRow = (info) =>{
        return (
            <TouchableNativeFeedback
                onPress={()=>{this.newsPress(info)}}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.newsItem}>
                    <Text style={styles.newsItemTitle}>
                        {info.title}
                    </Text>
                    <Text style={styles.newsItemDesc}>
                        {info.from} {info.publishdate} {info.comment_count}评论
                    </Text>
                </View>
            </TouchableNativeFeedback>)
    }

    render() {
        return (
            <ScrollView>
                <Container>
                    <Content gray>
                        <FlatList
                            style={styles.container}
                            data={news.slice()}
                            renderItem={({ item }) => this.renderRow(item) }

                            ListFooterComponent={()=><Loading isShow={isFetching}/>}
                            keyExtractor={ this._keyExtractor }
                            refreshing = {false}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if (news_page > 0) {
                                    this.fetchMore()
                                }
                            }}
                        />
                    </Content>
                </Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    homeBigButton:{
        flex: 1,
    },
    homeBigButtonInner:{
        alignItems:'center',
        justifyContent:'center',
        height:80
    },
    newsItem:{
        backgroundColor:'#fff',
        justifyContent:'center',
        padding:10,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#ccc'
    },
    newsItemTitle:{
        fontSize:20
    },
    newsItemDesc:{
        fontSize:12, color:'#ccc'
    },
    loading:{
        margin:32,
    }
});