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

@inject('styleStore')
@observer
export default class Sty extends Component{
    constructor(props){
        const {navigation} = props;
        super(props);
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            // this.props.navigation.setParams({
            //     //onChanged : this.onSearchTxtChanged.bind(this)
            // });
        }, 2000);
    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }

    componentWillMount()
    {
        //this.onItemPress.bind(this);
    }

    render(){
        const {styleStore} = this.props;
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