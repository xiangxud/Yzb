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
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'native-base'

class Collection
{
    @observable
    End:true;
    @observable
    count:0;
    @observable
    list:[];

    @action
    onIni(){
    }

    @action
    onLoad(){
        this.list = [{
            id:'8E0DF754-91F4-4557-BF47-005C9E4E9B0D',
            vaccineTitle:'疫苗鸡球虫病',
            vaccineType:'活疫苗',
            vaccineMethod:'胸肌注射',
            dose:'200ml x 200',
            immuneTime:'2017-07-21',
            status:'未完成'
        },{
            id:'B8BDBF1B-9AA7-491F-AE9A-01FEBF6C0C0B',
            vaccineTitle:'猪支原体肺炎灭活疫苗（DJ-166株）',
            vaccineType:'活疫苗',
            vaccineMethod:'胸肌注射',
            dose:'200ml x 200',
            immuneTime:'2017-07-21',
            status:'未完成'
        },{
            id:'B8BDBF1B-9AA7-491F-AE9A-01FEBF6C0C0B',
            vaccineTitle:'猪支原体肺炎灭活疫苗（DJ-166株）',
            vaccineType:'活疫苗',
            vaccineMethod:'胸肌注射',
            dose:'200ml x 200',
            immuneTime:'2017-07-21',
            status:'未完成'
        },{
            id:'B8BDBF1B-9AA7-491F-AE9A-01FEBF6C0C0B',
            vaccineTitle:'猪支原体肺炎灭活疫苗（DJ-166株）',
            vaccineType:'活疫苗',
            vaccineMethod:'胸肌注射',
            dose:'200ml x 200',
            immuneTime:'2017-07-21',
            status:'未完成'
        }];
        this.count = this.list.length;
        this.End = true;
    }
}

@observer
export default class ImmList extends Component{
    constructor(props){
        super(props);
    }

    @observable
    collection = new Collection();

    componentWillMount()
    {
    }



    renderRow = (info) =>{
        return (
            <TouchableNativeFeedback onPress={() => {}}>
                <View style={style.row}>
                    <View style={style.frist}>
                        <Text style={style.immTitle} numberOfLines={1}>
                            {info.item.vaccineTitle}
                        </Text>
                        <Text style={style.immTime} numberOfLines={1}>
                            2017-09-09
                        </Text>
                    </View>
                    <View style={style.second}>
                        <Text style={style.block}>{info.item.vaccineMethod}</Text>
                        <Text style={style.block}>{info.item.dose}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>)
    }

    render(){
        return <View style={style.list}>
            <View style={style.header}>
                <View style={style.title}>
                    <Icon name="list-box" style={{fontSize:22,color:'#e51c23'}}></Icon>
                    <Text style={style.word}>{this.props.title}</Text>
                    <Text style={style.count}>({this.collection.count})</Text>
                </View>
                <View style={style.more}>
                    <Text>更多</Text>
                </View>
            </View>
            <FlatList data={this.collection.list}
                          renderItem={this.renderRow}
                          onEndReachedThreshold={0.5}
                          refreshing={!this.collection.End}
                          onEndReached={()=>{
                              this.collection.onLoad();
                              return true;
                          }}
                          onRefresh={()=>{
                              //this.props.source.onLoad();
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
        height:30,
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
        paddingTop:3,
        paddingBottom:3,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#888',
    },
    frist:{
        flex:1,
        color:'#101010',
        fontSize:14,
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
        flex:1
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