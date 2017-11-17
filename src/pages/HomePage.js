/**
 * Created by TomChow on 17/11/8.
 */
import React, { Component } from 'react'
import {
    Text,
    ScrollView,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import {observer, inject} from 'mobx-react/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../styles';
import SwiperBanner from '../components/home/SwiperBanner';
import MySties from '../components/home/MySties';
import Reminds from "../components/home/Reminds";
import Report from "../components/home/Report";
import Toutiao from "../components/home/Toutiao";

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
    newsPress =(id) =>{
        alert(id)
    }
    fetchMore =()=>{
        //alert('get more news')
    }
    render() {
        const {homeStore} = this.props;
        const {isFetching, reminds, fields, news, news_page} = homeStore;
        return (
            <ScrollView style={CommonStyles.container}>
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
                <Toutiao list={news} page={news_page} loadMore={this.fetchMore} isFetching={isFetching} navigation={this.props.navigation} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    homeBigButton:{
        flex: 1,
    },
    homeBigButtonInner:{
        alignItems:'center',
        justifyContent:'center',
        height:80
    }
});