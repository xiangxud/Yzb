import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
} from 'react-native';
import { SwipeRow, Button, Text,Spinner, Icon } from 'native-base';
import {observer} from 'mobx-react/native';
import {TitleBar} from '../../components';

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
    renderList(){
        let list = this.props.collection.collection.list;
        let top = this.props.top;
        if(!top || top < 2){
            top = 5;
        }
        let array = list.slice(0,top);

        return <FlatList data={array}
                         renderItem={this.renderRow}
                         onEndReachedThreshold={0}
                         ItemSeparatorComponent={this._separator}
                         ListFooterComponent={this._renderFooter}
                         ListEmptyComponent={()=><View style={{height:100, justifyContent:'center', alignItems:'center'}}><Text style={{color:'gray'}}>暂无免疫提醒</Text></View>}
                         refreshing={!this.props.collection.collection.end}
                         keyExtractor={(item,key) => key}>
        </FlatList>;
    }
    render(){
        return <View style={style.container}>
            <TitleBar icon={'bell-o'}
                      title='免疫提醒'
                      morePress={this.props.onMore}
                      sub={<Text style={style.count}>({this.props.collection.collection.count})</Text>}/>
            {
                this.props.collection.collection.end?this.renderList():<Spinner />
            }
        </View>
    }
};

const style = StyleSheet.create({
    container:{
        flex:1,
        marginTop:10,
        alignItems:'stretch'
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