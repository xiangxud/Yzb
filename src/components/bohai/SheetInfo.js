/**
 * Created by TomChow on 17/12/9.
 */
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Switch,
    FlatList,
    Linking,
    TouchableOpacity
} from 'react-native';
import {Button, Text, Icon } from 'native-base';

export default class SheetInfo extends Component {
    render() {
        const {data, info, reports} = this.props;
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15}}>
                    <Icon name={'ios-timer'} style={{fontSize: 22, color: 'red'}}/>
                    <View style={{marginLeft: 10, flex: 1,}}>
                        <Text>当前状态：{info.status}</Text>
                        <Text>申请时间：{info.submitDate}</Text>
                    </View>
                    <Text style={{
                        borderColor: '#61eeee',
                        borderWidth: 1,
                        fontSize: 22,
                        margin: 5,
                        padding: 5,
                        borderRadius: 5
                    }}>
                        {info.animalType}
                    </Text>
                </View>
                <Text style={{padding: 5}}>
                    基本信息
                </Text>
                <View style={styles.wrapper}>
                    <View style={styles.row}>
                        <Text style={styles.title}>养殖场</Text>
                        <Text style={styles.val}>{info.farmName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>申请人手机</Text>
                        <Text style={styles.val}>{data.phoneNo}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>是否药物检测</Text>
                        <Text style={styles.val}>{data.drugTesting}</Text>
                    </View>
                </View>
                {data.animalType === '家禽' ?
                    <View style={styles.wrapper}>
                        <View style={styles.row}>
                            <Text style={styles.title}>全场养殖量</Text>
                            <Text style={styles.val}>{data.poultryTotalCount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>单舍养殖量</Text>
                            <Text style={styles.val}>{data.poultrySingleCount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>公司养殖量</Text>
                            <Text style={styles.val}>{data.poultryMonthCount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>饲养品种</Text>
                            <Text style={styles.val}>{data.poultryBreeds.join(',')}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>送检代次</Text>
                            <Text style={styles.val}>{data.poultryGenerations}</Text>
                        </View>
                    </View>
                    : null}
                {data.animalType === '家畜' ?
                    <View style={styles.wrapper}>
                        <View style={styles.row}>
                            <Text style={styles.title}>母猪存栏数</Text>
                            <Text style={styles.val}>{data.livestockTotalCount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>年出栏肥猪数</Text>
                            <Text style={styles.val}>{data.livestockYearCount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>饲养品种</Text>
                            <Text style={styles.val}>{data.livestockBreeds.join(',')}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>送检猪类别</Text>
                            <Text style={styles.val}>{data.livestockGenders.join(',')}</Text>
                        </View>
                    </View>
                    : null}
                <Text style={{padding: 5}}>
                    检测项目
                </Text>
                <View style={styles.wrapper}>
                    <FlatList
                        data={data.testingSamplingList.slice()}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item })=> <View>
                            <View style={styles.row}>
                                <Text style={styles.title}>检测大类</Text>
                                <Text>{item.samplingSystemNo}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.title}>检测项目</Text>
                                <Text>{item.testTypeName.join(',')}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.title}>检测样品</Text>
                                <Text>{item.testTypeDetailNames.join(',')}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.title}>栋舍/场名</Text>
                                <Text>{item.farmName}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.title}>送检日龄</Text>
                                <Text>{item.sendAge}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.title}>发病日龄</Text>
                                <Text>{item.morbidityAge}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.title}>样品数量</Text>
                                <Text>{item.sendSamplingCount}</Text>
                            </View>
                        </View> }
                    />
                </View>
                {data.animalType === '家畜' ?
                    <View>
                        <Text style={{padding: 5}}>
                            猪血清学记录
                        </Text>
                        <View style={styles.wrapper}>
                            <FlatList
                                data={data.pigSerumRecordList.slice()}
                                keyExtractor={(item, index) => index}
                                renderItem={({item}) => <View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>编号</Text>
                                        <Text style={styles.val}>{item.no}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>耳号</Text>
                                        <Text>{item.earNo}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>猪阶段</Text>
                                        <Text>{item.pigStage}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>死产</Text>
                                        <Text>{item.stillbirth}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>流产</Text>
                                        <Text>{item.abortion}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>干尸</Text>
                                        <Text>{item.mummy}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>空杯</Text>
                                        <Text>{item.nonpregnant}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>高烧</Text>
                                        <Text>{item.highfever}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>呼吸道疾病</Text>
                                        <Text>{item.respiratoryDisease}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>神经症状</Text>
                                        <Text>{item.nervous}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>刻板行为</Text>
                                        <Text>{item.mechanical}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>其他症状</Text>
                                        <Text>{item.othersymptom}</Text>
                                    </View>
                                </View>}
                            />
                        </View>
                    </View>
                    : null}
                <Text style={{padding: 5}}>
                    疫情及治疗询问
                </Text>
                <View style={styles.wrapper}>
                    <View style={styles.row}>
                        <Text style={styles.title}>发病率</Text>
                        <Text style={styles.val}>{data.morbidity}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>死亡率</Text>
                        <Text style={styles.val}>{data.mortality}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>临床症状描述</Text>
                        <Text style={styles.val}>{data.clinicalSymptoms}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>疫苗名称及厂家</Text>
                        <Text style={styles.val}>{data.vaccineName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>免疫程序描述</Text>
                        <Text style={styles.val}>{data.immuneProcedure}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>用药方案及效果</Text>
                        <Text style={styles.val}>{data.dosageSchedule}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>消毒方案及产品</Text>
                        <Text style={styles.val}>{data.disinfectingPlan}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>剖检病变</Text>
                        <Text style={styles.val}>{data.dissectingLesion}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>初步诊断</Text>
                        <Text style={styles.val}>{data.preliminaryDiagnosis}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>灭鼠灭蝇措施</Text>
                        <Text style={styles.val}>{data.derattingPlan}</Text>
                    </View>
                </View>
                <Text style={{padding: 5}}>
                    审批人信息
                </Text>
                <View style={styles.wrapper}>
                    <View style={styles.row}>
                        <Text style={styles.title}>健康咨询顾问</Text>
                        <Text style={styles.val}>{data.consultantPhoneNo}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.title}>销售审批人</Text>
                        <Text style={styles.val}>{data.salesPhoneNo}</Text>
                    </View>
                </View>

                {reports.length?
                    <View style={{alignSelf:'center', justifyContent:'center', marginTop:10,}}>
                        {reports.map((item, i)=> {
                            <Button rounded success onPress={()=>{Linking.openURL(item.fileUrl).catch(err => console.error('An error occurred', err));}}>
                                <Text>{item.fileName}</Text>
                            </Button>
                        })}
                    </View>
                    :null}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginBottom:10,
    },
    wrapper:{
        backgroundColor:'#fff',
    },
    row: {
        flexDirection:'row',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#e0e0e0'
    },
    title:{
        fontSize:14,
        color:'#909090',
        flex:1,
    },
    val:{
        fontSize:14,
        flex:3,
        textAlign:'right'
    }
});