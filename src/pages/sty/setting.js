import React, {Component} from 'react';
import
{
    View,
    Text ,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Container,Content,Root,List,ListItem,Right,Left,Button,Icon,Body,Toast } from 'native-base';
import {observer,inject} from 'mobx-react/native';
import cameraSettingStore from '../../store/cameraSettingStore';
import FootBar from '../../components/sty/FootBar'
import CList from '../../components/sty/CameraList';
import {observable} from "mobx";
import cameraEdit from "./camera/edit";

@observer
export default class setting extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: "设置",
        headerRight: <View />
    });
    componentDidMount(){
    }
    constructor(props){
        super(props);
        this.store.onIni([{
            Id:'C506ADF6-87AD-4C1B-8D46-2BF1ACAEC99C',
            Name:'东01东01东01东01东01东01东01'
        },{
            Id:'547FB556-B7E3-4EE6-9F98-7A1A2F312B88',
            Name:'东02'
        },{
            Id:'765B07F2-09CB-4B2F-9A86-C6AA5D2C379D',
            Name:'东03'
        },{
            Id:'307BF785-2658-4538-B202-5D4FB1CD8776',
            Name:'东04'
        },{
            Id:'0FDDF936-9F6B-4754-8E2A-05CEF2244847',
            Name:'东05'
        }],'C506ADF6-87AD-4C1B-8D46-2BF1ACAEC99C');
    }

    @observable
    store=new cameraSettingStore();

    autoClose( callback ){
        setTimeout(()=>{
            Toast.toastInstance._root.closeToast();
            if(callback){
                callback();
            }
        },800);
    }

    onAdd(){
        const {navigation} = this.props;
        const onNotice=(camera)=>{
            this.store.onPush(camera);
            Toast.show({
                type:'success',
                text: '增加成功',
                position: 'top'
            });
            this.autoClose();
        }
        navigation.navigate("CameraAdd",{ styId:navigation.state.params.code, styName : navigation.state.params.title,onNotice:onNotice.bind(this) });
    }
    onModify(camera){
        const {navigation} = this.props;

        alert(JSON.stringify(camera));

        const onNotice=(camera)=>{
            this.store.onUpdate(camera);
            Toast.show({
                type:'success',
                text: '编辑成功',
                position: 'top'
            });
            this.autoClose();
        }
        navigation.navigate("CameraEdit",{ camera:camera, styName : navigation.state.params.title,onNotice:onNotice.bind(this) });

    }
    render(){
        return (
                <Container>
                    <Content>
                        <ListItem itemDivider icon>
                            <Left>
                                <Text style={style.label}>摄像头</Text></Left>
                            <Body>
                            </Body>
                            <Right>
                                <TouchableOpacity style={style.headAction} onPress={this.onAdd.bind(this)}>
                                    <Icon name="md-add" style={style.headIco} />
                                    <Text style={style.label}>添加</Text>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                        <CList list={this.store.list} defaultId={this.store.defaultId} onChanged={this.store.onChangDefault.bind(this.store)} onModify={this.onModify.bind(this)}></CList>
                    </Content>
                </Container>
        );
    }
}

const style = StyleSheet.create({
    label:{
        textAlignVertical:'center',
        marginLeft:5,
        fontSize:18
    },
    headIco:{
        fontSize:18,
        color:'#27364e'
    },
    headAction:{
        flexDirection:'row'
    }
});