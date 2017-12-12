import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import { SwipeRow,Button,Text,Icon,List, ListItem,Left,Body,Right} from 'native-base';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react/native';

@observer
class AlarmClockRow extends Component{
    constructor(props){
        super(props);
    }

    @observable
    showPlan=false;

    renderDate(item){
        let formate = "";
        if( item.IsCyc ){
            formate="周期免疫";
        }else if( this.isNoNull(item.ImmuneTime)){
            formate = "";
        }else {
            formate = item.ImmuneTime.ToDate().Format("yyyy-MM-dd");
            formate = formate == new Date().Format("yyyy-MM-dd") ? "今天" : formate;
        }

        return (
            <Text style={style.immTime} numberOfLines={1}>
                {formate}
            </Text>);
    };

    renderPlan(item){
        if(!this.showPlan){
            return null;
        }
        return (<View style={style.plan}>
            <List>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>栋舍</Text>
                    </Left>
                    <Body>
                        <Text style={style.right}>{item.StyName}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>免疫日期</Text>
                    </Left>
                    <Body>
                        <Text style={style.right}>{this.isNoNull(item.ImmuneTime) ?"": item.ImmuneTime.ToDate().Format("yyyy-MM-dd")}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>疫病名称</Text>
                    </Left>
                    <Body>
                        <Text style={style.right}>{item.Disease}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>疫苗/药品</Text>
                    </Left>
                    <Body>
                        <Text style={style.right}>{item.VaccineName}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>制造商</Text>
                    </Left>
                    <Body>
                        <Text style={style.right}>{item.FirmVaccineName}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>免疫方法</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.VaccineMethod}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>剂量</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.Dose}</Text>
                    </Body>
                </ListItem>
                <ListItem style={style.planItem}>
                    <Left>
                        <Text style={style.left}>备注</Text>
                    </Left>
                    <Body>
                    <Text style={style.right}>{item.Remark}</Text>
                    </Body>
                </ListItem>
            </List>
        </View>);
    }

    @action
    flipPlan(){
        this.showPlan=!this.showPlan;
    }

    isNoNull(m){
        return !m || m==null || m=="";
    }

    render(){
        let {item} = this.props;

        debugger;

        return (
            <View style={{  alignItems:'stretch' }}>
                <SwipeRow rightOpenValue={-150}
                          style={{flex:1,paddingTop:0,paddingBottom:0}}
                          list={{}}
                          right={
                              <View style={style.actions}>
                                  <Button info style={style.action}><Text>执行</Text></Button>
                                  <Button info style={style.action}><Text>忽略</Text></Button>
                              </View>
                          }
                          body={
                              <View>
                                  <TouchableOpacity onPressIn={()=>{ this.flipPlan() }}>
                                      <View style={style.row}>
                                          {
                                              this.renderDate(item)
                                          }
                                          <Text style={style.immTitle} numberOfLines={1}>
                                              {item.VaccineName}
                                          </Text>
                                      </View>
                                  </TouchableOpacity>
                              </View>
                          }
                >
                </SwipeRow>
                {
                    this.renderPlan(item)
                }
            </View>
        );
    }
};


@observer
export default class AlarmClock extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){

    }

    renderRow(info){
        return(<AlarmClockRow item={info.item}></AlarmClockRow>);
    }

    _separator=()=>{
        return <View style={{ height: 1, backgroundColor: '#bbbbbb' }}/>;
    }
    _renderFooter(){
        return <View></View>
    }
    _renderHeader(){
        return <View></View>
    }

    render(){
        return <FlatList
            data={this.props.collection.list}
            renderItem={this.renderRow.bind(this)}
            onEndReachedThreshold={0.01}
            ListHeaderComponent={this._renderHeader}
            ItemSeparatorComponent={this._separator}
            ListFooterComponent={this._renderFooter}
            refreshing={!this.props.end}
            onRefresh={()=>{
                // this.props.onLoad();
            }}
            onEndReached={(number)=>{
                // this.props.onMore();
                // return true;
            }}
            keyExtractor={(item,key) => key}>
        </FlatList>
    }
};

const style = StyleSheet.create({
    row:{
        flex:1,
        flexDirection:'row',
        paddingRight:0,
        height:45,
        alignItems:'flex-end'
    },
    immTitle:{
        color:'#017a6c',
        fontSize:16,
        flex:1,
        height : 30,
        textAlignVertical:'center'
    },
    immTime:{
        color:'#ffffff',
        fontSize:16,
        fontWeight:'bold',
        width:100,
        height : 30,
        backgroundColor:"#009688",
        textAlign:'center',
        textAlignVertical:'center',
        marginLeft:10,
        marginRight:10
    },
    actions:{
        flexDirection:'row',
        alignItems:'stretch'
    },
    action:{
    },
    plan:{

    },
    planItem:{
        borderTopWidth:1,
        borderTopColor:'#bbbbbb',
        borderBottomWidth:0,
        height:40
    },
    left:{
        textAlign:"left",
        color:'#bbbbbb'
    },
    right:{
        textAlign:'right'
    }
});