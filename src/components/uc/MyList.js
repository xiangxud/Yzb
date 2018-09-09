import React, {PureComponent} from "react";
import {Clipboard, Alert} from 'react-native'
import {SeparatorArea} from "../../components";

import {Body,List, Icon, Left, ListItem, Right, Text, View} from "native-base";

const Item = props => {
    return (
        <ListItem
            icon
            style={{backgroundColor:'#fff',marginLeft: 0,paddingLeft: 15}}
            onPress={props.goToPage ? props.goToPage : null}>
            <Left>
                <Icon name={props.icon} style={props.iconStyle}/>
            </Left>
            <Body style={props.bordered?{}:{borderBottomWidth: 0}}>
                <Text>{props.text}</Text>
            </Body>
            <Right style={props.bordered?{}:{borderBottomWidth: 0}}>
                <Text>{props.subtext? props.subtext: null}</Text>
                {
                    props.goToPage ?
                    <Icon name="ios-arrow-forward"/>
                    : null
                }
            </Right>
        </ListItem>
    );
}

export default class MyList extends PureComponent {
    goToPage = (page, params) => {
        const { navigation } = this.props;
        params = params ? params : {};
        navigation && navigation.navigate(page, params)
    }

    onCopy = (txt) => {
        Alert.alert(
            '注册邀请码说明',
            '将注册邀请码告知您的朋友，他们在注册养殖宝时填写该邀请码，你们将共享当前养殖场信息。',
            [
                {text: '点击复制邀请码', onPress: () => {
                    Clipboard.setString(`注册养殖宝时请填写邀请码【${txt}】，注册成功后将共享我的智能养殖数据`);
                    tools.showToast("复制成功");
                }},
            ],
            { cancelable: true }
        )
    };

    renderCollectionItem(){
        let count=1;
        if(count > 0){
            return <Item icon="ios-bookmark" iconStyle={{color:'#ccc'}} goToPage={()=>this.goToPage('MyCollection')} text="我的收藏"/>
        }else{
            return <Item icon="ios-bookmark" iconStyle={{color:'#ccc'}} subtext={'暂无收藏'} text="我的收藏"/>
        }
    }
    render() {
        const {user} = this.props;

        let t = `邀请码：${user.invitationCode}`;

        return (
            <List style={{backgroundColor:'#E3E7F3'}}>
                <Item icon="ios-contact" iconStyle={{color:'red'}} goToPage={()=>this.goToPage('MyInfo')} text="个人资料" bordered/>
                <Item icon="ios-ribbon" iconStyle={{color:'#ccb500'}} goToPage={()=>this.goToPage('ScoreRecord')} text="我的积分" subtext={user.score && user.score !== 0 ? user.score : '0'}/>
                <SeparatorArea style={{height: 15}}/>
                {
                    this.renderCollectionItem()
                }
                <SeparatorArea style={{height: 15}}/>
                <Item icon="ios-planet" iconStyle={{color:'#00859c'}} goToPage={()=>this.goToPage('About')} text="关于养殖宝"/>

                <SeparatorArea style={{height:15}}>
                </SeparatorArea>
                <Item icon="ios-link" iconStyle={{color:'#cc1e4c'}} goToPage={()=>this.onCopy(user.invitationCode)} text={t} subtext={'复制邀请码'} />
            </List>
        )
    }
}