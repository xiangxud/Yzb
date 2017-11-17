/**
 * Created by TomChow on 17/11/8.
 */
import React, { Component } from 'react'
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
} from 'react-native';
import {observer, inject} from 'mobx-react/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../styles';
import SwiperBanner from '../components/home/SwiperBanner';
import MySties from '../components/home/MySties';
import Reminds from "../components/home/Reminds";
import Report from "../components/home/Report";
import TitleBar from '../components/common/TitleBar'
import loading from '../components/common/Loading'

@inject('homeStore')
@observer
export default class HomePage extends Component {

    componentDidMount(){
        const { homeStore } = this.props;
        //if(!homeStore.isFetching)
            homeStore.fetchHomeData()

    }

    remindMore=(t)=>{
        alert(t)
    }
    detailPress=(id)=>{
        alert('detail'+id)
    }
    exec = (key) =>{
        alert('ok-'+key)
    }
    newsPress =(info) =>{
        const {navigation} = this.props;
        navigation.navigate("InfoDetail",{ key : info.key , title:info.title })
    }
    fetchMore =()=>{
        //alert('get more news')
        homeStore.fetchNextInfos();
    }
    renderListHeader(){
        const {homeStore} = this.props;
        const {isFetching, reminds, fields, news, news_page} = homeStore;
        return (
            <View>
                <View style={{height:120, backgroundColor:'#ffc'}}>
                    <SwiperBanner />
                </View>
                <View style={{marginTop:10, marginBottom:10, backgroundColor:'#fff', height:80, flexDirection:'row'}}>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('BHStart') } style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='medkit' color={'#8bc34a'} size={34} />
                            <Text>动物诊疗</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('InfoDetail') } style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='user-md' color={'#50AAF0'} size={34} />
                            <Text>滴滴兽医</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('InfoDetail') } style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='video-camera' color={'#F1745E'} size={34} />
                            <Text>直播间</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> {}} style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='shopping-cart' color={'#888'} size={34} />
                            <Text>商城</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('InfoDetail') } style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='line-chart' color={'#009688'} size={34} />
                            <Text>行情</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <MySties/>
                {!isFetching && reminds ?
                    <Reminds reminds={reminds}
                             morePress={this.remindMore}
                             detailPress={this.detailPress}
                             exec={this.exec}
                             ignore={this.exec}/>
                    :null}
                <Report fields={fields} morePress={this.remindMore}/>
                <TitleBar icon={'newspaper-o'}
                          iconColor={'red'}
                          title={'养殖头条'}
                          showMore = {true}
                          onMorePress={()=>{this.remindMore('news')}} />
            </View>
        )
    }
    _keyExtractor = (item, index) => index;

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
        const {homeStore} = this.props;
        const {isFetching, reminds, fields, news, news_page} = homeStore;
        return (
                <FlatList
                    style={styles.container}
                    data={news.slice()}
                    renderItem={({ item }) => this.renderRow(item) }
                    ListHeaderComponent={this.renderListHeader()}
                    ListFooterComponent={loading(isFetching, styles.loading)}
                    keyExtractor={ this._keyExtractor }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (news_page > 0) {
                            this.fetchMore()
                        }
                    }}
                />
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