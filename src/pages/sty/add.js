import React, {Component} from 'react';
import
{
    View,
    Text ,
    Button,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import {observer,inject} from 'mobx-react/native';

@inject('addStyStore')
@observer
export default class Add extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '添加栋舍',
    });

    componentWillMount(){
        const {addStyStore,navigation} = this.props;
        addStyStore.onIni(navigation.state.params.farm);
    }

    constructor(props){
        super(props);
    }

    render(){
        const {styStore} = this.props;
        return (
            <ScrollView style={{flex:1}}>
            </ScrollView>);
    }
}

const style = StyleSheet.create({
});