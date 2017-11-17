/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button } from 'native-base';
import {observer, inject} from 'mobx-react/native'

@observer
export default class BHStart extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '渤海检测',
        headerRight: <View></View>
    });

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.topBox}>
                        <View style={styles.topBoxLine}>
                            <Image source={require('../../resource/bohai_logo.png')} style={{width: 40, height: 40}}/>
                            <Text>众联检测服务</Text>
                            <Button>检测说明</Button>
                        </View>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBox:{
        marginTop:5,
        padding:15,
        borderTopWidth:3,
        borderTopColor:'#ff9800',
        backgroundColor:'#fff',

    },
    topBoxLine:{
        paddingBottom:3,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        flexDirection:'row',
    }
})