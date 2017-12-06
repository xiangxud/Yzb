import React, {Component} from 'react';
import
{
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch ,Toast } from 'native-base';
import {observer,inject} from 'mobx-react/native';
import AlarmClock from '../../components/sty/AlarmClock'

@inject('immStore')
@observer
export default class imm extends Component{

    componentWillMount(){
        const {immStore,navigation} = this.props;

        this.onLoadList();
    }

    constructor(props){
        super(props);
    }

    onLoadList() {
        const {immStore} = this.props;
        immStore.onLoad(()=>{}, (mess) => {
            Toast.show({
                type:'warning',
                text: mess,
                position: 'top'
            });
            this.autoClose();
        } )
    }

    autoClose( callback ){
        setTimeout(()=>{
            Toast.toastInstance._root.closeToast();
            if(callback){
                callback();
            }
        },800);
    }

    render(){
        const {immStore} = this.props;
        return (<Container>
            <Content>
                <List>
                    <ListItem itemDivider>
                        <Body>
                        <Text>今天需要执行的免疫</Text>
                        </Body>
                        <Right>
                            <Text>所有免疫</Text>
                        </Right>
                    </ListItem>
                    <AlarmClock onLoad={this.onLoadList.bind(this)} collection={immStore.collection}></AlarmClock>
                </List>
            </Content>
        </Container>);
    }
}