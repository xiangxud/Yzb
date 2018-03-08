import React, {Component} from 'react';
import {
    View,
    TextInput,
    WebView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {Container, Content, Text, Button, Icon} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import EnvironmentMonitor from '../../components/sty/EnvironmentMonitor';
import {TitleBar, SeparatorArea} from '../../components';

@inject('styStore')
@observer
export default class Environmental extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: <Button transparent light
                             onPress={navigation.state.params ? navigation.state.params.commitPress : null}><Icon
            name="ios-settings" style={{color: 'white'}}/></Button>
    })

    componentDidMount() {
        this.props.navigation.setParams({
            commitPress: this.settingPress
        });
    }

    settingPress = () => {
        this.props.navigation.navigate('EnvironmentalSetting');
    }

    renderListHeader =()=>{
        const {environmental} = this.props.styStore;
        return (
            <View>
                <EnvironmentMonitor data={environmental}/>
                <SeparatorArea/>
                <TitleBar icon={'history'}
                          iconColor={'gray'}
                          title={'监控历史'}
                          showMore={false}/>
            </View>
        );
    }
    renderRow =(item)=>{
        return (
            <View style={styles.row}>
                <View style={styles.dt}>
                    <Text style={styles.day}>{item.day}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={{flex:1,}}>
                    <Text>温度：{item.temperature}</Text>
                    <Text>湿度：{item.humidity}</Text>
                    <Text>二氧化碳：{item.co2}</Text>
                </View>
            </View>
        );
    }
    renderSep =()=>{
        return <View style={{borderBottomColor:'gray', borderBottomWidth:StyleSheet.hairlineWidth}}/>;
    }
    render() {
        let list = [
            {day:'刚刚', time:'18:22',temperature:24,humidity:64.2,co2:88.3},
            {day:'2-11', time:'12:05',temperature:34,humidity:64.3,co2:79.5},
        ];
        let isFetching = false;
        return (
            <Container>
                <Content>
                    <FlatList
                        style={styles.his}
                        data={list.slice()}
                        renderItem={({ item }) => this.renderRow(item) }
                        ListHeaderComponent={ this.renderListHeader() }
                        ListFooterComponent={
                            <Button full light onPress={()=>{homeStore.fetchHomeData()}}><Text>查看更多</Text></Button>
                        }
                        ItemSeparatorComponent={ this.renderSep }
                        keyExtractor={ (item, index) => index }
                        refreshing = {isFetching}
                    />
                    <Button block danger onPress={()=>this.goto()}><Text>重试错误</Text></Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    his: {
        flex: 1,
    },
    row:{
        flexDirection:'row',
        backgroundColor:'white',
        paddingTop:5,
        paddingBottom:5,
    },
    dt: {
        width:100,
        justifyContent:'center',
        alignItems:'center'
    },
    day:{
        color:'#888',
    },
    time:{
        fontSize:20,
        fontWeight:'bold'
    }
})