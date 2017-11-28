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
import { Icon } from 'native-base'

class WaringStore
{
    @observable
    End:true;//加载是否完成
    @observable
    count:0;//数量
    @observable
    breed:'';//种属


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

    render(){
        return <View></View>
    }
};

const style = StyleSheet.create({
});