import React, {Component} from 'react';
import
{
    View,
    Text ,
    Button,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import {observer,inject} from 'mobx-react/native';
import StyBar from '../../components/sty/StyBar';
import Waring from '../../components/sty/Waring';
import ImmList from '../../components/sty/ImmList';
import Monitor from '../../components/sty/Monitor';

@inject('styStore')
@observer
export default class Sty extends Component{
    static navigationOptions = ({navigation})=>{header:(<StyBar iniCode={'008'}></StyBar>)};
    static navigationOptions = ({navigation})=> {
        return         {header:(<StyBar goBack={navigation.goBack}
                        navigate={navigation.navigate}
                        iniCode={navigation.state.params.code}
                        Title={navigation.state.params.title}
                        styList={navigation.state.params.list}
                        onMessPress={()=>{}}
                        onSettingPress={()=>{}}></StyBar>)
    }};

    componentWillMount(){
        const {styStore,navigation} = this.props;
        styStore.onIni(navigation.state.params.code);
    }

    constructor(props){
        super(props);
    }

    render(){
        const {styStore} = this.props;
        return (
            <ScrollView style={{flex:1}}>
                <View style={style.main}>
                    <Waring style={style.waring} waring={styStore.waring}>
                    </Waring>
                    <Monitor style={style.mon} monitor={styStore.moitor} backgroundColor="#615e61">
                    </Monitor>
                    <ImmList style={style.imm} title="免疫提醒" collection={styStore.immCollection}>
                    </ImmList>
                </View>
            </ScrollView>);
    }
}

const style = StyleSheet.create({
    tab : {
        height:60,
        flexDirection:'row',
        alignItems:'stretch'
    },
    main:{
        flex:1,
        alignItems:'stretch',
        backgroundColor:'#ffffff',
        paddingLeft:2,
        paddingRight:2
    },
    imm:{
        marginLeft :2,
        marginRight:2
    },
    waring:{
        marginLeft :5,
        marginRight:5
    },
    mon:{
        backgroundColor:'#f3f3f3'
    }
});