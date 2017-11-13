/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    ListView,
    StyleSheet,
    ToastAndroid,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import {reaction} from 'mobx'
import { observer, inject } from 'mobx-react/native'
import TitleBar from '../common/TitleBar';
import ImmRemindStore from "../../store/immremindStore";

@observer
export default class Remind extends Component {
    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    };
    constructor(props){
        super(props);
        this.immremindStore = new ImmRemindStore();
    }
    componentDidMount() {
        reaction(
            () => this.immremindStore.page,
            () => this.immremindStore.fetchHomeRemind()
        );
    }
    componentWillReact() {
        const {errorMsg} = this.immremindStore
        errorMsg && ToastAndroid.show(errorMsg, ToastAndroid.SHORT)
    }
    _onEndReach = () => this.immremindStore.pageIncrease()
    more = () =>{
        alert('更多');
    }
    _onPressButton = () =>{
        alert('ok')
    }
    _onPressButton1 = () =>{
        alert('get it.')
    }
    _renderRow = () =>{
        return (
        <TouchableNativeFeedback
            onPress={()=>{this._onPressButton()}}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{justifyContent:'center', padding:10, borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#ccc'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{flex:1, fontSize:18, color:'#333'}}>
                        猪瘟兔化弱毒疫苗1
                        <Text style={{color:'#ccc', fontSize:14, marginLeft:5}}>今天</Text>
                    </Text>
                    <TouchableOpacity onPress={()=>this._onPressButton1()}>
                        <Text style={{color:'red', fontSize:18, padding:5}}>执行</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._onPressButton1()}>
                        <Text style={{color:'gray', fontSize:18, padding:5}}>忽略</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{color:'#a7a7a7'}}>
                    肌肉注射  说明：注射后一天内请勿进食
                </Text>
            </View>
        </TouchableNativeFeedback>)
    }
    render() {
        const {isFetching, reminds} = this.immremindStore
        return (
            <View style={styles.container}>
                <TitleBar icon={'bell-o'}
                          iconColor={'red'}
                          title={'今日提醒'}
                          showMore = {true}
                          onMorePress={()=>{this.more()}} />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(reminds.slice(0))}
                    renderRow={this._renderRow}
                    renderFooter={this._renderFooter}
                    enableEmptySections
                    initialListSize={3}
                    onScroll={this._onScroll}
                    onEndReached={this._onEndReach}
                    onEndReachedThreshold={30} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
    },
});