import React, {Component} from 'react';
import {
    View,
    Text ,
    Button,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { Container,Content } from 'native-base';
import {observer,inject} from 'mobx-react/native';
import StyBar from '../../components/sty/StyBar';
import Waring from '../../components/sty/Waring';
import ImmList from '../../components/sty/ImmList';
import Monitor from '../../components/sty/Monitor';

@inject('styStore')
@observer
export default class Sty extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>({
        headerTitle: navigation.state.params.title,
        headerRight: <StyBar
            onInPetPress={()=>{
                navigation.navigate("InPet",{
                    code:navigation.state.params.code,
                    title:navigation.state.params.title,
                    farm:navigation.state.params.farm})
            }}
            onOutPetPress={()=>{
                navigation.navigate("OutPet",{
                    code:navigation.state.params.code,
                    title:navigation.state.params.title,
                    farm:navigation.state.params.farm})}}

            onEditPress={()=>{
                navigation.navigate("EditSty",{
                    code:navigation.state.params.code,
                    title:navigation.state.params.title,
                    farm:navigation.state.params.farm})
            }}
            onSettingPress={()=>{
                navigation.navigate("StySetting",{
                    code:navigation.state.params.code,
                    title:navigation.state.params.title,
                    farm:navigation.state.params.farm})
            }} />
    });

    componentDidMount(){
        const {styStore,navigation} = this.props;
        styStore.onIni(navigation.state.params.code);
    }

    render(){
        const {styStore} = this.props;
        return (
            <Container>
                <Content>
                    <Waring waring={styStore.waring}/>
                    <Monitor monitor={styStore.moitor} backgroundColor="#615e61"/>
                    <ImmList title="免疫提醒" collection={styStore.immCollection}/>
                </Content>
            </Container>
        );
    }
}
