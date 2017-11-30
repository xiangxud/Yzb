/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    StyleSheet
} from 'react-native'
import {Container, Content, Footer, FooterTab, Button,Text} from 'native-base';
import {observer, inject} from 'mobx-react/native';

@observer
export default class FootBar extends Component {
    constructor(props){
        super(props);
    }

    static defaultProps = {
        buttons:[{ title:'提交' , onPress:()=>{}}]
    };


    renderButtons() {
        list=[];
        return this.props.buttons.map((button) => {
            return <Button key={button.title} full onPress={button.onPress}>
                <Text style={!button.style?style.button:button.style}>{button.title}</Text>
            </Button>;
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
        fontSize:20,
        color:'#ffffff',
        height:25
    }
});