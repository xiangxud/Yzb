/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import {Container, Content, Spinner, List, ListItem, Button, Separator, Text} from 'native-base';
import {observer} from 'mobx-react/native';
import {MaskLoading} from '../../components';
import userStore from "../../store/userStore";

@observer
export default class BHStart extends Component {
    constructor(props){
        super(props);
        this.state={
            isSales: false,
            isLoading: true,
        }
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '渤海监测',
        headerRight: <Button transparent light onPress={()=>navigation.navigate('BHList')}><Text>送检单</Text></Button>
    });
    componentDidMount() {
        var timer = setTimeout(() => {
            this.fetchData();
        }, 200);
    }
    componentWillUnMount(){
        this.timer && clearTimeout(this.timer);
    }
    fetchData(){
        request.getJson(urls.apis.BH_IS_SALES, {phone: userStore.phone}).then((res)=>{
            if(res===true){
                this.setState({isSales: true, isLoading: false});
            }else{
                tools.showToast('您还不是瑞普用户,不能提交申请');
                this.setState({isSales: false, isLoading: false});
            }
        }).catch((err)=>{
            tools.showToast(err.message);
            this.setState({isSales: false, isLoading: false});
        });
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content>
                    <MaskLoading show={this.state.isLoading} />
                    <View style={styles.topBox}>
                        <View style={styles.topBoxLine}>
                            <Image source={require('../../resource/bohai_logo.png')} style={{width: 40, height: 40}}/>
                            <Text style={styles.title}>众联监测服务</Text>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Web",{ title:'检测说明', url: urls.webPath+'/yzb/bohai/help' })}}>
                                <Text>检测说明</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>
                            <Text>        应天津市市场和质量监督管理委员会要求和检测工作的发展需要，天津渤海农牧产业联合研究院有限公司（由天津瑞普生物技术股份有限公司投资）于2016年6月成立，主要从事动物疫病诊断检测和药物分析检测。渤海农牧作为具有独立法人资格的第三方检测机构，能够独立行文、独立开展业务、独立检测，具备独立的财务制度。</Text>
                        </Text>
                    </View>
                    <Separator bordered>
                        <Text style={{fontSize:14}}>提交申请单</Text>
                    </Separator>
                    {
                        this.state.isSales?
                            <View>
                                <List style={{backgroundColor:'#fff'}}>
                                    <ListItem onPress={()=>navigation.navigate('BHApply', {type: '家禽'})}>
                                        <Text>家禽</Text>
                                    </ListItem>
                                    <ListItem onPress={()=>navigation.navigate('BHApply', {type: '家畜'})}>
                                        <Text>家畜</Text>
                                    </ListItem>
                                </List>
                            </View>
                            : null
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    topBox:{
        marginTop:5,
        padding:15,
        borderTopWidth:3,
        borderTopColor:'#ff9800',
        backgroundColor:'#fff',
    },
    topBoxLine:{
        paddingBottom:3,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        flexDirection:'row',
        alignItems:'flex-end'
    },
    title:{
        fontSize:22,
        flex:1,
    },
    items:{
        backgroundColor:'#fff',
    }
})