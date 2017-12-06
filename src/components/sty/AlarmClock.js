import React, {Component} from 'react';
import
{
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
} from 'react-native';
import { SwipeRow,Button,Text,Icon } from 'native-base';
import {observer} from 'mobx-react/native';
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx';

@observer
export default class AlarmClock extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){

    }

    renderDate(date){
        return (
            <Text style={style.immTime} numberOfLines={1}>
                {date == new Date().Format("yyyy-MM-dd") ? "今天" : date }
             </Text>);
    };

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
                                  {
                                      this.renderDate(info.item.ImmuneTime.ToDate().Format("yyyy-MM-dd"))
                                  }
                                  <Text style={style.immTitle} numberOfLines={1}>
                                      {info.item.VaccineName}
                                  </Text>
                          </View>
                      }
            >
            </SwipeRow>)
    }

    _separator=()=>{
        return <View style={{ height: 1, backgroundColor: '#bbbbbb' }}/>;
    }
    _renderFooter(){
        return <View />
    }

    render(){
        return <FlatList data={this.props.collection.list}
                      renderItem={this.renderRow}
                      onEndReachedThreshold={0.5}
                      ItemSeparatorComponent={this._separator}
                      ListFooterComponent={this._renderFooter}
                      refreshing={!this.props.collection.End}
                      onEndReached={()=>{
                          this.props.onLoad();
                          return true;
                      }} keyExtractor={(item,key) => key}>
            </FlatList>
    }
};

const style = StyleSheet.create({
    row:{
        flex:1,
        flexDirection:'row',
        paddingRight:0,
        height:45,
        alignItems:'flex-end'
    },
    immTitle:{
        color:'#017a6c',
        fontSize:16,
        flex:1,
        height : 30,
        textAlignVertical:'center'
    },
    immTime:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'bold',
        width:100,
        height : 30,
        backgroundColor:"#009688",
        textAlign:'center',
        textAlignVertical:'center',
        marginLeft:10,
        marginRight:10
    },
    actions:{
        flexDirection:'row',
        alignItems:'stretch'
    },
    action:{
    }
});