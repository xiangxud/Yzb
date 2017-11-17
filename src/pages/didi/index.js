/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import { ScrollView, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Text } from 'native-base';
import {observer, inject} from 'mobx-react/native'

@observer
export default class Didi extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '渤海检测',
        headerRight: <View></View>
    });

    render() {
        return (
            <ScrollView style={{marginTop:5, borderTop:3, borderTopColor:'#ff9800'}}>
                <View style={styles.container}>
                    <Button block light>
                        <Text>Light</Text>
                    </Button>
                    <Button block>
                        <Text>Primary</Text>
                    </Button>
                    <Button block success>
                        <Text>Success</Text>
                    </Button>
                    <Button block info>
                        <Text>Info</Text>
                    </Button>
                    <Button block warning>
                        <Text>Warning</Text>
                    </Button>
                    <Button block danger>
                        <Text>Danger</Text>
                    </Button>
                    <Button block dark>
                        <Text>Dark</Text>
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
}