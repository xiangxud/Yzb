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
//import {Container, Content, Loading} from '../../../components';
//import { Icon } from 'native-base'
import Search from 'react-native-search-box';
import Selector from '../../../components/bohai/Selector';
class FarmStore{
    @observable page = 1;
    @observable farms = [];
    @observable isFetching = true;
    @observable more = true;

    @action
    mapInfo(list){
        this.farms.replace(list)
        this.setLoading(false);
    }

    @action
    setLoading=(r)=>{
        this.isFetching = r;
    }
}
farmStore = new FarmStore();

@inject('bohaiStore')
@observer
export default class Info extends Component {

    static navigationOptions = ({navigation})=>({
        headerTitle: '选择养殖场',
        headerRight: <Text onPress={navigation.state.params? navigation.state.params.openAdd: null} style={{padding:5, color:'#fff'}}>

        </Text>,
    });

    componentDidMount(){
        this.props.navigation.setParams({
            openAdd: this.openAddFarm
        })
    }

    openAddFarm = () =>{
        alert('添加养殖场');
    }

    fetchData = (kw) =>{
        kw = kw.replace(/\s*/g, '');
        if(kw.length < 2){
            tools.showToast('请输入至少两个汉字');
            return;
        }
        farmStore.setLoading(true);
        request.getJson(urls.apis.BH_FARMS, {kw: kw}).then((res)=>{
            farmStore.mapInfo(res);
        }).catch((err)=>{
            tools.showToast(JSON.stringify(err));
        });
    }

    newsPress = (info) =>{
        const {navigation} = this.props;
        bohaiStore.set('farmName', info);
        navigation.goBack();
    }

    renderRow = (info) =>{
        // return (
        //     <TouchableNativeFeedback
        //         onPress={()=>{this.newsPress(info)}}
        //         background={TouchableNativeFeedback.SelectableBackground()}>
        //         <View style={styles.newsItem}>
        //             <Text style={styles.newsItemTitle}>
        //                 {info}
        //             </Text>
        //         </View>
        //     </TouchableNativeFeedback>)
        return <Selector onPress={()=>this.newsPress(info)} value={info} />
    }

    renderHeader = () =>{
        return <Search backgroundColor={'#bdbdbd'}
                       placeholder='搜索养殖场'
                       cancelTitle='取消'
                       onSearch={this.fetchData}/>
    }
    render() {
        const {farms, isFetching} = farmStore;
        return (
            <FlatList
                style={styles.container}
                data={farms.slice()}
                renderItem={({ item }) => this.renderRow(item) }
                ListHeaderComponent={()=> this.renderHeader()}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, key) => key}
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