import React, {Component} from 'react'
import {
    View,
    TextInput,
    Modal,
    WebView,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon, Button, Text} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import {action, observable} from 'mobx';
//import *as wechat from 'react-native-wechat'
import tools from "../../common/tools";

@inject('infoStore')
@observer
export default class InfoDetail extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.title,
        headerRight: <View></View>
    });

    componentWillMount() {
        const {navigation} = this.props;
        infoStore.onLoad(navigation.state.params.code);
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
    onShareWechat() {

    };

    onShareFriends() {

    };

    renderView = () => {
        const {navigation} = this.props;
        return (<View style={style.bottomOperate}>
            <TouchableOpacity onPress={() => infoStore.openComment()} style={style.replyBtn}>
                <Icon name="ios-create" style={style.iconStyle}></Icon>
                <Text style={{marginLeft: 5,}}>说说你的看法</Text>
            </TouchableOpacity>
            <View style={style.actionsBox}>
                <TouchableOpacity onPress={() => {
                }}>
                    <Icon name="ios-text-outline" style={style.iconStyle}></Icon>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => infoStore.onCollect()}>
                    <Icon name={infoStore.article.collected ? 'ios-star' : 'ios-star-outline'}
                          style={style.iconStyle}></Icon>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    infoStore.openShare()
                }}>
                    <Icon name="ios-repeat" style={style.iconStyle}></Icon>
                </TouchableOpacity>

                <TouchableOpacity style={style.label}>
                    <Text style={style.word}>{infoStore.article.comments}</Text>
                </TouchableOpacity>
            </View>
        </View>);
    };

    renderModal = () => {
        const {isLoading, showCommentForm, comment_content} = infoStore;
        if (isLoading) {
            return <ActivityIndicator color={'#15856e'}></ActivityIndicator>;
        }
        return (
            <View>
                <Modal animationType={'none'} transparent={true} visible={infoStore.showShareModal}
                       onRequestClose={() => infoStore.closeModal()}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 5}}>
                        <TouchableOpacity style={{flex: 1, alignItems: 'stretch', flexDirection: 'row'}}
                                          onPress={() => infoStore.closeModal()}>
                            <View style={{flex: 1, alignItems: 'stretch', flexDirection: 'row'}}></View>
                        </TouchableOpacity>
                        <View style={style.shareIcons}>
                            <TouchableOpacity onPress={this.onShareWechat.bind(this)} disabled
                                              style={{alignItems: 'center', marginLeft: 10}}>
                                <Icon type={'FontAwesome'} name="wechat" style={{fontSize: 30, color: '#2ba246'}}></Icon>
                                <Text>微信</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onShareFriends.bind(this)} disabled
                                              style={{alignItems: 'center', marginLeft: 10}}>
                                <Icon type={'FontAwesome'} name="chrome" style={{fontSize: 30, color: '#2ba246'}}></Icon>
                                <Text>朋友圈</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal animationType={'none'} transparent={true} visible={showCommentForm}
                       onRequestClose={() => infoStore.closeModal()}>
                        <TouchableOpacity style={{flex: 1, alignItems: 'stretch', flexDirection: 'row'}}
                                          onPress={() => infoStore.closeModal()}>
                            <View style={{flex: 1, alignItems: 'stretch', flexDirection: 'row'}}></View>
                        </TouchableOpacity>
                        <View style={{height:100, alignItems: 'stretch', flexDirection: 'row', backgroundColor: 'white'}}>
                            <TextInput
                                value={comment_content}
                                underlineColorAndroid='transparent'
                                placeholder='请发表文明言论'
                                returnKeyType="search"
                                placeholderTextColor="#969696"
                                onChangeText={(txt) => infoStore.onChangText(txt)}
                                numberOfLines={.3}
                                multiline={true}
                                autoFocus={true}
                                style={style.replyInput}/>
                        </View>
                        <View style={style.commentBtn}>
                            <Button rounded style={{marginRight:15}} small bordered info onPress={() => { infoStore.closeModal() }}><Text>取消</Text></Button>
                            <Button rounded small bordered success onPress={() => { infoStore.onPostComment() }}><Text>发布</Text></Button>
                    </View>
                </Modal>
            </View>);
    };

    render() {
        const {navigation, infoStore} = this.props;
        //'https://m.ringpu.com/ringpu/html_php/advice_and_college/d.php?code=' + navigation.state.params.code;
        let url = urls.webPath + 'yzb/app/infoView/' + navigation.state.params.code;
        return (
            <View style={style.container}>
                <View style={style.container}>
                    <WebView source={{uri: url}}></WebView>
                </View>
                {this.renderView()}
                {this.renderModal()}
            </View>
        );
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomOperate: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc'
    },
    replyBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginLeft: 10,
        paddingBottom: 3,
        paddingTop: 3,
        flex: 1,
    },

    replyInput: {
        borderColor: '#ccc',
        flex: 1,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderRadius: 4,
        margin:10,
    },
    commentBtn:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        paddingRight:10,
        paddingBottom:10,
    },
    shareIcons:{
        height: 100,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    actionsBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 40,
        marginRight: 20,
    },
    label: {
        position: 'absolute',
        left: 15,
        top: -3,
        minWidth: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#008AF5',
        paddingLeft: 2,
        paddingRight: 2,
        zIndex: 2000
    },
    word: {
        fontSize: 12,
        color: 'white'
    },
    iconStyle: {fontSize: 26, color: '#008AF5'},
});