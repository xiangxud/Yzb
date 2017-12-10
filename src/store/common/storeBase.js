import {AsyncStorage} from 'react-native'
import validate from 'mobx-form-validate';
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'

export default class storeBase{
    customValidateHeader = "validateItem";
    @observable IsValidate=0
    @action
    onValidate(){
        this.submited=true;
        this.IsValidate=this.IsValidate+1;//强制刷新

        let mess = [];//可以代码自动生成
        //1、自定义
        for(let key in this.data.$mobx.values){
            if( key.indexOf(this.customValidateHeader) == 0 && this.data[key] && this.data[key]!=null && this.data[key]!=""){
                mess.push(this.data[key]);
            }
        }
        //2、正则表达式
        for(let key in this.data.__proto__.constructor.__validateFields){
            let f=this.data.__proto__.constructor.__validateFields[key];
            if( f && f!=null && f!="" && this.data[f] && this.data[f] != null && this.data[f] != "" ){
                mess.push(this.data[f]);
            }
        }
        return mess;
    }
}