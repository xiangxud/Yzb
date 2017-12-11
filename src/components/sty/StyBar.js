import React, {Component} from 'react';
import
{
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { Text,Button,ActionSheet} from 'native-base';
import {observer} from 'mobx-react/native';
import {action,observable} from 'mobx'
import { Icon } from 'native-base'

@observer
export default class StyBar extends Component{
    constructor(props){
        super(props);
    };

    onMenu(){
        let settingSty = {
            name:"SettingSty",
            text: "设置",
            icon: "ios-build",
            iconColor: "#f42ced",
            action:()=>{
                this.props.onSettingPress();
            }
        }

        let delSty={
            name:"DeleteSty",
            text:"删除该栋舍",
            icon:"ios-trash",
            iconColor: "#FF0000",
            action:()=>{
            }
        }

        let editSty = {
            name:"EditSty",
            text: "编辑",
            icon: "ios-create",
            iconColor: "#2c8ef4",
            action:()=>{
                this.props.onEditPress();
            }
        };
        let outPet = {
            name:"OutPet",
            text:"出栏",
            icon:"ios-log-out",
            iconColor:"#98FB98",
            action:()=>{
                this.props.onOutPetPress();
            }
        }
        let addPet = {
            name:"OutPet",
            text:"入栏",
            icon:"ios-log-in",
            iconColor:"#49179b",
            action:()=>{
                this.props.onInPetPress();
            }
        }

        let forms=[settingSty,delSty,editSty,outPet,addPet];
        ActionSheet.show(
            {
                title:'操作',
                options: forms,
                destructiveButtonIndex:0,
                cancelButtonIndex:-1
            },
            (index) => {
                if( index < 0 || index >= forms.length ){
                    return;
                }
                let action = forms[index].action.bind(this);
                action();
            }
        )
    }

    render(){
        return (
                    <TouchableOpacity onPress={this.onMenu.bind(this)}>
                        <View style={style.bar}>
                            <Icon name="md-more" style={style.ico} />
                        </View>
                    </TouchableOpacity >)
    }
};

const style = StyleSheet.create({
    bar:{
        width:50,alignItems:'center'
    },
    ico:{
        color:'#ffffff'
    }
});