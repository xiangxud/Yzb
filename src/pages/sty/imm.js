import React, {Component} from 'react';
import
{
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch ,Toast,Drawer } from 'native-base';
import {observer,inject} from 'mobx-react/native';
import AlarmClock from '../../components/sty/AlarmClock'
import Filter from '../../components/sty/Filter'

@inject('immStore')
@inject('immFilterStore')

@observer
export default class imm extends Component{
    static navigationOptions = ({navigation})=>({
        headerRight: <View />
    });

    componentWillMount(){
        const {immStore,immFilterStore} = this.props;
        immFilterStore.read(immStore.queryConfig);
        this.onLoadList();
    }

    constructor(props){
        super(props);
    }

    onLoadList(config) {
        const {immStore} = this.props;
        immStore.onLoad(config, (mess) => {
            Toast.show({
                type:'warning',
                text: mess,
                position: 'top'
            });
            this.autoClose();
        } )
    }

    onMoreList(){
        const {immStore} = this.props;
        immStore.onMore(()=>{}, (mess) => {
            Toast.show({
                type:'warning',
                text: mess,
                position: 'top'
            });
            this.autoClose();
        })
    }

    autoClose( callback ){
        setTimeout(()=>{
            Toast.toastInstance._root.closeToast();
            if(callback){
                callback();
            }
        },800);
    }


    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    onQuery(config){
        //alert(filterConfig.StartDate);

        this.onLoadList({
            StartDate:config.StartDate + " 00:00:00",
            EntDate:config.EntDate + " 23:59:59",
            PlanState:config.PlanState
        });
        this.closeDrawer();
    }

    render(){
        const {immStore} = this.props;

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<Filter onApply={(e)=>this.onQuery(e)} onCancel={()=>{this.closeDrawer()}} />}
                openDrawerOffset={0.4}
                panOpenMask={0.80}
                onClose={this.closeDrawer.bind(this)}
                onOpen={this.openDrawer.bind(this)}
                captureGestures="open"
                side="right">
                <Container>
                    <Content>
                        <List>
                            <ListItem itemDivider>
                                <Body>
                                <Text>今天需要执行的免疫</Text>
                                </Body>
                                <Right>
                                    <TouchableOpacity style={style.right} onPress={()=>{this.openDrawer()}}>
                                        <Text style={style.txt}>筛选</Text>
                                        <Icon name="ios-funnel"></Icon>
                                    </TouchableOpacity>
                                </Right>
                            </ListItem>
                            <AlarmClock
                                onLoad={this.onLoadList.bind(this)}
                                onMore={this.onMoreList.bind(this)}
                                end={immStore.collection.end}
                                collection={immStore.collection}
                                showId={immStore.collection.showId}
                                onChangedShowPanl={immStore.onChanged.bind(immStore)}>
                            </AlarmClock>
                        </List>
                    </Content>
                </Container>
            </Drawer>
        );
    }
}

const style = StyleSheet.create({
    right:{
        flexDirection:'row'
    },
    txt:{
        color:'#ff9800',
        fontSize:14,
        marginRight:2
    }
});