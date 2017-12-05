/**
 * Created by TomChow on 17/11/28.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {observer} from 'mobx-react/native'
import {Form, Item, Input, Label, Icon, } from 'native-base';

@observer
class Step4 extends Component {
    render() {
        const { navigation, store } = this.props;
        return (
            <View style={styles.container}>
                <Form>
                    <Item fixedLabel>
                        <Label>发病率<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请输入发病率"
                               maxLength={5}
                               keyboardType={'numeric'}
                               value={store.data.morbidity===0?'':store.data.morbidity.toString()}
                               onChangeText={(text) => store.set('morbidity', text)}/>
                        <Text style={styles.arrow}>%</Text>
                    </Item>

                    <Item fixedLabel>
                        <Label>死亡率<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请输入死亡率"
                               maxLength={5}
                               keyboardType={'numeric'}
                               value={store.data.mortality===0?'':store.data.mortality.toString()}
                               onChangeText={(text) => store.set('mortality', text)}/>
                        <Text style={styles.arrow}>%</Text>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>临床症状描述</Label>
                        <Input placeholder="请输入临床症状描述"
                               maxLength={100}
                               value={store.data.clinicalSymptoms}
                               multiline={true}
                               onChangeText={(text) => store.set('clinicalSymptoms', text)}/>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>疫苗名称及厂家<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请输入疫苗名称及厂家"
                               maxLength={50}
                               value={store.data.vaccineName}
                               multiline={true}
                               onChangeText={(text) => store.set('vaccineName', text)}/>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>免疫程序描述<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请输入免疫程序描述"
                               maxLength={100}
                               value={store.data.immuneProcedure}
                               multiline={true}
                               onChangeText={(text) => store.set('immuneProcedure', text)}/>
                    </Item>

                    <Item fixedLabel style={styles.pdR}>
                        <Label>用药方案及效果</Label>
                        <Input placeholder="请输入用药方案及效果"
                               maxLength={100}
                               value={store.data.dosageSchedule}
                               multiline={true}
                               onChangeText={(text) => store.set('dosageSchedule', text)}/>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>消毒方案及产品</Label>
                        <Input placeholder="请输入消毒方案及产品"
                               maxLength={50}
                               value={store.data.disinfectingPlan}
                               multiline={true}
                               onChangeText={(text) => store.set('disinfectingPlan', text)}/>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>剖检病变</Label>
                        <Input placeholder="请输入剖检病变"
                               maxLength={100}
                               value={store.data.dissectingLesion}
                               multiline={true}
                               onChangeText={(text) => store.set('dissectingLesion', text)}/>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>初步诊断<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请输入初步诊断"
                               maxLength={100}
                               value={store.data.preliminaryDiagnosis}
                               multiline={true}
                               onChangeText={(text) => store.set('preliminaryDiagnosis', text)}/>
                    </Item>
                    <Item fixedLabel last style={styles.pdR}>
                        <Label>灭鼠灭蝇措施</Label>
                        <Input placeholder="请输入灭鼠灭蝇措施"
                               maxLength={100}
                               value={store.data.derattingPlan}
                               multiline={true}
                               onChangeText={(text) => store.set('derattingPlan', text)}/>
                    </Item>
                </Form>
            </View>
        )
    }
}
export default Step4

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
        flex:1,
    },
    required:{
        color:'red',
    },
    pdR:{
        paddingRight:20
    },
    arrow:{
        color:'#ccc',
        fontSize:14,
        width:20
    },
});