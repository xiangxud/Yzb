/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import {Container, Content, Text} from 'native-base';
import {Loading} from '../../components'
import {observer} from 'mobx-react/native';
import userStore from "../../store/userStore";

@observer
export default class BHList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: 1,
            loading: true,
            refreshing: false
        };
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '送检单列表',
        headerRight: <View/>
    });
    componentDidMount(){
        var timer = setTimeout(()=>{
            this.fetchData();
        }, 100);
    }
    componentWillUnMount(){
        this.timer && clearTimeout(this.timer);
    }
    fetchData(page){
        request.getJson(urls.apis.BH_GET_SHEETS, {phone: userStore.phone}).then((res)=>{
            this.setState({
                data: res,
                loading: false,
                refreshing: false
            });
        }).catch((err)=>{
            alert(err);
        });
    }
    handleRefresh = () => {
        this.fetchData(1);
    };
    // handleLoadMore = () => {
    //     this.setState(
    //         {
    //             page: this.state.page + 1
    //         },
    //         () => {
    //             this.fetchData(this.state.page);
    //         }
    //     );
    // };
    renderSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: "#CED0CE"}}/>
        );
    };
    renderItem = (item) =>{
        return (<TouchableOpacity onPress={()=>this.props.navigation.navigate('BHDetail', {sheetNo: item.sheetNo})}>
            <View style={styles.item}>
                <View style={{flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#ccc', marginBottom:5, paddingBottom:5}}>
                    <Text style={{fontSize:18, flex:1,}}>众联单号 {item.sheetNo}</Text>
                    <Text style={{color:'gray'}}>{item.submitDate.substr(0, 10)}</Text>
                    <Text style={{backgroundColor:'#ff9800',color:'#fff', marginLeft:3, paddingLeft:3, paddingRight:3, borderRadius:3}}>{item.status}</Text>
                </View>
                <View style={{flexDirection:'row',}}>
                    <Text style={{flex:1, fontWeight:'bold'}}>{item.farmName}</Text>
                    <Text>送检类型：{item.animalType}</Text>
                </View>
            </View>
        </TouchableOpacity>);
    }
    renderFooter = () => {
        return <Loading isShow={this.state.loading}/>
    };
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item,key) => key}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}
                        //onEndReached={this.handleLoadMore}
                        //onEndReachedThreshold={0.1}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item:{
        marginTop:10,
        padding:10,
        backgroundColor:'#fff',
    },

})