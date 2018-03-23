import React, {Component} from 'react';
import {
    View,
    TextInput,
    WebView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {Container, Content, Button, Spinner,Text, Icon} from 'native-base';
import {TitleBar, SeparatorArea} from '../../components';

@inject('styReportStore')
@observer
export default class report extends Component{
    static navigationOptions = ({navigation}) => ({
        headerTitle: '报表分析',
        headerRight: <Button transparent light onPress={navigation.state.params ? navigation.state.params.inputPress : null}><Text>筛选</Text></Button>
    })
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
    renderListHeader =()=>{
        return (
            <View>
                <SeparatorArea/>
                <TitleBar icon={'line-chart'}
                          iconColor={'red'}
                          title={'环境监测记录'}
                          showMore={false}/>
                <View style={styles.canvas}>
                    <Text>H5图表</Text>
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
    renderBody=()=>{
        const {styReportStore, navigation} = this.props;
        return <Content>
            <FlatList
                style={styles.his}
                data={styReportStore.data.Records}
                renderItem={({ item }) => this.renderRow(item) }
                ListHeaderComponent={ this.renderListHeader() }
                ListFooterComponent={
                    <Button full light onPress={()=>{}}><Text>查看更多</Text></Button>
                }
                ItemSeparatorComponent={ this.renderSep }
                keyExtractor={ (item, index) => index }
                refreshing = {styReportStore.loading}
            />
            <Button block danger onPress={()=>this.goto()}><Text>重试错误</Text></Button>
        </Content>
    }
    render(){
        const {styReportStore, navigation} = this.props;
        return (
            <Container>
                    {
                        styReportStore.loadFinished ? this.renderBody() : <Content><Spinner /></Content>
                    }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    canvas: {
        height:300,
        backgroundColor:'#e69d63',
        justifyContent:'center',
        alignItems:'center'
    },
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
    year:{
        color:'#888',
    },
    day:{
        fontSize:20,
        fontWeight:'bold'
    }
})