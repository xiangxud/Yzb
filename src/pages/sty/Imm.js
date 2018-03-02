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
@observer
export default class imm extends Component{
    static navigationOptions = ({navigation})=>({
        headerRight: <View />
    });

    componentDidMount(){
        const {navigation} = this.props;
        this.onLoadList({ StyName : navigation.state.params.title });
    }

    constructor(props){
        super(props);
    }

    onLoadList(config) {
        const {immStore} = this.props;
        immStore.onLoad(config, (mess) => {},(mess)=> {})
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
        this.onLoadList(config);
        this.closeDrawer();
    }



    onImplement(data) {
        const {immStore} = this.props;
        immStore.onChangedState(data,PlanState.Finished.Value,(data)=>{
            Toast.show({
                type:'success',
                text: "执行成功",
                position: 'top'
            });
            this.autoClose();
        },(err)=>{
            Toast.show({
                type:'warning',
                text: "执行失败",
                position: 'top'
            });
            this.autoClose();
        });
    }
    onIgnore(data) {
        const {immStore} = this.props;
        immStore.onChangedState(data,PlanState.Ignore.Value,(data)=>{
            Toast.show({
                type:'success',
                text: "忽略成功",
                position: 'top'
            });
            this.autoClose();
        },(err)=>{
            Toast.show({
                type:'warning',
                text: "忽略失败",
                position: 'top'
            });
            this.autoClose();
        });
    }

    render(){
        const {immStore} = this.props;

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<Filter source={immStore.FilterConfig} options={immStore.EnumPlanState} onUpdateData={(e)=>{ immStore.OnUpdateConfig(e) }} onApply={(e)=>this.onQuery(e)} onCancel={()=>{this.closeDrawer()}} />}
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
                                count={immStore.collection.count}
                                end={immStore.collection.end}
                                onImplement={this.onImplement.bind(this)}
                                onIgnore={this.onIgnore.bind(this)}
                                collection={immStore.collection}>
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