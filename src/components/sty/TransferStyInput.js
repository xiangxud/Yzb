import React, {Component} from 'react';
import
{
    TouchableOpacity,
} from 'react-native';
import {ValidateChooseItem} from '../../components/common/native-base-validate'
import {inject, observer} from "mobx-react/native";

@observer
export default class TransferStyInput extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {show,label,data,name,options,placeholder,IsValidate,onChanged} = this.props;
        if(show){
            return (<ValidateChooseItem label={label} data={data} name={name} IsValidate={IsValidate} selectOptions={options} optionslabel={label} placeholder={placeholder} onChange={onChanged} />);
        }else{
            return null;
        }
    }
}