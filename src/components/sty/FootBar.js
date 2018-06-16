/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native'
import {Container, Content, Footer, FooterTab, Button, Label} from 'native-base';
import {observer} from 'mobx-react/native';

@observer
export default class FootBar extends Component {
    constructor(props){
        super(props);
    }

    static defaultProps = {
        buttons:[{ title: '提交' , default: true, onPress: () => {}}]
    };


    renderButtons() {
        list=[];
        return this.props.buttons.map((button) => {


            if(button.default){
                return <Button key={button.title} primary onPress={button.onPress}>
                    <Label style={!button.style? button.style: {  }}>{button.title}</Label>
                </Button>;
            }else{
                return <Button key={button.title} light onPress={button.onPress}>
                    <Label style={!button.style? button.style: {  }}>{button.title}</Label>
                </Button>;
            }
        });
    }

    render() {
        return (
            <Footer>
                <FooterTab>
                    {
                        this.renderButtons()
                    }
                </FooterTab>
            </Footer>
        )
    }
}