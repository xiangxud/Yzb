import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {Form, Label, Icon, View, Text} from 'native-base';
import {observer} from "mobx-react/native";

const CameraList = observer(function CameraList({list, defaultId, onChanged, onModify, onRemove, ...props}) {
    let renderRow = (item) => {
        let icon = item.data.Id == defaultId ? "md-radio-button-on" : "md-radio-button-off";
        let checkStyle = item.data.Id == defaultId ? [styles.opTxt, styles.default] : [styles.opTxt];

        return <View key={item.data.Id} style={styles.border}>
            <View style={styles.row}>
                <Label numberOfLines={1} style={styles.label}>{item.data.Name}</Label>
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => {
                    onChanged(item.data.Id)
                }}>
                    <View style={styles.left}>
                        <Icon style={[...checkStyle, styles.ico]} name={icon}/>
                        <Label style={checkStyle}>设置默认</Label>
                    </View>
                </TouchableOpacity>
                <View style={styles.action}>
                    <TouchableOpacity style={styles.action} onPress={() => onRemove(item.data.Id)}>
                        <Icon name="ios-trash-outline"/>
                        <Label style={styles.opTxt}>删除</Label>
                    </TouchableOpacity>

                    {/*<TouchableOpacity style={styles.action} onPress={() => onModify(item)}>
                        <Icon name="ios-create-outline"/>
                        <Label style={styles.opTxt}>修改</Label>
                    </TouchableOpacity>*/}
                </View>
            </View>
        </View>
    };
    return (
        <Form style={styles.form}>
            {
                list.length ?
                    list.map((item) => (renderRow(item))) :
                    <View style={styles.no}>
                        <Text>暂未设置监视器~</Text>
                    </View>
            }
        </Form>);
});

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#ffffff',
    },
    no: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    border: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    left: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    label: {
        textAlignVertical: 'center'
    },
    opTxt: {
        marginLeft: 5,
        fontSize: 15,
        color: '#bbbbbb',
        textAlignVertical: 'center'
    },
    ico: {
        fontSize: 24
    },
    default: {
        color: '#009688',
        fontSize: 16,
    },

    action: {
        flexDirection: 'row',
        marginLeft: 10
    }
});
export default CameraList;