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
import {Loading, MaskLoading} from '../../components'

@observer
export default class BreedList extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.source.onLoad();
    }

    renderRow = (info) =>{
        return (
            <TouchableNativeFeedback onPress={() => this.props.onItemPress(info.item.code,info.item.title)}>
                <View style={style.row}>
                    <Text style={style.title}>
                        {info.item.title}
                    </Text>
                    <View style={style.desc}>
                        <Text style={style.block}>{info.item.source}</Text>
                        <Text style={style.block}>{info.item.comments}评论</Text>
                        <Text style={style.block}>{info.item.publishFormate}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>)
    }
    _separator=()=>{
        return <View style={{ height: 1, backgroundColor: '#e2e2e2' }}/>;
    }
    _renderFooter(){
        if (!this.props.source.more) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        }
        return null;
        //return <Loading show={true}/>
    }
    render(){
        return <View style={style.list}>
            <FlatList data={this.props.source.source}
                      renderItem={this.renderRow}
                      onEndReachedThreshold={0.5}
                      ItemSeparatorComponent={this._separator}
                      ListFooterComponent={this._renderFooter()}
                      onEndReached={()=>{
                          this.props.source.onMore();
                          return true;
                      }}
                      refreshing={this.props.source.isLoading}
                      onRefresh={()=>{
                          this.props.source.onLoad();
                          return true;
                      }}
                      keyExtractor={(item, index) => index.toString()}>
            </FlatList>
            {/*<MaskLoading show={this.props.source.isLoading} text={''}/>*/}
        </View>
    }
};

const style = StyleSheet.create({
    list:{
        flex:1
    },
    row:{
        flex:1,
        padding:8,
        //borderBottomWidth:StyleSheet.hairlineWidth,
        //borderBottomColor:'#ccc',
        backgroundColor:'#fff',
    },
    title:{
        flex:1,
        color:'#1b1b1b',
        fontSize:18
    },
    desc:{
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