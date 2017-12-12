import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
} from 'react-native';
import { SwipeRow,Button,Text,Icon } from 'native-base';
import {observer} from 'mobx-react/native';
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx';

@observer
export default class ImmList extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    renderRow = (info) =>{
        return (
            <SwipeRow rightOpenValue={-150}
                      style={{flex:1,paddingTop:0,paddingBottom:0}}
                      list={{}}
                      right={
                          <View style={style.actions}>
                              <Button info style={style.action}><Text>执行</Text></Button>
                              <Button info style={style.action}><Text>忽略</Text></Button>
                          </View>
                      }
                      body={
                          <View style={style.row}>
                              <View style={style.frist}>
                                  <Text style={style.immTitle} numberOfLines={1}>
                                      {info.item.VaccineName}
                                  </Text>
                                  <Text style={style.immTime} numberOfLines={1}>
                                      {info.item.ImmuneTime.ToDate().Format("yyyy-MM-dd")}
                                  </Text>
                              </View>
                              <View style={style.second}>
                                  <Text style={style.block}>{info.item.VaccineMethod}</Text>
                                  <Text style={style.block}>{info.item.Dose}</Text>
                              </View>
                          </View>
                      }
            >
            </SwipeRow>)
    }

    _separator=()=>{
        return <View style={{ height: 1, backgroundColor: '#e2e2e2' }}/>;
    }
    _renderFooter(){
        return <View />
    }
    render(){
        return <View style={style.list}>
            <View style={style.header}>
                <View style={style.title}>
                    <Icon name="list-box" style={{fontSize:22,color:'#e51c23'}}></Icon>
                    <Text style={style.word}>{this.props.title}</Text>
                    <Text style={style.count}>({this.props.collection.count})</Text>
                </View>
                <View style={style.more}>
                    <Text>更多</Text>
                </View>
            </View>
            <FlatList data={this.props.collection.list}
                      renderItem={this.renderRow}
                      onEndReachedThreshold={0.5}
                      ItemSeparatorComponent={this._separator}
                      ListFooterComponent={this._renderFooter}
                      refreshing={!this.props.collection.End}
                      onEndReached={()=>{
                          this.props.collection.onLoad();
                          return true;
                      }} keyExtractor={(item,key) => key}>
            </FlatList>
        </View>
    }
};

const style = StyleSheet.create({
    list:{
        flex:1,
        alignItems:'stretch'
    },
    header:{
        flexDirection:'row',
        height:40,
        alignItems:'center',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#888'
    },
    title:{
        paddingRight:10,
        flexDirection:'row',
        alignItems:'center',
        flex:1
    },
    word:{
        marginLeft:5,
        color:'#101010'
    },
    count:{
        marginLeft:2,
        color:'#ababab'
    },
    more:{
        alignSelf:'center',
        marginRight:5,
        flexDirection:'row',
        alignItems:'center',
    },

    row:{
        flex:1,
        height:50
    },
    frist:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingRight:0
    },
    immTitle:{
        color:'#101010',
        fontSize:16,
        flex:1,
    },
    immTime:{
        color:'#ababab',
        fontSize:12,
        marginLeft:3,
        width:100
    },
    second:{
        flex:1,
        flexDirection:'row',
        paddingTop:3,
        paddingBottom:3
    },
    block:{
        color:'#AEAEAE',
        fontSize:12,
        textAlignVertical:'center',
        marginRight:8
    },
    actions:{
        flexDirection:'row',
        height:55,
        alignItems:'stretch'
    },
    action:{
        height:55
    }
});