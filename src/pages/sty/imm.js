import React, {Component} from 'react';
import
{
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch ,Toast,Drawer } from 'native-base';
import {observer,inject} from 'mobx-react/native';
import AlarmClock from '../../components/sty/AlarmClock'
import Filter from '../../components/sty/Filter'

@inject('immStore')
@observer
export default class imm extends Component{

    componentWillMount(){
        const {immStore,navigation} = this.props;

        this.onLoadList();
    }

    constructor(props){
        super(props);
    }

    onLoadList() {
        const {immStore} = this.props;
        immStore.onLoad(null, (mess) => {
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

    render(){
        const {immStore} = this.props;

        // const drawerStyles = {
        //     drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
        //     main: {paddingLeft: 0}
        // }

        return (
            <Drawer
                //styles={drawerStyles}
                ref={(ref) => { this.drawer = ref; }}
                content={<Filter />}
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