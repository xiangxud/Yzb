import React, {Component} from 'react';
import
{
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import {observer} from 'mobx-react/native';
import {action,observable} from 'mobx'
import ModalDropdown from 'react-native-modal-dropdown';
import FontIcon from 'react-native-vector-icons/FontAwesome';

class styBarStore{
    @observable
    displayTxt="";

    styList=[];

    @action
    ini(list,code){
        this.styList=list;
        this.onSelect(code);
    }

    @action
    onSelect(code){
        if(code==undefined || code=="" || code == null){
            return;
        }
        if( this.styList == null || this.styList == undefined){
            return;
        }
        this.styList.forEach((o)=>{
            if(o.code == code){
                this.displayTxt=o.title;
            }
        });
    }

    @action
    onChanged(index,value){
        if( value == null || value == undefined)
        {
            return;
        }
        this.displayTxt=value.title;
    }
}


@observer
export default class StyBar extends Component{

    constructor(props){
        super(props);
    };

    componentDidMount(){
        this.store.ini(this.props.styList,this.props.iniCode);
    }

    @observable
    store = new styBarStore();

    _renderRow(rowData, rowID, highlighted) {
        let evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor='#009688'>
                <View style={[dropDownSty.row,{backgroundColor:'white'}]}>
                    <FontIcon style={dropDownSty.image} name="home" size={16} color="#009688"></FontIcon>
                    <Text style={[dropDownSty.row_text, highlighted && {color: 'mediumaquamarine'}]}>
                        {`${rowData.title}`}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    };
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID == this.store.styList.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={dropDownSty.separator} key={key} />);
    };

    render(){
        return (
            <View style={style.bar}>
                <View style={style.chevron} >
                    <TouchableHighlight>
                        <FontIcon name="chevron-left" size={20} color="#ffffff"></FontIcon>
                    </TouchableHighlight>
                </View>
                <ModalDropdown
                        style={dropDownSty.main}
                        textStyle={dropDownSty.text}
                        dropdownStyle={dropDownSty.dropdown}
                        options={this.store.styList}
                        defaultValue={this.store.displayTxt}
                        onSelect={this.store.onChanged.bind(this.store)}
                        renderRow=
                                       {
                                           this._renderRow.bind(this)
                                       }
                        renderSeparator=
                                       {
                                           (sectionID, rowID, adjacentRowHighlighted) =>
                                           {
                                               this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)
                                           }
                                       }
                    >
                        <View style={dropDownSty.button}>
                            <Text style={dropDownSty.text}>{this.store.displayTxt}</Text>
                            <FontIcon name="chevron-down" size={18} color='#ffffff' />
                        </View>
                    </ModalDropdown>
                <View style={style.right}>
                    <View onPress={this.props.onMessPress}>
                        <FontIcon name="envelope" size={20} color='#ffffff' />
                        <FontIcon name="circle" size={15} color='#f50716' style={style.warning} />
                    </View>
                    <View style={style.ico}>
                        <FontIcon name="cog" size={20} color='#ffffff' />
                    </View>
                </View>
            </View>)
    }
};

const dropDownSty = StyleSheet.create({
    main: {
        alignSelf: 'flex-end',
        width: 150,
        right: 8,
        borderWidth: 0,
        borderRadius: 3,
    },
    text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    button:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    dropdown: {
        width: 150,
        height:300,
        borderColor: '#009688',
        borderWidth: 1,
        borderRadius: 0,
    },
    row: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    image: {
        marginLeft: 4,
    },
    row_text: {
        marginHorizontal: 4,
        fontSize: 16,
        color: 'navy',
        textAlignVertical: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#009688',
    },
});
const style = StyleSheet.create({
    bar : {
        height:50,
        backgroundColor:'#009688',
        flexDirection:'row',
        alignItems:'stretch',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:7,
    },
    chevron:{
        width:20,
        flexDirection:'row',
        alignItems:'center',
    },
    right:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    ico:{
        marginLeft:15
    },
    warning : {
        position:'absolute',
        left:12,
        top:-3
    },
});