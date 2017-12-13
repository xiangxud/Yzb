import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Container, Content, Text } from 'native-base';
import Modal from 'react-native-modalbox';
import {observer,inject} from 'mobx-react/native';
import StyBar from '../../components/sty/StyBar';
import Waring from '../../components/sty/Waring';
import ImmList from '../../components/sty/ImmList';
import Monitor from '../../components/sty/Monitor';
import EnvironmentMonitor from '../../components/sty/EnvironmentMonitor';

@inject('styStore')
@observer
export default class Sty extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = ({navigation})=>({
        title: navigation.state.params.title,
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

    switchCamera = (c) =>{
        styStore.switchCamera(c);
        this.refs.modal_choose_monitor.close();
    }

    componentDidMount(){
        const {styStore, navigation} = this.props;

        alert(navigation.state.params.title);

        styStore.onIni(navigation.state.params.code);
    }

    render(){
        const {waring, monitor, immCollection, environmental} = this.props.styStore;
        return (
            <Container>
                <Content>
                    <Waring waring={waring}/>
                    <Monitor monitor={monitor} switchVideo={()=>{this.refs.modal_choose_monitor.open();}}/>
                    <EnvironmentMonitor data={environmental} />
                    <ImmList title="免疫提醒" collection={immCollection} onMore={()=>this.props.navigation.navigate("ImmTab",{})} />
                </Content>
                <Modal
                    ref={"modal_choose_monitor"}
                    position={"center"}
                    style={styles.modal}
                    onClosed={()=>{}}>
                    <ScrollView style={{flex:1}}>
                        {
                            monitor.cameras.map((camera, i)=>(
                                <TouchableOpacity key={i} onPress={()=>this.switchCamera(camera)}>
                                    <View style={[styles.item, camera.name===monitor.current.name?styles.current:null]}>
                                        <Text>{camera.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </Modal>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    modal:{
        width:300,
        height:200,
    },
    item:{
        padding:15,
        margin:.5,
        width:300,
        backgroundColor:'#d6d6d6',
    },
    current:{
        backgroundColor:'#e69d63'
    }
})