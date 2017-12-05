import React, {Component} from 'react';
import { Item, Input,Icon,Label,ActionSheet} from 'native-base';
import {observer} from 'mobx-react/native';
import camelCase from 'camelcase';
import {DatePickerAndroid, StyleSheet} from "react-native";

const style = StyleSheet.create({
    rightPadding:{
        paddingRight:28
    },
    ico:{
        width:28,
        color:'#b1b1b1',
        fontSize:14
    },
    titleIco:{
        color:'#009688',
        paddingRight:5
    }
});

const ReadOnlyInput = observer(function ReadOnlyInput({label, value}){
    //debugger;
        return (
            <Item fixedLabel style={style.rightPadding}>
                <Label>{label}</Label>
                <Input value={value} editable={false} placeholderTextColor='#b1b1b1' />
            </Item>
        )
});

const ValidateInput = observer(function ValidateInput({label, data , name , placeholder,onChange,...props}){
    //debugger;
    let errNode = camelCase( 'validateError',name );
    if(data["submited"] && data[errNode] && data[errNode] != null && data[errNode]!=""){
        return (
            <Item error fixedLabel {...props}>
                <Label>{label}</Label>
                <Input placeholder={placeholder} value={data[name]} onChangeText={onChange} placeholderTextColor='#b1b1b1' />
                <Icon name='close-circle' />
            </Item>
        )
    }else {
        return (
            <Item fixedLabel style={style.rightPadding} {...props}>
                <Label>{label}</Label>
                <Input placeholder={placeholder} value={data[name]} onChangeText={onChange} placeholderTextColor='#b1b1b1' />
            </Item>
        )
    }
});

const ValidateChooseItem = observer(function ValidateChooseItem({label, data , name ,getOptions,optionslabel, placeholder,onChange,...props}){
    let showActionSheet = () => {
        let options = getOptions();
        ActionSheet.show(
            {
                options: options,
                title: optionslabel
            },
            (index) => {
                if( index >= 0 && index < options.length ){
                    onChange(options[index]);
                }
            }
        )
    }
    let errNode = camelCase( 'validateError',name );
    if(data["submited"] && data[errNode] && data[errNode] != null && data[errNode]!=""){
        return (
            <Item onPress={showActionSheet} fixedLabel {...props}>
                <Label>{label}</Label>
                <Input editable={false} value={data[name]} placeholder={placeholder} placeholderTextColor='#b1b1b1' />
                <Icon style={style.ico} active name="ios-arrow-forward" />
                <Icon name='close-circle' />
            </Item>
        )
    }else {
        return (
            <Item onPress={showActionSheet} fixedLabel {...props}>
                <Label>{label}</Label>
                <Input editable={false} value={data[name]} placeholder={placeholder} placeholderTextColor='#b1b1b1' />
                <Icon style={style.ico} active name="ios-arrow-forward" />
            </Item>
        )
    }
});

@observer
class ValidateInputDate extends Component{
    constructor(props){
        super(props);
    }
    async showDatePicker(){
        const {data,name,onChange,onCatch} = this.props;
        let value = data[name];
        try {
            const {action, year, month, day}=await DatePickerAndroid.open({
                date:
                    (!value ||
                        value==null ||
                        value == "") ? new Date() : new Date(value)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                onChange(year + "-" + (month+1).toString() + '-' + day );
            }
        } catch ({code, message}) {
            onCatch(code,message);
        }
    }

    render(){
        //debugger;
        let { data,label,name,placeholder } = this.props;
        let errNode = camelCase( 'validateError',name );
        if(data["submited"] && data[errNode] && data[errNode] != null && data[errNode]!=""){
            return (
                <Item error fixedLabel>
                    <Label>{label}</Label>
                    <Input placeholderTextColor='#b1b1b1' editable={false} placeholder={placeholder} value={data[name]} />
                    <Icon name='close-circle' />
                </Item>
            )
        }else {
            return (
                <Item fixedLabel style={style.rightPadding} onPress={this.showDatePicker.bind(this)}>
                    <Label>{label}</Label>
                    <Input placeholderTextColor='#b1b1b1' editable={false} placeholder={placeholder} value={data[name]} />
                </Item>
            )
        }
    }
}
export { ValidateInput,ValidateInputDate,ReadOnlyInput,ValidateChooseItem }