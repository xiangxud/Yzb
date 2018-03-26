import React, {Component} from 'react';
import {
    View,
    TextInput,
    WebView,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Container, Content, Button, Spinner,Text, Icon} from 'native-base';
import {TitleBar,ActionTitleBar,EChart,SeparatorArea} from '../../components';

@inject('styReportStore')
@observer
export default class report extends Component{
    static navigationOptions = ({navigation}) => ({
        headerTitle: '报表分析',
        headerRight: <Button transparent light onPress={navigation.state.params ? navigation.state.params.inputPress : null}><Text>筛选</Text></Button>
    })
    constructor(props){
        super(props);
    }
    componentDidMount() {
        const {styReportStore, navigation} = this.props;
        styReportStore.onIni(navigation.state.params.code);
        this.props.navigation.setParams({
            inputPress: this.inputPress
        });
    }
    inputPress =()=>{
        alert('填写报告');
    }
    reports=[{
        name:'tem',
        text:'温度',
        icon:'ios-thermometer',
        onPress:()=>{
            const {styReportStore} = this.props;
            styReportStore.onChangedReport("tem");
        }
    },{
        name:'hum',
        text:'湿度',
        icon:'ios-water',
        onPress:()=>{
            const {styReportStore} = this.props;
            styReportStore.onChangedReport("hum");
        }
    }];
    renderListHeader =()=>{
        const {styReportStore} = this.props;


        return (
            <View>
                <ActionTitleBar
                    icon={'ios-stats'}
                    iconColor={'red'}
                    title={'环境监测记录'}
                    actions={this.reports}
                    actionLabel={styReportStore.reportData[styReportStore.currReport].label}
                    showMore={false} />
                <View style={styles.canvas}>
                    <EChart data={styReportStore.reportData[styReportStore.currReport].data} style={{flex:1}}></EChart>
                </View>
                <SeparatorArea/>
                <TitleBar icon={'file-text'}
                          iconColor={'red'}
                          title={'日报记录'}
                          showMore={false}/>
            </View>
        )
    }
    renderRow =(item)=>{
        return (
            <View style={styles.row}>
                <View style={styles.dt}>
                    <Text style={styles.year}>{item.Daily.ToDate().Format("yyyy")}年</Text>
                    <Text style={styles.day}>{item.Daily.ToDate().Format("MM-dd")}</Text>
                </View>
                <View style={{flex:1,}}>
                    <Text>补栏 {item.ToDayAddPet?item.ToDayAddPet:0} 头，温度：{item.Temperature}℃</Text>
                    <Text>风机数量：{item.WmCount?item.WmCount:0}，通风方式：{item.WindMode}</Text>
                </View>
            </View>
        );
    }
    renderSep =()=>{
        return <View style={{borderBottomColor:'gray', borderBottomWidth:StyleSheet.hairlineWidth}}/>;
    }
    renderListFooter=()=>{
        const {styReportStore, navigation} = this.props;
        if(styReportStore.end){
            return <View></View>
        }
        return <TouchableOpacity  style={styles.footer} onPress={()=>{styReportStore.onLoad(navigation.state.params.code);}}>
                <Text>点击查看更多</Text>
         </TouchableOpacity>
    }
    render(){
        const {styReportStore, navigation} = this.props;
        return (
            <View style={{flex:1}}>
                <FlatList
                    style={styles.his}
                    data={styReportStore.data.Records}
                    renderItem={({ item }) => this.renderRow(item) }
                    ListHeaderComponent={ this.renderListHeader() }
                    ListFooterComponent={
                        this.renderListFooter()
                    }
                    ItemSeparatorComponent={ this.renderSep }
                    keyExtractor={ (item, index) => index }
                    scrollEventThrottle={1}
                    refreshing = {styReportStore.loading}
                    onRefresh={()=>{
                        styReportStore.onIni(navigation.state.params.code);
                    }}
                    onEndReachedThreshold={0}
                    onEndReached={()=>{
                        styReportStore.onLoad(navigation.state.params.code);
                    }}
                    ListEmptyComponent={()=><View style={{height:100, justifyContent:'center', alignItems:'center'}}><Text style={{color:'gray'}}>暂无免疫提醒</Text></View>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    canvas: {
        height:250,
        justifyContent:'center',
        alignItems:'stretch'
    },
    his: {
        flex:1,
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
    year:{
        color:'#888',
    },
    day:{
        fontSize:20,
        fontWeight:'bold'
    },
    footer:{
        height:35, justifyContent:'center' , alignItems:'center'
    }
})