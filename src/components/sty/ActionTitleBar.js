/**
 * Created by TomChow on 17/11/12.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {Icon, ActionSheet} from 'native-base';
import {observer} from 'mobx-react/native'

const ActionTitleBar = observer(({title, sub, icon, iconColor, actions, actionLabel}) => {
    let onPress = () => {
        ActionSheet.show({
            title: '栋舍操作',
            options: actions,
            destructiveButtonIndex: 0,
            cancelButtonIndex: -1
        }, (index) => {
            if (index < 0 || index >= actions.length) {
                return;
            }
            actions[index].onPress();
        });
    };

    return (
        <View style={styles.titleWrap}>
            <Icon name={icon ? icon : 'institution'} style={{color: iconColor}}/>
            <Text style={styles.titleText}>{title}{sub}</Text>{
            actions && actions.length > 0 ?
                <TouchableOpacity style={styles.more} onPress={onPress.bind(this)}>
                    <Icon name="ios-arrow-down-outline" style={{fontSize: 16}}/>
                    <Text style={{marginRight: 5}}>{actionLabel}</Text>
                </TouchableOpacity>
                : null
        }
        </View>
    )
});
export default ActionTitleBar

const styles = StyleSheet.create({
    titleWrap: {
        height: 40,
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        borderBottomColor: '#ccc',
    },
    titleText: {
        fontSize: 18,
        color: '#000',
        marginLeft: 3,
        flex: 1
    },
    more: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
});