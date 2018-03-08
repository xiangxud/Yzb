import React, {Component} from 'react';
import
{
    View,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Container, Content, Button, Text, Icon} from 'native-base';
import {TitleBar, SeparatorArea} from '../../components';

export default class report extends Component{
    static navigationOptions = ({navigation}) => ({
        headerRight: <Button transparent light
                             onPress={navigation.state.params ? navigation.state.params.inputPress : null}><Text>填写日报</Text></Button>
    })
    componentDidMount() {
        this.props.navigation.setParams({
            inputPress: this.inputPress
        });
    }
    inputPress =()=>{
        alert('填写报告');
    }
    render(){
        return (
            <Container>
                <Content>
                    <SeparatorArea/>
                    <TitleBar icon={'line-chart'}
                              iconColor={'red'}
                              title={'环境监测趋势'}
                              showMore={false}/>
                    <View style={styles.canvas}>

                    </View>
                    <SeparatorArea/>
                    <TitleBar icon={'file-text'}
                              iconColor={'red'}
                              title={'日报'}
                              showMore={false}/>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    canvas: {
        height:300,
        backgroundColor:'#e69d63'
    },
})