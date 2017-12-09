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

@observer
export default class BHDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
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
        let { sheetNo } = this.props.navigation.state.params;
        request.getJson(urls.apis.BH_GET_SHEET, {sheetNo: sheetNo}).then((res)=>{
            this.setState({
                data: res,
                loading: false
            });
        }).catch((err)=>{
            alert(JSON.stringify(err));
        });
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content style={styles.container}>
                    <Text>
                    {
                        !this.state.loading?
                        JSON.stringify(this.state.data)
                        :'正在加载中...'
                    }
                    </Text>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})