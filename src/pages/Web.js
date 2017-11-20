/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import { View } from 'react-native'
import {WebView} from '../components/common'
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer, inject} from 'mobx-react/native'

@observer
export default class Web extends Component {
    constructor(props){
        super(props);
        this.state = {
            WebViewHeight: 0,
        }
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: navigation.state.params.title,
        headerRight: <View></View>
    });

    render() {
        return (
            /*<ScrollView style={{flex:1, backgroundColor:'#fff'}}>
                <WebView
                    javaScriptEnabled={true}
                    source={{ uri: this.props.navigation.state.params.url }}
                    style={{ height: this.state.WebViewHeight }}
                    onNavigationStateChange={(info)=> {
                        tools.showToast(JSON.stringify(info))
                        this.setState({
                            WebViewHeight: info.url.replace(this.props.navigation.state.params.url+'#', '') / 1
                        })
                    }}
                    scrollEnabled={false}
                />
                <View style={{flex:1, borderTopWidth:1, borderTopColor:'#f5f5f5', margin:5, padding:10,}}>
                    <Text style={{ alignSelf:'center'}}>阅读完了</Text>
                </View>
            </ScrollView>*/
            <WebView
                uri={ this.props.navigation.state.params.url }
                style={{ flex:1 }}
            />
        )
    }
}