import React, {Component} from 'react';
import
{
    View,
    TextInput,
    WebView,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import IcoText from '../common/IcoText';

export default class SearchBar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<View style={style.bar}>
            <View style={style.chevron} >
                <TouchableHighlight onPress={this.props.goBack}>
                    <FontIcon name="chevron-left" size={20} color="#ffffff"></FontIcon>
                </TouchableHighlight>
            </View>
            <Text style={style.word}>{this.props.Title}</Text>
            <IcoText style={{flex:1,marginLeft:5}} icoName="search" bgColor="#ffffff"></IcoText>
        </View>);
    }
}

const style = StyleSheet.create({
    bar : {
        height:50,
        backgroundColor:'#009688',
        flexDirection:'row',
        alignItems:'stretch',
        paddingLeft:10,
        paddingRight:30,
        paddingTop:7,
        paddingBottom:7
    },
    chevron:{
        width:20,
        flexDirection:'row',
        alignItems:'center',
    },
    word:{
        width:80,
        textAlignVertical:'center',
        fontSize:16,
        color:'#ffffff',
        textAlign:'right',
        marginRight:6,
    }
});