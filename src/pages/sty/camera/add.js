import React, {Component} from 'react';
import
{
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import { Container,Content,Form,ListItem,Text,Icon,Toast } from 'native-base';
import {observer,inject} from 'mobx-react/native';
import FootBar from '../../../components/sty/FootBar'
import {camera} from '../../../store/cameraSettingStore'

import {ValidateInput,ReadOnlyInput} from '../../../components/common/native-base-validate'

@observer
export default class add extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: "添加摄像头",
        headerRight: <View />
    });
    componentDidMount(){
    }

    camera = new camera();
    styName="";
    styId="";
    constructor(props){
        super(props);
        const {navigation} = this.props;
        this.styName=navigation.state.params.styName;
        this.styId=navigation.state.params.styId;
        this.camera.onUpdate({StyId:this.styId});
    }
    autoClose( callback ){
        setTimeout(()=>{
            Toast.toastInstance._root.closeToast();
            if(callback){
                callback();
            }
        },800);
    }
    onCommit(){
        const {navigation} = this.props;
        let mess = this.camera.onValidate();
        if(mess.length > 0){
            Toast.show({
                type:'warning',
                text: '数据项存在错误，请更正',
                position: 'top'
            });
            this.autoClose();
            return ;
        }
        this.camera.onCommit(()=>{
            if(navigation.state.params.onNotice){
                navigation.state.params.onNotice(this.camera);
            }
            navigation.goBack();
        });
    }
    onUpdateData(data){
        this.camera.onUpdate(data);
    }
    buttons=[{title:'取消' , default:false, onPress:()=>{
            const {navigation} = this.props;
            navigation.goBack();
        }},{title:'提交' , default:true, onPress:()=>{ this.onCommit()}}];
    render(){
        return (
            <Container style={{backgroundColor:'#ffffff'}}>
                <Content>
                    <Form>
                        <ListItem itemDivider>
                            <Icon style={style.titleIco} name="ios-book" active></Icon><Text>摄像头信息</Text>
                        </ListItem>
                        <ReadOnlyInput label="养殖场" value={this.styName} />
                        <ValidateInput label="摄像头名称" data={this.camera.data} name="Name" placeholder="请录入摄像头名称" IsValidate={this.camera.IsValidate} onChange={(e)=>{this.onUpdateData({Name:e})}} />
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