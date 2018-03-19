import React, {Component} from 'react';
import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import {Button, Icon, Segment, Text} from 'native-base';
import {Container, Content, MaskLoading} from "../components";
import {observer, inject} from 'mobx-react/native';

var Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
//
const Video = observer(({v, index, navigation}) => {
    return <TouchableOpacity onPress={()=> navigation.navigate('Web', {title: v.Title, url:v.Url})} key={index}>
        <View style={styles.item}>
            <View style={styles.innerView}>
                <Image source={{uri: v.FaceUrl}} style={styles.face}/>
                <Icon name={'logo-youtube'} style={{position:'absolute', fontSize:40, color:'#fff'}} />
                <Text style={styles.sub}>{v.Duration}</Text>
            </View>
            <Text style={styles.title}>{v.Title}</Text>
        </View>
    </TouchableOpacity>;
});

@inject('liveStore')
@observer
export default class Live extends Component{
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '直播间',
    });
    componentDidMount(){
        liveStore.load();
    }
    //<Image source={{uri: v.photo}} style={styles.iconStyle}/>
    renderListHeader =(current)=> {
        return (
            <View>
                <Image source={{uri: 'https://m.ringpu.com/ringpu/public/images/live/live-bigimg-20171201.jpg'}} style={styles.topBanner}/>
                <Segment style={{backgroundColor:'#1fa8ec', marginTop:10}}>
                    <Button first active={current===true} onPress={()=>liveStore.switch()}>
                        <Text>家禽</Text>
                    </Button>
                    <Button last active={current===false} onPress={()=>liveStore.switch()}>
                        <Text>家畜</Text>
                    </Button>
                </Segment>
            </View>
        )
    }
    render(){
        const {navigation} = this.props;
        const {currentType, list, isFetching} = liveStore;
        return (<Container>
            <Content gray>
                <MaskLoading show={isFetching} text={'加载中,请稍后...'}/>
                {currentType === true ?
                    <FlatList
                        data={list.slice()}
                        keyExtractor={ (item, index) => index }
                        renderItem={({ item, index }) => <Video v={item} index={index} navigation={navigation} /> }
                        ListHeaderComponent={ this.renderListHeader(currentType) }
                        ListFooterComponent={
                            <Button full light onPress={()=>liveStore.fetchMore(true)}><Text>获取更多</Text></Button>
                        }
                        numColumns={2}
                        onRefresh={()=>{liveStore.fetchMore()}}
                        refreshing = {isFetching}
                    />
                    :
                    <FlatList
                        data={list.slice()}
                        keyExtractor={ (item, index) => index }
                        renderItem={({ item, index }) => <Video v={item} index={index} navigation={navigation} /> }
                        ListHeaderComponent={ this.renderListHeader(currentType) }
                        ListFooterComponent={
                            <Button full light onPress={()=>liveStore.fetchMore(true)}><Text>获取更多</Text></Button>
                        }
                        numColumns={2}
                        onRefresh={()=>{liveStore.fetchMore()}}
                        refreshing = {isFetching}
                    />
                }
            </Content>
        </Container>);
    }
}

const styles = StyleSheet.create({
    item:{
        width:screenW/2,
        padding:5,
        backgroundColor:'#fff'
    },
    innerView:{
        width:screenW/2,
        //height:screenW/2*226/416,
        // 文字内容居中对齐
        alignItems:'center',
        justifyContent:'center',
    },
    face:{
        width:screenW/2-5,
        height:screenW/2*226/416-3
    },
    iconStyle:{
        width:100,
        height:99,
    },
    topBanner:{
        width: screenW,
        height: screenW*4/9,
    },
    title:{
        fontSize:14,
        marginLeft:3,
        marginRight:3,
        color:'#6f6f6f',
        textAlign:'left',
    },
    sub:{
        fontSize:12,
        textAlign:'right',
        color:'#909090',
        position:'absolute',
        right:5,
        bottom:0,
    },
})