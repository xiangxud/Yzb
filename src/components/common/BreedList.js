import React, {Component} from 'react';
import
{
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback
} from 'react-native';
import {observer} from 'mobx-react/native';

@observer
export default class BreedList extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount()
    {
        this.props.source.onLoad();
    }

    renderRow = (info) =>{
        return (
            <TouchableNativeFeedback onPress={() => this.props.onItemPress(info.item.code,info.item.title)}>
                <View style={style.row}>
                    <Text style={style.frist}>
                        {info.item.title}
                    </Text>
                    <View style={style.second}>
                        <Text style={style.block}>{info.item.source}</Text>
                        <Text style={style.block}>{info.item.comments}评论</Text>
                        <Text style={style.block}>{info.item.publishFormate}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>)
    }

    render(){
        return <View style={style.list}>
            <FlatList data={this.props.source.source}
                      renderItem={this.renderRow}
                      onEndReachedThreshold={0.5}
                      refreshing={!this.props.source.end}
                      onEndReached={()=>{
                          this.props.source.onMore();
                          return true;
                      }}
                      onRefresh={()=>{
                          this.props.source.onLoad();
                          return true;
                      }} keyExtractor={(item,key) => key}>
            </FlatList>
        </View>
    }
};

const style = StyleSheet.create({
    list:{
        flex:1
    },
    row:{
        flex:1,
        paddingTop:3,
        paddingBottom:3,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#888',
    },
    frist:{
        flex:1,
        color:'#101010',
        fontSize:14
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
    }
});