/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {Container, Content, Footer, FooterTab, Button,Text} from 'native-base';
import {observer, inject} from 'mobx-react/native';

@observer
export default class FootBar extends Component {
    constructor(props){
        super(props);
    }

    static defaultProps = {
        buttons:[{ title:'提交' , default:true, onPress:()=>{}}]
    };


    renderButtons() {
        list=[];
        return this.props.buttons.map((button) => {
            if(button.default){
                return <Button key={button.title} primary xfull onPress={button.onPress}>
                    <Text style={!button.style?style.button:button.style}>{button.title}</Text>
                </Button>;
            }else{
                return <Button key={button.title} light full onPress={button.onPress}>
                    <Text style={!button.style?style.button:button.style}>{button.title}</Text>
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

const style = StyleSheet.create({
    button:{
        fontSize:16,
        height:25
    }
});