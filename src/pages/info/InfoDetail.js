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

    componentWillMount(){
        const {navigation,infoStore} = this.props;
        infoStore.onIni(navigation.state.params.code);
    }

    renderThumbUp(){
        const {infoStore} = this.props;

        if(infoStore.data.thumbUp){
            return <Icon name="star-o" size={25} color="#008AF5"></Icon>;
        }else{
            return <Icon name="star-o" size={25} color="#008AF5"></Icon>;
        }
    }



    renderView = () => {
        const {infoStore} = this.props;

        return (<View style={style.bottom}>
            <TextInput
                onFocus={() => infoStore.onShowModel()}
                underlineColorAndroid='transparent'
                placeholder='说说你的看法'
                returnKeyType="search"
                placeholderTextColor="#969696"
                style={style.textbox}>
            </TextInput>
            <View style={style.actions}>
                <TouchableOpacity onPress={()=>{}}>
                    <Icon name="commenting-o" size={25} color="#008AF5"></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                {
                    this.renderThumbUp()
                }
                </TouchableOpacity>
                <Icon name="share-square-o" size={25} color="#008AF5"></Icon>
                <TouchableOpacity style={style.label}>
                    <Text style={style.word}>{infoStore.data.comment_count}</Text>
                </TouchableOpacity>
            </View>
        </View>);
    };

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
                        <Button title="发布" disabled={!infoStore.data.allow_comment} onPress={() => infoStore.onPostComment(navigation.state.params.code)}></Button>
                    </View>
                </View>
            </Modal>);
    };

    render() {
        const {navigation,infoStore} = this.props;
        let r = 'https://m.ringpu.com/ringpu/html_php/advice_and_college/d.php?code=' + navigation.state.params.code;
        return (
            <View style={style.main}>
                <View style={style.vbc}>
                    <WebView source={{uri:r}}>
                    </WebView>
                </View>
                {
                    !infoStore.showModel ? this.renderView() : this.renderReply()
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