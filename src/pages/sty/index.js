import React, {Component} from 'react';
import
{
    View,
    Text ,
    Button,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {observer,inject} from 'mobx-react/native';
import StyBar from '../../components/common/StyBar';

@inject('styStore')
@observer
export default class Sty extends Component{
    static navigationOptions = ({navigation})=>{header:(<StyBar iniCode={'008'}></StyBar>)};
    static navigationOptions = ({navigation})=>({
        header:(<StyBar goBack={navigation.goBack}
                        navigate={navigation.navigate}
                        iniCode={navigation.state.params.code}
                        Title={navigation.state.params.title}
                        styList={navigation.state.params.list}></StyBar>)
    });

    render(){

        return (<View></View>);
    }
}

const style = StyleSheet.create({
    tab : {
        height:60,
        flexDirection:'row',
        alignItems:'stretch'
    },
});