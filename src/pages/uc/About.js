import React, {PureComponent} from "react";
import {
    Image
} from 'react-native';
import {Body, Icon, Left, ListItem, Right, Text, View} from "native-base";
import {SeparatorArea} from "../../components";

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
                <Text>{props.subtext?props.subtext: null}</Text>
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
    checkUpdate = () => {
        alert('已经是最新版本');
    }
    render() {
        return (
            <View style={{backgroundColor:'#E3E7F3'}}>
                <View style={{margin:30, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../resource/logo_1.png')} style={{width:80, height:80,}}/>
                    <Text style={{marginTop:10,}}>养殖宝</Text>
                </View>
                <Item bordered icon="ios-information-circle" iconStyle={{color:'#00859c'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about', title:'关于养殖宝'})} text="关于我们"/>
                <Item bordered icon="ios-compass" iconStyle={{color:'#00d487'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about/contact', title:'联系养殖宝'})} text="联系我们"/>
                <Item icon="ios-checkmark-circle" iconStyle={{color:'orange'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about/protocol', title:'用户协议'})} text="用户协议"/>
                <SeparatorArea style={{height: 15}}/>
                <Item icon="ios-cloud-download" iconStyle={{color:'#777'}} goToPage={()=>this.checkUpdate()} text="检查更新" subtext='V2.1' bordered/>
            </View>
        )
    }
}