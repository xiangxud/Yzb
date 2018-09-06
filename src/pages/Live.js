import React, {Component} from 'react';
import {
    View,
    Image,
    FlatList,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

import {Button, Icon, Text} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import {Container, Content, TitleBar, MaskLoading} from "../components";
import LiveItem from '../components/live/LiveItem';

const screenW = Dimensions.get('window').width;

@inject('liveStore')
@observer
export default class Live extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        headerLeft: <View />,
        headerTitle: '直播间',
        headerRight: <Button transparent light onPress={()=>navigation.navigate('LiveSearch')}><Icon name={'md-search'} style={styles.searchIcon} /></Button>
    });

    componentDidMount() {
        liveStore.load();
    }

    renderListHeader = () => {
        const { focus_live } = liveStore;
        return (
            <View>
                {
                    focus_live && focus_live.faceurl ?
                    <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Web', {title: focus_live.title, url: focus_live.url})}>
                        <Image source={{uri: focus_live.faceurl}} style={styles.topBanner}/>
                    </TouchableWithoutFeedback>
                    :
                    <View style={[styles.topBanner, {}]}>
                        <Text>暂无最新直播</Text>
                    </View>
                }
                <TitleBar icon={'history'}
                          iconColor={'gray'}
                          title={'往期回顾'}
                          showMore={false}/>

                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('VodPlay', {url: 'rtmp://49.4.93.97/live/video2'})}>
                   <Text>开始播放</Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    render() {
        const {navigation} = this.props;
        const {list1, isFetching1} = liveStore;
        return (<Container>
            <Content gray>
                <MaskLoading show={isFetching1}/>
                <FlatList
                    data={list1.slice()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => <LiveItem v={item} index={index.toString()} navigation={navigation}/>}
                    ListHeaderComponent={this.renderListHeader()}
                    ListFooterComponent={
                        <Button full light onPress={() => liveStore.fetchMore1(true)}><Text>获取更多</Text></Button>
                    }
                    numColumns={2}
                    onRefresh={() => {
                        liveStore.fetchMore1()
                    }}
                    refreshing={isFetching1}
                />
            </Content>
        </Container>);
    }
}

const styles = StyleSheet.create({
    searchIcon:{
        color: 'white',
    },
    topBanner: {
        width: screenW,
        height: screenW * 4 / 9,
        justifyContent: 'center',
        alignItems:'center',
    },
})