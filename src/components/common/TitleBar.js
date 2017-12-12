/**
 * Created by TomChow on 17/11/12.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import { observer } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome';

const TitleBar = observer(({title, sub, icon, iconColor, morePress})=> {
        return (
            <View style={styles.titleWrap}>
                <Icon name={icon? icon: 'institution'}
                      color={iconColor? iconColor: '#F1745E'} size={16} />
                <Text style={styles.titleText}>{title}{sub}</Text>
                {
                    morePress ?
                    <TouchableHighlight style={styles.more} onPress={()=> morePress()}>
                        <Text>更多</Text>
                    </TouchableHighlight>
                    : null
                }
            </View>
        )
});

export default TitleBar

const styles = StyleSheet.create({
    titleWrap:{
        height:40,
        paddingLeft:10,
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
        padding:10
    }
});