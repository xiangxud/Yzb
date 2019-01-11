import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback
} from 'react-native';
import {observer} from 'mobx-react/native';

@observer
export default class Waring extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const{ waring }= this.props;
        return <View style={style.container}>
            {waring}
        </View>
    }
};

const style = StyleSheet.create({
    container:{
        height:30,
        flexDirection:'row',
        alignItems:'center',
    },
    item:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:5,
    },
    red:{
        color:'#e51c23',
        fontSize:18,
    }
});