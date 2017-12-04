import React, {Component} from 'react';
import
{
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import { Text,Button,ActionSheet} from 'native-base';

import {observer} from 'mobx-react/native';
import {action,observable} from 'mobx'
import FontIcon from 'react-native-vector-icons/FontAwesome';

class styBarStore{
    @observable
    displayTxt="";

    styList=[];

    @observable
    cancelIndex = 0;

    @action
    onIni(list,code){
        this.styList=[];
        list.forEach((item)=>{
            this.styList.push({code:item.code,text:item.title,icon:'analytics',iconColor:'#ffffff'});
        });
        this.cancelIndex = this.styList.length - 1;
        this.onSelect(code);
    }

    @action
    onSelect(code){
        if(code==undefined || code=="" || code == null){
            return;
        }
        if( this.styList == null || this.styList == undefined){
            return;
        }
        this.styList.forEach((o)=>{
            if(o.code == code){
                this.displayTxt=o.text;
            }
        });
    }
}

@observer
export default class StyBar extends Component{
    constructor(props){
        super(props);
        debugger;
        this.store.onIni(this.props.styList,this.props.iniCode);
    };

    componentDidMount(){
    }

    @observable
    store = new styBarStore();

    onPopuStys(){
        ActionSheet.show(
            {
                title:'请选择',
                options: this.store.styList,
                destructiveButtonIndex:0,
                cancelButtonIndex:this.store.cancelIndex,
            },
            (index) => {
                this.store.onSelect(this.store.styList[index].code);
            }
        )
    }

    render(){
        return (
            <View style={style.bar}>
                <View style={style.chevron} >
                    <TouchableHighlight>
                        <FontIcon name="chevron-left" size={20} color="#ffffff"></FontIcon>
                    </TouchableHighlight>
                </View>

                <TouchableNativeFeedback onPress={this.onPopuStys.bind(this)}>
                    <View style={style.center}>
                        <Text style={{color:'#ffffff',marginRight:5}}>{this.store.displayTxt}</Text>
                        <FontIcon name="chevron-down" size={12} color='#ffffff' />
                    </View>
                </TouchableNativeFeedback>

                <View style={style.right}>
                    <View onPress={this.props.onMessPress}>
                        <FontIcon name="envelope" size={20} color='#ffffff' />
                        <FontIcon name="circle" size={15} color='#f50716' style={style.warning} />
                    </View>
                    <View style={style.ico}>
                        <FontIcon name="cog" size={20} color='#ffffff' />
                    </View>
                </View>
            </View>)
    }
};

const style = StyleSheet.create({
    bar : {
        height:50,
        backgroundColor:'#009688',
        flexDirection:'row',
        alignItems:'stretch',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:7,
    },
    chevron:{
        width:20,
        flexDirection:'row',
        alignItems:'center',
    },
    center:{
        flexDirection:'row',
        alignItems:'center',

    },
    right:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    ico:{
        marginLeft:15
    },
    warning : {
        position:'absolute',
        left:12,
        top:-3
    },
});