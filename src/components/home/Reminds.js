/**
 * Created by TomChow on 17/11/12.
 */
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import { observer } from 'mobx-react/native'
import TitleBar from '../common/TitleBar';

const Reminds = observer(({reminds, morePress, detailPress, exec, ignore})=> {
    return (
        <View style={styles.container}>
            <TitleBar icon={'bell-o'}
                      iconColor={'red'}
                      title={'今日提醒'}
                      showMore = {true}
                      morePress={ () => morePress('remind') } />
            <View>
                {reminds.map((val, key) => (
                    <TouchableNativeFeedback
                        key={key}
                        onPress={() => detailPress(key)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{
                            justifyContent: 'center',
                            padding: 10,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderBottomColor: '#ccc'
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{flex: 1, fontSize: 18, color: '#333'}}>
                                    {val.title}
                                    <Text style={{color: '#ccc', fontSize: 14, marginLeft: 5}}>{val.remind_date}</Text>
                                </Text>
                                <TouchableOpacity onPress={() => exec(val.id)}>
                                    <Text style={{color: 'red', fontSize: 18, padding: 5}}>执行</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => ignore(val.id)}>
                                    <Text style={{color: 'gray', fontSize: 18, padding: 5}}>忽略</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{color: '#a7a7a7'}}>
                                {val.method} 说明：{val.remark}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                ))
                }
            </View>
        </View>
    )
});

export default Reminds;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
    },
});