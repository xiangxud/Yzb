import React, {Component} from 'react';
import
{
    View,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {observer,inject} from 'mobx-react/native';
import {Container, Content, Button, Text} from 'native-base';

export default class MonitorPlay extends Component{

    static navigationOptions = ({navigation})=>({
        headerTitle: '栋舍监控',
        headerRight: <View/>
    });

    render(){
        return (<Container>
            <Content>
                <View style={styles.container}>
                    <WebView
                        source={{uri: urls.webPath+'yzb/monitor/live?1'}}
                        scalesPageToFit={false}

                        style={{height:300, marginTop: 20}}
                    />
                </View>
            </Content>
        </Container>);
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:5,
        borderTopWidth:3,
        borderTopColor:'#ff9800',
        backgroundColor:'#fff',
    },
})