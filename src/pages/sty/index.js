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
        header:(<StyBar goBack={navigation.goBack} navigate={navigation.navigate} iniCode="008" Title="栋舍"></StyBar>)
    });
    // componentDidMount() {
    //     this.timer = setTimeout(() => {
    //         const {styStore} = this.props;
    //         this.props.navigation.setParams({
    //              styList : styStore.list
    //         });
    //     }, 2000);
    // }
    //
    // componentWillUnMount() {
    //     this.timer && clearTimeout(this.timer);
    // }

    componentWillMount()
    {
        //this.onItemPress.bind(this);
    }

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