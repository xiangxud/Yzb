import React, {Component} from 'react';
import {StyleSheet,DatePickerAndroid} from 'react-native';
import { Container, Header, Content, Form,Item, Input,List,ListItem,Text,Separator,Icon,Label,ActionSheet,Root} from 'native-base';
import {observer,inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'

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
                addStyStore.onChangedSty({genus:genus[index]});
            }
        )
    }
    async showDatePicker(){
        const {addStyStore} = this.props;
        try {
            const {action, year, month, day}=await DatePickerAndroid.open({
                date:
                    (!addStyStore.sty.addDate ||
                    addStyStore.sty.addDate==null ||
                    addStyStore.sty.addDate == "") ? new Date() : new Date(addStyStore.sty.addDate)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                addStyStore.onChangedSty({ addDate : year + "-" + (month+1).toString() + '-' + day });
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    componentWillMount(){
        const {addStyStore,navigation} = this.props;
        addStyStore.onIni(navigation.state.params.farm);

        this.buttons.push({
            title:'下一步' ,
            onPress:this.next.bind(this)
        });
    }
    buttons=[];
    next(){
        alert('1');
    }
    onUpdateData(u){
        const {addStyStore} = this.props;
        addStyStore.onChangedSty(u);
    }
    render(){
        const {addStyStore} = this.props;
        return (
            <Root>
            <Container style={{backgroundColor:'#ffffff'}}>
                <Content>
                    <ListItem itemDivider>
                        <Icon style={style.titleIco} name="ios-book" active></Icon><Text>第1步.添加一个栋舍</Text>
                    </ListItem>
                    <Item fixedLabel style={style.rightPadding}>
                        <Label>养殖场</Label>
                        <Input placeholderTextColor='#b1b1b1' editable={false} defaultValue={addStyStore.farm.Name} />
                    </Item>
                    <Item fixedLabel style={style.rightPadding}>
                        <Label>栋舍栏位</Label>
                        <Input placeholder='请输入栋舍栏位' value={addStyStore.sty.name} onChangeText={(e)=>{this.onUpdateData({name:e})}} placeholderTextColor='#b1b1b1' />
                    </Item>
                    <Item onPress={this.showActionSheet.bind(this)} fixedLabel last>
                            <Label>种属</Label>
                            <Input editable={false} value={addStyStore.sty.genus} placeholder='请选择' placeholderTextColor='#b1b1b1' />
                            <Icon style={style.ico} active name="ios-arrow-forward" />
                    </Item>
                    <Item fixedLabel style={style.rightPadding}>
                        <Label>当前日龄</Label>
                        <Input placeholderTextColor='#b1b1b1' placeholder='如 20' value={addStyStore.sty.day}  onChangeText={(e)=>{this.onUpdateData({day:e})}} />
                    </Item>

                    <Item fixedLabel style={style.rightPadding}>
                        <Label>入栏批次</Label>
                        <Input placeholderTextColor='#b1b1b1' placeholder='动物批次' value={addStyStore.sty.batchNumber} onChangeText={(e)=>{this.onUpdateData({batchNumber:e})}} />
                    </Item>

                    <Item fixedLabel style={style.rightPadding}>
                        <Label>进栏数量</Label>
                        <Input placeholderTextColor='#b1b1b1' placeholder='进栏数量' value={addStyStore.sty.number} onChangeText={(e)=>{this.onUpdateData({number:e})}} />
                    </Item>
                    <Item fixedLabel style={style.rightPadding} onPress={this.showDatePicker.bind(this)}>
                        <Label>进栏日期</Label>
                        <Input placeholderTextColor='#b1b1b1' editable={false} placeholder='进栏日期' value={addStyStore.sty.addDate} />
                    </Item>
                </Content>
                <FootBar buttons={this.buttons}></FootBar>
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
    }
});