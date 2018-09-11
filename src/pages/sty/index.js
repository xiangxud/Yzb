import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity, DeviceEventEmitter
} from 'react-native';
import {Container, Content, Text} from 'native-base';
import Modal from 'react-native-modalbox';
import {observer, inject} from 'mobx-react/native';
import StyBar from '../../components/sty/StyBar';
import Waring from '../../components/sty/Waring';
import ImmList from '../../components/sty/ImmList';
import Monitor from '../../components/sty/Monitor';
import SensorView from '../../components/sty/SensorView';

@inject('styStore')
@observer
export default class Sty extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerRight: <StyBar
            onInPetPress={() => {
                navigation.navigate("InPet", {
                    code: navigation.state.params.id,
                    title: navigation.state.params.title,
                    farm: navigation.state.params.farm
                })
            }}
            onOutPetPress={() => {
                navigation.navigate("OutPet", {
                    code: navigation.state.params.id,
                    title: navigation.state.params.title,
                    farm: navigation.state.params.farm
                })
            }}

            onEditPress={() => {
                navigation.navigate("EditSty", {
                    code: navigation.state.params.id,
                    title: navigation.state.params.title,
                    farm: navigation.state.params.farm
                })
            }}
        />
    });

    switchCamera = (c) => {
        styStore.switchCamera(c);
        this.refs.modal_choose_monitor.close();
    }
    onPlay = (url) => {
        this.props.navigation.navigate("VodPlay", {url: url});
    }
    openSwitch = () => {
        this.refs.modal_choose_monitor.open()
    }

    componentDidMount() {
        (async () => {
            const {styStore, navigation} = this.props;
            styStore.onIni(navigation.state.params.id);
        })();
    }

    componentWillUnmount() {
    }

    render() {
        const {waring, monitor, immCollection, environmental} = this.props.styStore;
        return (
            <Container>
                <Content>
                    <Waring waring={waring}/>
                    <Monitor monitor={monitor} switchVideo={this.openSwitch} onPlay={this.onPlay}/>
                    <SensorView data={environmental.data.recent} onItemPress={() => {}}/>
                    <ImmList title="免疫提醒" collection={immCollection} top={5}
                             onMore={() => this.props.navigation.navigate("ImmTab", {})}/>
                </Content>
                <Modal
                    ref={"modal_choose_monitor"}
                    position={"center"}
                    style={styles.modal}
                    onClosed={() => {
                    }}>
                    <ScrollView style={{flex: 1}}>
                        {
                            monitor.cameras.map((camera, i) => (
                                <TouchableOpacity key={i} onPress={() => this.switchCamera(camera)}>
                                    <View
                                        style={[styles.item, monitor.current && monitor.current.Name === camera.Name ? styles.current : null]}>
                                        <Text>{camera.Name}</Text>
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
    modal: {
        width: 300,
        height: 200,
    },
    item: {
        padding: 15,
        margin: .5,
        width: 300,
        backgroundColor: '#d6d6d6',
    },
    current: {
        backgroundColor: '#009d7b'
    }
})