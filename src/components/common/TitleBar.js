/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TitleBar extends Component {
    constructor(props){
        super(props);
    }
    onMorePress = () =>{
        this.props.onMorePress.bind(this);
    }
    render() {
        return (
            <View style={styles.titleWrap}>
                <Icon name={this.props.icon? this.props.icon: 'institution'}
                      color={this.props.iconColor? this.props.iconColor: '#F1745E'} size={16} />
                <Text style={styles.titleText}>{this.props.title}</Text>
                {
                    this.props.showMore === true ?
                    <TouchableHighlight style={styles.more} onPress={()=> this.props.onMorePress.bind(this)}>
                        <Text>更多</Text>
                    </TouchableHighlight>
                    : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleWrap:{
        height:40,
        paddingLeft:10,
        marginBottom:5,
        flexDirection:'row',
        backgroundColor:'#fff',
        borderBottomWidth:StyleSheet.hairlineWidth,
        alignItems:'center',
        borderBottomColor:'#ccc'
    },
    titleText: {
        fontSize:18,
        color:'#000',
        marginLeft:3,
        flex:1,
    },
    more:{
        marginRight:10
    }
});