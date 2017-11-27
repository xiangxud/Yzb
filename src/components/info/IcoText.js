import React, {Component} from 'react';
import
{
    View,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {observer} from 'mobx-react/native';
import {action,observable} from 'mobx';

class Config
{
    bgColor='';
    icoName='search';
}

@observer
export default class IcoText extends Component{
    constructor(props){
        super(props);
        this.config.bgColor = this.props.bgColor;
        this.config.icoName = this.props.icoName;
    }
    @observable
    config = new Config();

    static defaultProps = {
        bgColor:'#ffffff',
        icoName:'search',
        onChanged:(e)=>{}
    }

    render(){
        return (<View style={[style.textinput,{backgroundColor:this.config.bgColor}]}>
            <View style={style.ico}>
                <Icon name={this.config.icoName} size={18} color="#aaaaaa"></Icon>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems:'stretch'}}>
                <TextInput style={style.text}
                           onChange={(e)=>this.props.onChanged(e.nativeEvent.text)}
                           underlineColorAndroid='transparent'
                           placeholderTextColor="#aaaaaa">
                </TextInput>
            </View>
        </View>);
    }
}

const style = StyleSheet.create({
    textinput : {
        flex:1,
        flexDirection:'row',
        alignItems:'stretch',
        borderRadius:5,
        borderWidth:0,
        marginTop:0,
        marginBottom:0,
    },
    ico:{
        marginLeft:4,
        flexDirection:'row',
        alignItems:'center',
    },
    text:{
        flex:1,
        margin:0,
        fontSize:14,
    }
});