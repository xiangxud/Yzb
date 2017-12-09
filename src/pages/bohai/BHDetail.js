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
import {Container, Content, List, ListItem, Button, Separator, Text} from 'native-base';
import {Loading} from '../../components'
import {observer} from 'mobx-react/native';
import SheetInfo from '../../components/bohai/SheetInfo'

@observer
export default class BHDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            reports: [],
            loading: true
        };
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '送检单详情',
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
    fetchData(){
        let { item } = this.props.navigation.state.params;
        request.getJson(urls.apis.BH_GET_SHEET, {sheetNo: item.sheetNo}).then((res)=>{
            this.setState({
                data: res,
                loading: false
            });
        }).catch((err)=>{
            tools.showToast(err.message);
        });
        request.getJson(urls.apis.BH_GET_TESTING_REPORTS, {sheetNo: item.sheetNo}).then((res)=>{
            this.setState({
                reports: res,
            });
        }).catch((err)=>{
            tools.showToast(err.message);
        })
    }
    render() {
        let { item } = this.props.navigation.state.params;
        return (
            <Container>
                <Content style={styles.container}>
                    {
                        !this.state.loading ?
                            <SheetInfo data={this.state.data}
                                       info={item}
                                       reports={this.state.reports}/>
                            : <Loading isShow={this.state.loading}/>
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#e0e0e0'
    },
})