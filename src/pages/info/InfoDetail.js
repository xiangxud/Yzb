/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {View, Text , TextInput,WebView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer, inject} from 'mobx-react/native'

@observer
export default class InfoDetail extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: navigation.state.params.title,
        headerRight: <View></View>
    });

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1,}}>
                    <WebView source={{uri:'http://k.sina.cn/article_1775419360_69d2bfe00010023gl.html'}}>
                    </WebView>
                </View>
                <View style={{height:50,alignItems:'center',justifyContent:'center',flexDirection:'row',backgroundColor:'white'}}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholder='说说你的看法'
                        returnKeyType="search"
                        placeholderTextColor="#969696"
                        style={{borderColor:'#ccc',width:165, height:36,borderWidth:1,borderRadius: 4,marginLeft:15}}>
                    </TextInput>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginLeft:15,marginRight:20}}>
                        <Icon name="commenting-o" size={25} color="#008AF5"></Icon>
                        <Icon name="star-o" size={25} color="#008AF5"></Icon>
                        <Icon name="share-square-o" size={25} color="#008AF5"></Icon>
                        <View style={{position:'absolute',left:15,top:-3,alignItems:'center',justifyContent:'center',backgroundColor:'#008AF5',borderWidth:3,borderColor:'white', borderRadius:10,width:20,height:20}}>
                            <Text style={{fontSize:10,color:'white'}}>1</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}