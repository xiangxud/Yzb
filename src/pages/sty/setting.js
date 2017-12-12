import React, {Component} from 'react';
import
{
    View,
    Text ,
    Button,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Container,Content,Root,List,ListItem } from 'native-base';
import {observer,inject} from 'mobx-react/native';

@inject('styStore')
@observer
export default class setting extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: "设置",
        headerRight: <View />
    });

    componentDidMount(){
        const {styStore,navigation} = this.props;
    }

    constructor(props){
        super(props);
    }

    render(){
        const {styStore} = this.props;
        return (
                <Container>
                    <Content>
                        <List>
                            <ListItem itemDivider>
                                <Text>摄像头</Text>
                            </ListItem>

                        </List>
                    </Content>
                </Container>
        );
    }
}

const style = StyleSheet.create({

});