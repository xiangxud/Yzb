import React, {Component} from 'react'
import {
    View,
    Text ,
    Button,
    TextInput,
    Modal,
    WebView,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer,inject} from 'mobx-react/native';
import {action,observable} from 'mobx';
//import *as wechat from 'react-native-wechat'
import tools from "../../common/tools";

@inject('infoStore')
@observer
export default class InfoDetail extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>({
        headerTitle: navigation.state.params.title,
        headerRight: <View></View>
    });
    componentWillMount(){
        const {navigation,infoStore} = this.props;
        infoStore.onIni(navigation.state.params.code);
    }
    onShare(){
        const {navigation,infoStore} = this.props;
        infoStore.onShowShare();
    }
    /*
    onCheckWechatInstall(rollback){
        wechat.isWXAppInstalled().then(isInstalled=>{
            if(isInstalled){
                wechat.openWXApp().then(()=>{
                    rollback();
                });
            }else {
                tools.showToast( "没有安装微信软件，请您安装微信之后再试");
            }
        })
    }
    onShareFriends(){
        this.onCheckWechatInstall(()=>{
            const {navigation,infoStore} = this.props;
            let title = navigation.state.params.title;
            let r = 'https://m.ringpu.com/ringpu/html_php/advice_and_college/d.php?code=' + navigation.state.params.code;
            wechat.shareToTimeline({
                type: 'news',
                title: title,
                description: 'share web image to time line',
                mediaTagName: 'email signature',
                messageAction: undefined,
                messageExt: undefined,
                webpageUrl: r
            }).then((success)=>{
                infoStore.onCloseShare();
            }).catch((error)=>{
                tools.showToast("分享失败");
            })
        });
    }
    onShareWechat(){
        this.onCheckWechatInstall(()=>{
            const {navigation,infoStore} = this.props;
            let title = navigation.state.params.title;
            let r = 'https://m.ringpu.com/ringpu/html_php/advice_and_college/d.php?code=' + navigation.state.params.code;

            wechat.shareToSession({
                title:title,
                description: '分享自:养殖宝文章',
                thumbImage: 'https://mmbiz.qlogo.cn/mmbiz_png/ozr76xD72K8iauZ3SuXgyJrc3KdvWuXVLInH2MticV7ONic6qavUwI3zMFEPibuDkndTd3amBJXOeu6EfoOKaklqKg/0?wx_fmt=png',
                type: 'news',
                webpageUrl: r
            }).then(success=>{
                infoStore.onCloseShare();
            }).catch((error) => {
                tools.showToast("分享失败");
            });
        });
    }*/
    onShareWechat(){

    };
    onShareFriends(){

    };

    renderCollection(){
        const {navigation,infoStore} = this.props;
        if(infoStore.data.exist_collection){
            return <TouchableOpacity onPress={()=>{ infoStore.onCancleCollect(navigation.state.params.code) }}>
                <Icon name="star" size={25} color="#008AF5"></Icon>
            </TouchableOpacity>;
        }else{
            return <TouchableOpacity onPress={()=>{infoStore.onCollect(navigation.state.params.code)}}>
                <Icon name="star-o" size={25} color="#008AF5"></Icon>
            </TouchableOpacity>;
        }
    }
    renderCommentButton(){
        const {infoStore} = this.props;
        if( infoStore.data.exist_comment ){
            return null;
        }else{
            return <TouchableOpacity onPress={() => infoStore.onShowModel()} style={{ flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:10,width:160}}>
                <Icon name="edit" size={25} color="#008AF5"></Icon>
                <Text style={style.textbox}>说说你的看法</Text>
            </TouchableOpacity>;
        }
    }
    renderView = () => {
        const {infoStore} = this.props;
        return (<View style={style.bottom}>
            {
                this.renderCommentButton()
            }
            <View style={style.actions}>
                <TouchableOpacity onPress={()=>{}}>
                    <Icon name="commenting-o" size={25} color="#008AF5"></Icon>
                </TouchableOpacity>
                {
                    this.renderCollection()
                }
                <TouchableOpacity onPress={()=>{ this.onShare() }}>
                    <Icon name="share-square-o" size={25} color="#008AF5"></Icon>
                </TouchableOpacity>

                <TouchableOpacity style={style.label}>
                    <Text style={style.word}>{infoStore.data.comment_count}</Text>
                </TouchableOpacity>
            </View>
        </View>);
    };


    renderShare=()=>{
        const {navigation,infoStore} = this.props;
        return(<Modal animationType={'none'} transparent={true} visible={true} onRequestClose={()=>infoStore.onCloseShare()}>
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',paddingTop:5}}>
                <TouchableOpacity style={{ flex:1,alignItems:'stretch',flexDirection:'row'}} onPress={()=>infoStore.onCloseShare()}>
                    <View style={{ flex:1,alignItems:'stretch',flexDirection:'row'}}>
                    </View>
                </TouchableOpacity>
                <View style={{ height:100,alignItems:'center', justifyContent:'flex-start' , flexDirection:'row',backgroundColor:'white'}}>
                    <TouchableOpacity onPress={this.onShareWechat.bind(this)} style={{alignItems:'center', marginLeft:10}}>
                        <Icon name="wechat" style={{ fontSize:30 , color:'#2ba246' }}></Icon>
                        <Text>微信</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onShareFriends.bind(this)} style={{alignItems:'center', marginLeft:10 }}>
                        <Icon name="chrome" style={{ fontSize:30 , color:'#2ba246' }}></Icon>
                        <Text>朋友圈</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>);
    }

    renderReply = () => {
        const {navigation,infoStore} = this.props;
        return (
            <Modal animationType={'none'} transparent={true} visible={true} onRequestClose={()=>infoStore.onCloseModel()}>
                <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',paddingTop:5}}>
                    <TouchableOpacity style={{ flex:2,alignItems:'stretch',flexDirection:'row'}} onPress={()=>infoStore.onCloseModel()}>
                        <View style={{ flex:1,alignItems:'stretch',flexDirection:'row'}}>

                        </View>
                    </TouchableOpacity>
                    <View style={{ flex:2,alignItems:'stretch',flexDirection:'row',backgroundColor:'white'}}>
                        <TextInput
                            value={infoStore.data.comment_content}
                            underlineColorAndroid='transparent'
                            placeholder='说说你的看法'
                            returnKeyType="search"
                            placeholderTextColor="#969696"
                            onChangeText={txt => {
                                infoStore.onChangText(txt)
                            }}
                            numberOfLines={5}
                            multiline={true}
                            autoFocus={true}
                            style={style.tb} />
                    </View>
                    <View style={{height:50 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'white'}}>
                        <View style={{width:200,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{}}>{infoStore.data.comment_input_count}</Text><Text style={{color:'red'}}>/{infoStore.data.comment_text_total_count}</Text>
                        </View>
                        <View style={{width:30}}></View>
                        <Button title=" 取 消 "
                                onPress={()=>{ infoStore.onCloseModel() }}></Button>
                        <Button title=" 发 布 "
                                disabled={!infoStore.data.allow_comment}
                                onPress={() => infoStore.onPostComment(navigation.state.params.code)}
                                style={{width:80}}></Button>
                    </View>
                </View>
            </Modal>);
    };

    renderBottom(){
        const {navigation, infoStore} = this.props;
        if(infoStore.data.ready){
            if(infoStore.data.showMode){
                return this.renderReply();
            }
            if(infoStore.data.showShareModel){
                return this.renderShare();
            }
            return this.renderView();
        }else{
            return <ActivityIndicator color={'#15856e'}></ActivityIndicator>;
        }
    }

    render() {
        const {navigation, infoStore} = this.props;
        let r = 'https://m.ringpu.com/ringpu/html_php/advice_and_college/d.php?code=' + navigation.state.params.code;
        return (
            <View style={style.main}>
                <View style={style.vbc}>
                    <WebView source={{uri:r}}>
                    </WebView>
                </View>
                {
                    this.renderBottom()
                }
            </View>
        );
    }
}
 const style = StyleSheet.create({
        main:{
            flex:1
        },
        vbc:{
            flex:1
        },

     reply :{
         height : 180,
         alignItems:'stretch',
         justifyContent:'center',
         backgroundColor:'white'
     },

     tb :{
         borderColor:'#ccc',
         flex:1,
         textAlignVertical:'top',
         borderWidth:1,
         borderRadius: 4,
         marginTop:2,
         marginLeft:15,
         marginRight:15
     },
        bottom:{
            height:50,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            backgroundColor:'white'
        },
        textbox:{
            marginLeft:5,
        },
        label : {
            position:'absolute',
            left:15,
            top:-3,
            minWidth:20,
            height:20,
            borderWidth:1,
            borderColor:'white',
            borderRadius:5,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#008AF5',
            paddingLeft:2,
            paddingRight:2,
            zIndex:2000
        },
        actions :{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between',
            marginLeft:15,
            marginRight:20
        },
        word:{
            fontSize:12,
            color:'white'
        }
});