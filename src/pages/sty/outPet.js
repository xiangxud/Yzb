import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Form,Separator,Icon,Root,ListItem,Text,Toast} from 'native-base';
import {observer,inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'
import {ValidateInput,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../components/common/native-base-validate'

@inject('outPetStore')
export default class OutPet extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '出栏',
        headerRight: <View />
    });
    constructor(props){
        super(props);
    }

    buttons=[{title:'取消' , default:false, onPress:()=>{}},{title:'提交' , default:true, onPress:()=>{}}];
    render(){
        return (
            <Container style={{backgroundColor:'#ffffff'}}>
                <Content>
                    <Form>
                    </Form>
                </Content>
                <FootBar buttons={this.buttons}></FootBar>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    titleIco:{
        color:'#009688',
        paddingRight:5
    }
});