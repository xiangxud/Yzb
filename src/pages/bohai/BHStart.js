/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Text } from 'native-base';
import {observer, inject} from 'mobx-react/native'

@observer
export default class Start extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '渤海检测',
        headerRight: <View></View>
    });

    render() {
        return (
                <Content>
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
                </Content>
        )
    }
}