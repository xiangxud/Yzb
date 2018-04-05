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

import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {Icon} from 'native-base'
import {Loading} from '../components'

class QuoteStore {
    @observable page = 1;
    @observable infos = [];
    @observable isFetching = true;
    @observable more = true;

    @action
    mapInfo(list) {
        if (this.page === 1) {
            this.infos.replace(list)
        } else {
            this.infos.splice(this.infos.length, 0, ...list);
        }
        this.isFetching = false;
        list.length < 15 ? this.more = false : this.page++;
    }
    @action
    setLoading = () => {
        this.isFetching = true;
    }
}
quoteStore = new QuoteStore();

@observer
export default class Quotes extends Component {
    static navigationOptions = {
        headerTitle: '行情动态',
        headerRight: <View/>
    }

    /** <View style={styles.header}>
                            <Text style={styles.headerText}>
                                <Icon name={'ios-locate-outline'} style={{fontSize:18}}/> 天津11月28日行情
                            </Text>
                        </View>
                        <View></View>*/
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        request.getJson(urls.apis.CMS_ARTICLE_QUOTES, {page: quoteStore.page}).then((res) => {
            quoteStore.mapInfo(res);
        }).catch((err) => {
            tools.showToast(JSON.stringify(err));
        });
    }

    newsPress = (info) => {
        const {navigation} = this.props;
        navigation.navigate("InfoDetail", {code: info.code, title: info.title})
    }

    renderRow = (info) => {
        return (
            <TouchableNativeFeedback
                onPress={() => {
                    this.newsPress(info)
                }}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.newsItem}>
                    <Text style={styles.newsItemTitle}>
                        {info.title}
                    </Text>
                    <Text style={styles.newsItemDesc}>
                        {info.copy_from} {info.formate}
                    </Text>
                </View>
            </TouchableNativeFeedback>)
    }

    render() {
        const {infos, isFetching, more} = quoteStore;
        return (
            <FlatList
                style={styles.container}
                data={infos.slice()}
                renderItem={({item}) => this.renderRow(item)}

                ListFooterComponent={() => {
                    return <Loading isShow={isFetching}/>
                }}
                refreshing={isFetching}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                    if (more > 0) {
                        this.fetchData()
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    homeBigButton: {
        flex: 1,
    },
    homeBigButtonInner: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    newsItem: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc'
    },
    newsItemTitle: {
        fontSize: 20
    },
    newsItemDesc: {
        fontSize: 12, color: '#ccc'
    },
    loading: {
        margin: 32,
    }
});