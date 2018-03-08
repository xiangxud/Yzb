import React, {Component} from 'react';
import {
    View,
    TextInput,
    WebView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {Container, Content, Text, Button, Icon} from 'native-base';
import {observer, inject} from 'mobx-react/native';

@inject('styStore')
@observer
export default class EnvironmentalSetting extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '环控设置',
        headerRight: <Text/>
    })

    render() {
        return (
            <Container>
                <Content>
                    <Button block danger onPress={()=>this.goto()}><Text>保存更改</Text></Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

})