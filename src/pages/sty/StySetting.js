import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import CameraList from '../../components/sty/CameraList';

@inject('styStore', 'cameraStore')
@observer
export default class setting extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: "栋舍监视器",
        headerRight: <Button transparent
                             light
                             onPress={()=>navigation.navigate('CameraAdd', {
                                 styId: navigation.state.params.styId,
                                 styName: navigation.state.params.styName
                             })}>
                            <Text>添加</Text>
                    </Button>
    });

    componentDidMount() {
        let {cameraStore, styStore} = this.props;

        cameraStore.onInit(styStore.monitor.cameras, styStore.defaultCamera, styStore.code);

        this.subscription = DeviceEventEmitter.addListener("noticeChangedCamera", (events) => {
            if (events.key === "eventAddCamera") {
                cameraStore.onPush(events.source); //摄像头增加
            } else if (events.key === "eventEditCamera") {
                cameraStore.onUpdate(events.source); //摄像头编辑
            }
        });
    }

    componentWillUnmount() {
        this.subscription && this.subscription.remove();
    }

    render() {
        const {cameraStore, styStore, navigation} = this.props;
        return (
            <Container>
                <Content gray>
                    <CameraList list={cameraStore.list}
                                defaultId={cameraStore.defaultId}
                                onChanged={(id) => cameraStore.onChangDefault(id, styStore.code)}
                                onModify={(item) => navigation.navigate('CameraEdit', {
                                    styName: styStore.title,
                                    camera: item
                                })}
                                onRemove={(id) => cameraStore.onRemove(id)}/>
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    label: {
        textAlignVertical: 'center',
        marginLeft: 5,
        fontSize: 18
    },
    headIco: {
        fontSize: 18,
        color: '#27364e'
    },
    headAction: {
        flexDirection: 'row'
    }
});