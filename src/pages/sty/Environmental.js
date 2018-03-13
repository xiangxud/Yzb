import React, {Component} from 'react';
import {
    View,
    TextInput,
    WebView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {Container, Content,Form, Text,Spinner, Button, Icon} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import EnvironmentMonitor from '../../components/sty/EnvironmentMonitor';
import {TitleBar, SeparatorArea} from '../../components';

@inject('styStore')
@observer
export default class Environmental extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight:<View></View>
    })
    constructor(props){
        super(props);
    }
    componentDidMount() {
    }
    settingPress = () => {
        this.props.navigation.navigate('EnvironmentalSetting');
    }
    renderListHeader =()=>{
        const {now} = this.props.styStore.environmental.data.now;
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
        let label = item.CreatOn.ToDateTime().GetLabel();
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
    renderList(){
        const {styStore,navigation} = this.props;
        const store = styStore.environmental;

        return <FlatList
            style={styles.his}
            data={store.data.list}
            renderItem={({ item }) => this.renderRow(item) }
            ListHeaderComponent={ this.renderListHeader() }
            ListFooterComponent={
                <View />
            }
            onEndReachedThreshold={0}
            onRefresh={()=>{
                store.onIni(navigation.state.params.code);
            }}
            onEndReached={()=>{
                store.onLoad(navigation.state.params.code);
            }}
            ItemSeparatorComponent={ this.renderSep }
            keyExtractor={ (item, index) => index }
            refreshing = {store.loading}
        />
    }
    render() {
        return (
            <Container>
                <Content>
                        {
                            this.renderList()
                        }
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