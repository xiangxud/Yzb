import React, {Component} from 'react';
import {Item, Input,Icon,Label,ActionSheet,Text,Right,Radio,ListItem} from 'native-base';
import {observer} from 'mobx-react/native';
import camelCase from 'camelcase';
import {DatePickerAndroid, StyleSheet,TouchableOpacity,View} from "react-native";
import {observable,action} from "mobx";

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
    },
    label:{
        width:55
    }
});

const ReadOnlyInput = observer(function ReadOnlyInput({label, value}){
        return (
            <Item fixedLabel style={style.rightPadding}>
                <Label>{label}</Label>
                <Input value={value} editable={false} placeholderTextColor='#b1b1b1' />
            </Item>
        )
});

const ValidateInput = observer(function ValidateInput({label, data , name , placeholder,onChange,...props}){
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


const ValidRadioItem = observer(function ValidateChooseItem({label, value ,selectValue, onChanged}){
    let selected = value == selectValue;
    return (
        <ListItem fixedLabel style={style.rightPadding} onPress={()=>{
            onChanged(value)
        }}>
            <Label style={style.label}>{label}</Label>
            <Right>
                <Radio selected={selected} />
            </Right>
        </ListItem>);
})

@observer
class ValidateRadioInput extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        let {data,name} = this.props;
        this.selectValue=data[name];
    }

    @observable
    selectValue="";

    @action
    onChanged(value){
        this.selectValue=value;
        let {onChanged} = this.props;
        if(onChanged){
            onChanged(value);
        }
    }

    renderItem(item,i){
        return (<ValidRadioItem key={i} label={item.title} value={item.value} onChanged={this.onChanged.bind(this)} selectValue={this.selectValue}></ValidRadioItem>);
    }

    render(){
        let {data,name,options} = this.props;
        let errNode = camelCase( 'validateError',name );

        if(data["submited"] && data[errNode] && data[errNode] != null && data[errNode]!=""){
            return (
                <View>
                    {
                        options.map((item,i) => this.renderItem(item,i))
                    }
                </View>
            )
        }else {
            return (
                <View>
                {
                    options.map((item,i) => this.renderItem(item,i))
                }
                </View>
            )
        }
    }
}



export { ValidateInput,ValidateInputDate,ReadOnlyInput,ValidateChooseItem,ValidateRadioInput }