import React, {Component} from 'react';
import
{
    View,
    Text ,
    Button,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import {observer,inject} from 'mobx-react/native';
import {action,observable} from 'mobx';

class pageStore{
    @observable
    label="";
    @observable
    items=[];

    @action
    onIni(_items){
        this.items = _items;
        if( _items.length > 0 ){
            this.label = _items[0];
        }
    }
    @action
    onChanged(o){
        this.label = o;
    }
}

@observer
export default class tabHead extends Component{
    constructor(props){
        super(props);
        debugger;
        this.data.onIni(this.props.items);
    }

    @observable
    data = new pageStore();

    componentWillUnmount() {
    }
    onChanged(label){
        this.data.onChanged(label);
        if( this.props.onChanged != undefined ){
            this.props.onChanged(label);
        }
    }
    renderList(){
        return this.data.items.map((o,key) =>
        {
            return this.renderItem(o,key);
        });
    };
    renderItem(o,key){
        if( o == this.data.label )
        {
            return <TouchableHighlight underlayColor={"transparent"} style={{flex:1}} key={key}>
                <Text style={[style.tabItem,style.cu]}>{o}</Text>
            </TouchableHighlight>
        }
        else
        {
            return <TouchableHighlight underlayColor={"transparent"} style={{flex:1}} key={key}  onPress={() => this.onChanged(o)}>
                <Text style={style.tabItem}>{o}</Text>
            </TouchableHighlight>
        }
    }
    render()
    {
        return <View style={style.tab}>
                {
                    this.renderList()
                }
            </View>
    };
};

const style = StyleSheet.create({
    tab : {
        flex:1,
        flexDirection:'row',
        alignItems:'stretch',
    },
    tabItem:{
        flex:1,
        textAlignVertical:'center',
        textAlign:'center',
        borderBottomWidth:4,
        borderBottomColor:'#f0f0f0',
    },
    cu:{
        borderBottomWidth:5,
        borderBottomColor:'#d40613',
        fontWeight:'bold'
    }
});