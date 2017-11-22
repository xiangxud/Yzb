import React, {Component} from 'react'
import {
    View,
    Text ,
    Button,
    TextInput,
    Modal,
    WebView,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {observer,inject} from 'mobx-react/native';
import {action,observable} from 'mobx';

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

    // 先禁用评论功能
    // componentDidMount(){
    //     const {navigation} = this.props;
    //     var url = "http://192.168.0.101/RP.Imm.WebUI/api/info/GetArticle";//urls.apis.CMS_GetArticle
    //     request.getJson(url,{ code: navigation.state.params.id }).then((res)=>{
    //         infoStore.getArticle(res);
    //     }).catch((err)=>{
    //         tools.showToast("网络请求失败，请检查网络设置");
    //     });
    // }

    renderView = () => {
        return (<View style={style.bottom}>
            <TextInput
                onFocus={infoStore.toogleModel}
                underlineColorAndroid='transparent'
                placeholder='说说你的看法'
                returnKeyType="search"
                placeholderTextColor="#969696"
                style={style.textbox}>
            </TextInput>
            <View style={style.actions}>
                <Icon name="commenting-o" size={25} color="#008AF5"></Icon>
                <Icon name="star-o" size={25} color="#008AF5"></Icon>
                <Icon name="share-square-o" size={25} color="#008AF5"></Icon>
                <View style={style.label}>
                    <Text style={style.word}>{infoStore.comment_text_total_count}</Text>
                </View>
            </View>
        </View>);
    };
    renderReply = () => {
        return (<Modal animationType={'none'} transparent={true} visible={true} onRequestClose={infoStore.toogleModel}>
                    <TouchableOpacity style={{flex:1}} onPress={infoStore.toogleModel}>
                        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
                            <View style={{ flex:2,alignItems:'stretch',flexDirection:'row'}}>
                            </View>
                            <View style={{ flex:2,alignItems:'stretch',flexDirection:'row',backgroundColor:'white'}}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='说说你的看法'
                                    returnKeyType="search"
                                    placeholderTextColor="#969696"
                                    onChange={infoStore.onChangText}
                                    numberOfLines={5}
                                    multiline={true}
                                    autoFocus={true}
                                    style={style.tb} />
                            </View>
                            <View style={{height:50 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'white'}}>
                                <View style={{width:200,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{}}>{infoStore.comment_input_count}</Text><Text style={{color:'red'}}>/{infoStore.comment_text_total_count}</Text>
                                </View>
                                <View style={{width:30}}></View>
                                <Button title="发布" disabled={!infoStore.allow_comment} onPress={infoStore.postComment}></Button>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>);
    };
    render() {
        const {navigation} = this.props;
        let r = 'https://m.ringpu.com/ringpu/html_php/advice_and_college/d.php?code=' + navigation.state.params.code;
        return (
            <View style={style.main}>
                <View style={style.vbc}>
                    <WebView source={{uri:r}}>
                    </WebView>
                </View>
                {
                    //!infoStore.showModel ? this.renderView() : this.renderReply()
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
            borderColor:'#ccc',
            width:165,
            height:36,
            borderWidth:1,
            borderRadius: 4,
            marginLeft:15
        },
        label : {
            position:'absolute',
            left:15,
            top:-3,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#008AF5',
            borderWidth:3,
            borderColor:'white',
            borderRadius:10,
            width:20,
            height:20
        },
        actions :{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between',
            marginLeft:15,
            marginRight:20
        },
        word:{
            fontSize:10,
            color:'white'
        }
});