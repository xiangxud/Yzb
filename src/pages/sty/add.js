import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Form,Item, Input,List,ListItem,Text,Separator,Icon,Label,ActionSheet,Root} from 'native-base';
import {observer,inject} from 'mobx-react/native';


var BUTTONS = [
    { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
    { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
    { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
    { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;


@inject('addStyStore')
@observer
export default class Add extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '添加栋舍',
    });
    constructor(props){
        super(props);
    }


    showActionSheet(){
        const {addStyStore} = this.props;
        let genus = [];
        addStyStore.genus.forEach((o)=>{
            genus.push(o.Code);
        });
        ActionSheet.show(
            {
                options: genus,
                title: "请选择种属"
            },
            (index) => {
                addStyStore.onChangedGenus(genus[index]);
            }
        )
    }

    componentWillMount(){
        const {addStyStore,navigation} = this.props;
        addStyStore.onIni(navigation.state.params.farm);
    }

    render(){
        const {addStyStore} = this.props;

        return (
            <Root>
            <Container style={{backgroundColor:'#ffffff'}}>
                <Form>
                    <ListItem itemDivider>
                        <Icon style={style.titleIco} name="ios-book" active></Icon><Text>第1步.添加一个栋舍</Text>
                    </ListItem>
                    <Item fixedLabel style={style.rightPadding}>
                        <Label>养殖场</Label>
                        <Input placeholderTextColor='#b1b1b1' editable={false} defaultValue={addStyStore.farm.Name} />
                    </Item>
                    <Item fixedLabel style={style.rightPadding}>
                        <Label>栋舍栏位</Label>
                        <Input placeholder='请输入栋舍栏位' value={addStyStore.sty.name} onChangeText={addStyStore.onChangedName.bind(addStyStore)}  placeholderTextColor='#b1b1b1' />
                    </Item>
                    <Item onPress={this.showActionSheet.bind(this)} fixedLabel last>
                            <Label>种属</Label>
                            <Input editable={false} value={addStyStore.sty.genus} placeholder='请选择' placeholderTextColor='#b1b1b1' />
                            <Icon style={style.ico} active name="ios-arrow-forward" />
                    </Item>
                    <Separator bordered>
                        <Text>MIDFIELD</Text>
                    </Separator>
                </Form>
            </Container>
            </Root>
        );
    }
}

const style = StyleSheet.create({
    rightPadding:{
        paddingRight:18
    },
    ico:{
        width:18,
        color:'#b1b1b1'
    },
    titleIco:{
        color:'#009688',
        paddingRight:5
    },

});