import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';

import {observer} from 'mobx-react/native';
import {Text} from 'native-base';
import {TitleBar, Separator} from '../../components';

const SensorView = observer(({data, currentId, onItemPress}) => {
    moment.updateLocale('zh-cn', momentLocale);
    return (
        <View style={styles.container}>
            <TitleBar icon={'thermometer-half'}
                      title='传感器数据'
                      sub={<Text style={styles.updateAt}>更新于{data.length? moment(data[0].RecentDataAt).format('MMMDo HH:mm'): '-'}</Text>}/>
            <View style={styles.listViewStyle}>
                {
                    data.map((item, i) => (
                        <TouchableOpacity key={i} onPress={() => onItemPress(item)}>
                            <View
                                style={[styles.reportItems, currentId === item.SensorId ? {backgroundColor: '#cc7800'} : {}]}>
                                <Text style={styles.headLine}>{item.RecentData}</Text>
                                <Text>{item.SensorName}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
});
export default SensorView;

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e2e2e2',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    updateAt: {
        marginLeft: 5,
        fontSize:12,
        color: '#6f6f6f'
    },
    listViewStyle: {
        // 改变主轴的方向
        flexDirection: 'row',
        // 多行显示
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    reportItems: {
        width: Dimensions.get('window').width / 3,
        height: 80,
        justifyContent: 'center',
        backgroundColor: '#91d7c9',
        alignItems: 'center'
    },
    headLine: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#15856e'
    },
});