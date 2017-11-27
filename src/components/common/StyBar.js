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

@observer
export default class StyBar extends Component{
    constructor(props){
        super(props);
    };

    list = [
        {"code": "001", "title": '生猪-东-01'},
        {"code": "002", "title": '生猪-东-02'},
        {"code": "003", "title": '生猪-东-03'},
        {"code": "004", "title": '生猪-东-04'},
        {"code": "005", "title": '生猪-东-05'},
        {"code": "006", "title": '生猪-东-06'},
        {"code": "007", "title": '生猪-东-07'},
        {"code": "008", "title": '生猪-东-08'},
        {"code": "009", "title": '生猪-东-09'}];

    componentDidMount(){
        this.onSelect(this.props.iniCode);
    }

    @observable
    displayTxt="";

    @action
    onChanged(index,value){
        debugger;
        if( value == null || value == undefined)
        {
            return;
        }
        this.displayTxt=value.title;
    }

    @action
    onSelect(code){
        debugger;
        if(code==undefined || code=="" || code == null){
            return;
        }
        if( this.list == null || this.list == undefined)
        {
            return;
        }
        this.list.forEach((o)=>{
           if(o.code == code){
               this.displayTxt=o.title;
           }
        });
    }

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
        if (rowID == this.list.length - 1) return;
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
                        options={this.list}
                        defaultValue={this.displayTxt}
                        onSelect={this.onChanged.bind(this)}
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
                            <Text style={dropDownSty.text}>{this.displayTxt}</Text>
                            <FontIcon name="chevron-down" size={18} color='#ffffff' />
                        </View>
                    </ModalDropdown>
                <View>
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
        borderRadius: 3
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
        paddingRight:30,
        paddingTop:7
    },
    chevron:{
        width:20,
        flexDirection:'row',
        alignItems:'center',
    },
    word:{
        width:80,
        textAlignVertical:'center',
        fontSize:16,
        color:'#ffffff',
        textAlign:'right',
        marginRight:6,
    }
});