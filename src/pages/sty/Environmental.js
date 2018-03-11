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

@inject('sensorHistoryStore')
@observer
export default class Environmental extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight:<View></View>
    })
    componentDidMount() {
        // const {navigation,sensorHistoryStore} = this.props;
        // navigation.setParams({
        //     commitPress: this.settingPress
        // });
        // sensorHistoryStore.onIni(navigation.state.params.code);
    }
    settingPress = () => {
        this.props.navigation.navigate('EnvironmentalSetting');
    }

    renderListHeader =()=>{
        const {now} = this.props.sensorHistoryStore.data;
        return (
            <View>
                <EnvironmentMonitor data={now}/>
                <SeparatorArea/>
                <TitleBar icon={'history'}
                          iconColor={'gray'}
                          title={'监控历史'}
                          showMore={false}/>
            </View>
        );
    }
    renderRow =(item)=>{
        let d = item.CreatOn.ToDateTime().InterVal(new Date());
        let label = d < 50 ? "刚刚":"";
        return (
            <View style={styles.row}>
                <View style={styles.dt}>
                    <Text style={styles.day}>{label}</Text>
                    <Text style={styles.time}>{item.CreatOn.ToDateTime().Format("hh:mm")}</Text>
                </View>
                <View style={{flex:1,}}>
                    <Text>温度：{item.Temp}</Text>
                    <Text>湿度：{item.Humidity}</Text>
                    <Text>二氧化碳：{item.CO2}</Text>
                </View>
            </View>
        );
    }
    renderSep =()=>{
        return <View style={{borderBottomColor:'gray', borderBottomWidth:StyleSheet.hairlineWidth}}/>;
    }
    render() {
        const {sensorHistoryStore} = this.props;
        return (
            <Container>
                <Content>
                    <FlatList
                        style={styles.his}
                        data={sensorHistoryStore.data.list}
                        renderItem={({ item }) => this.renderRow(item) }
                        ListHeaderComponent={ this.renderListHeader() }
                        ListFooterComponent={
                            <View />
                        }
                        onEndReachedThreshold={0.2}
                        onRefresh={()=>{
                            const {navigation,sensorHistoryStore} = this.props;
                            navigation.setParams({
                                commitPress: this.settingPress
                            });
                            sensorHistoryStore.onIni(navigation.state.params.code);
                        }}
                        onEndReached={()=>{
                            const {navigation,sensorHistoryStore} = this.props;
                            navigation.setParams({
                                commitPress: this.settingPress
                            });
                            sensorHistoryStore.onLoad(navigation.state.params.code);
                            return true;
                        }}
                        ItemSeparatorComponent={ this.renderSep }
                        keyExtractor={ (item, index) => index }
                        refreshing = {sensorHistoryStore.loading}
                    />
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