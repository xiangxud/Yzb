/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Alert,
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
class FarmsStore{
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
farmsStore = new FarmsStore();

@inject('bohaiStore')
@observer
export default class Info extends Component {

    static navigationOptions = ({navigation})=>({
        headerTitle: '选择养殖场',
        headerRight: <Text onPress={navigation.state.params? navigation.state.params.openAdd: null} style={{padding:5, color:'#fff'}}>
            添加养殖场
        </Text>,
    });

    componentDidMount(){
        this.props.navigation.setParams({
            openAdd: this.openAddFarm
        })
    }

    openAddFarm = () =>{
        Alert.alert(
            '您确定要添加新的养殖场吗？',
            '您可以先更改搜索关键字来搜索系统已存在的养殖场，不再试试吗?',
            [
                {text: '再找找吧', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '没找到，去添加', onPress: () => {
                    this.props.navigation.navigate("AddFarm");
                }},
            ],
            { cancelable: true }
        );
    }

    fetchData = (kw) =>{
        kw = kw.replace(/\s*/g, '');
        if(kw.length < 2){
            tools.showToast('请输入至少两个汉字');
            return;
        }
        farmsStore.setLoading(true);
        request.getJson(urls.apis.BH_FARMS, {kw: kw}).then((res)=>{
            farmsStore.mapInfo(res);
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
        return <Selector onPress={()=>this.newsPress(info)} value={info} />
    }

    renderHeader = () =>{
        return <Search backgroundColor={'#bdbdbd'}
                       placeholder='搜索养殖场'
                       cancelTitle='取消'
                       onSearch={this.fetchData}/>
    }
    render() {
        const {farms, isFetching} = farmsStore;
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