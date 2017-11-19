import React, {Component} from 'react'
import
{
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
import proxy from '../info/cmsProxy'

class Control {
    @observable
    Data = {
        Count:"5",
        ShowModel:false,
        Model:{
            Total:200,
            InputCount:0,
            Publish:false,
            Txt:''
        }
    };
}

@observer
export default class InfoDetail extends Component {
    constructor(props){
        super(props);

        proxy.getArticle(this.props.code,this.getArticle,this.onFailed);
    }
    static defaultProps = {
        control:new Control(),
        code:'6z3glfahK6BrRzhlmKHsgPUUQnJtG5Ay'
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: navigation.state.params.title,
        headerRight: <View></View>
    });

    @action
    getArticle = (o) => {
        this.props.control.Data.Count = o.hits > 9 ? '...' : o.hits.toString();
    };
    @action
    onFailed = (mess) => {
        tools.showToast(mess);
    };

    @action
    onPress = (e)=>{
        this.props.control.Data.ShowModel = true;
    };
    @action
    onClose = (e) => {
        this.props.control.Data.ShowModel = false;
    };
    @action
    onChangTxt = (e) =>{
        let txt = e.nativeEvent.text;
        this.props.control.Data.Model.InputCount=txt.length;
        this.props.control.Data.Model.Publish=txt.length > 0;
        this.props.control.Data.Model.Txt = txt;
    };
    @action
    onSubmit = (e) => {
    };
    renderView = () => {
        return (<View style={style.bottom}>
            <TextInput
                onFocus={this.onPress}
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
                    <Text style={style.word}>{this.props.control.Data.Count}</Text>
                </View>
            </View>
        </View>);
    };
    renderReply = () => {
        return (<Modal animationType={'none'} transparent={true} visible={true} onRequestClose={this.onClose}>
                    <TouchableOpacity style={{flex:1}} onPress={this.onClose}>
                        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
                            <View style={{ flex:2,alignItems:'stretch',flexDirection:'row'}}>
                            </View>
                            <View style={{ flex:2,alignItems:'stretch',flexDirection:'row',backgroundColor:'white'}}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='说说你的看法'
                                    returnKeyType="search"
                                    placeholderTextColor="#969696"
                                    onChange={this.onChangTxt}
                                    numberOfLines={5}
                                    multiline={true}
                                    autoFocus={true}
                                    style={style.tb} />
                            </View>
                            <View style={{height:50 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'white'}}>
                                <View style={{width:200,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{}}>{this.props.control.Data.Model.InputCount}</Text><Text style={{color:'red'}}>/{this.props.control.Data.Model.Total}</Text>
                                </View>
                                <View style={{width:30}}></View>
                                <Button title="发布" disabled={!this.props.control.Data.Model.Publish} onPress={this.onSubmit}></Button>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>);
    };
    render() {
        let r = 'https://m.ringpu.com/ringpu/html_php/advice_and_college/d.php?code=' + this.props.code;
        return (
            <View style={style.main}>
                <View style={style.vbc}>
                    <WebView source={{uri:r}}>
                    </WebView>
                </View>
                {
                    !this.props.control.Data.ShowModel ? this.renderView() : this.renderReply()
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