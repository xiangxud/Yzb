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
import {Loading} from '../../components'

class ScoreRecordStore {
    @observable page = 1;
    @observable list = [];
    @observable isFetching = true;
    @observable more = true;

    @action
    mapInfo(list) {
        if (this.page === 1) {
            this.list.replace(list)
        } else {
            this.list.splice(this.list.length, 0, ...list);
        }
        this.isFetching = false;
        list.length < 15 ? this.more = false : this.page++;
    }

    @action
    setLoading = () => {
        this.isFetching = true;
    }
    @action
    getData = () => {
        //page: this.page
        request.getJson(urls.apis.USER_SCORE_RECORD, {}).then((res) => {
            runInAction(() => {
                this.mapInfo(res);
            })
        }).catch((err) => {
            tools.showToast('数据处理错误');
        });
    }
}

scoreRecordStore = new ScoreRecordStore();

@observer
export default class ScoreRecord extends Component {
    static navigationOptions = {
        headerTitle: '积分详情',
        headerRight: <View/>
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        scoreRecordStore.getData();
    }

    renderRow = (item) => {
        return (
            <View style={styles.newsItem}>
                <Text style={styles.newsItemTitle}>
                    {item.Data0}
                </Text>
                <Text style={styles.newsItemDesc}>
                    {`于` + item.CreatedAt + `获得` + item.Data2 + `分`}
                </Text>
            </View>)
    }

    render() {
        const {list, isFetching, more} = scoreRecordStore;
        return (
            <FlatList
                style={styles.container}
                data={list.slice()}
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