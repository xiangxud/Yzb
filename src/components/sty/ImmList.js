import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import {Container, Content, SwipeRow, Button, Text, Spinner } from 'native-base';
import {observer} from 'mobx-react/native';
import {TitleBar, Separator} from '../../components';

@observer
export default class ImmList extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    renderRow = (info) =>{
        return (
            <SwipeRow rightOpenValue={-150}
                      style={styles.swipeRow}
                      list={{}}
                      right={
                          <View style={styles.actions}>
                              <Button info style={styles.action}><Text>执行</Text></Button>
                              <Button info style={styles.action}><Text>忽略</Text></Button>
                          </View>
                      }
                      body={
                          <View style={styles.row}>
                              <View style={styles.frist}>
                                  <Text style={styles.immTitle} numberOfLines={1}>
                                      {info.item.VaccineName}
                                  </Text>
                                  <Text style={styles.immTime} numberOfLines={1}>
                                      {info.item.ImmuneTime.ToDate().Format("yyyy-MM-dd")}
                                  </Text>
                              </View>
                              <View style={styles.second}>
                                  <Text style={styles.block}>{info.item.VaccineMethod}</Text>
                                  <Text style={styles.block}>{info.item.Dose}</Text>
                              </View>
                          </View>
                      }
            >
            </SwipeRow>)
    }

    ListFooter(){
        return <View />
    }
    renderList(){
        let list = this.props.collection.collection.list;
        let top = this.props.top;
        if(!top || top < 2){
            top = 5;
        }
        let array = list.slice(0,top);

        return <FlatList data={array}
                         renderItem={this.renderRow}
                         onEndReachedThreshold={0}
                         ItemSeparatorComponent={()=><Separator/>}
                         ListFooterComponent={this.ListFooter}
                         ListEmptyComponent={()=><View style={styles.emptyTips}><Text style={{color:'gray'}}>暂无免疫提醒</Text></View>}
                         refreshing={!this.props.collection.collection.end}
                         keyExtractor={(item, index) => index.toString()}>
        </FlatList>;
    }
    render(){
        return (
        <Container>
            <Content>
                <TitleBar icon={'bell-o'}
                          title='免疫提醒'
                          morePress={this.props.onMore}
                          sub={<Text style={styles.count}>({this.props.collection.collection.count})</Text>}/>
                {
                    this.props.collection.collection.end? this.renderList(): <Spinner />
                }
            </Content>
        </Container>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:10,
        alignItems:'stretch'
    },
    count:{
        marginLeft:2,
        color:'#ababab'
    },
    swipeRow:{flex:1,paddingTop:0,paddingBottom:0},
    emptyTips:{
        height:100,
        justifyContent:'center',
        alignItems:'center'
    },
    more:{
        alignSelf:'center',
        marginRight:5,
        flexDirection:'row',
        alignItems:'center',
    },

    row:{
        flex:1,
        height:50
    },
    frist:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        paddingRight:0
    },
    immTitle:{
        color:'#101010',
        fontSize:16,
        flex:1,
    },
    immTime:{
        color:'#ababab',
        fontSize:12,
        marginLeft:3,
        width:100
    },
    second:{
        flex:1,
        flexDirection:'row',
        paddingTop:3,
        paddingBottom:3
    },
    block:{
        color:'#AEAEAE',
        fontSize:12,
        textAlignVertical:'center',
        marginRight:8
    },
    actions:{
        flexDirection:'row',
        height:55,
        alignItems:'stretch'
    },
    action:{
        height:55
    }
});