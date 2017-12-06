/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import {Container, Content, Footer, FooterTab, Button, List, ListItem, CheckBox,Body, Icon, Right} from 'native-base';
import Modal from 'react-native-modalbox';
import {observer, inject} from 'mobx-react/native';
import StepBar from '../../components/bohai/StepBar';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Step1 from '../../components/bohai/Step1';
import Step2 from '../../components/bohai/Step2';
import Step3 from '../../components/bohai/Step3';
import Step4 from '../../components/bohai/Step4';
import Step5 from '../../components/bohai/Step5';

@inject('bohaiStore')
@observer
export default class BHApply extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '渤海监测',
        headerRight: <View></View>
    });

    componentDidMount () {
        var timer = setTimeout(()=>{
            request.getJson(urls.apis.BH_BREEDS, null).then((res)=>{
                bohaiStore.setBreeds(res);
            }).catch((err)=>{tools.showToast('获取品种失败')});
            request.getJson(urls.apis.BH_TEST_TYPES, null).then((res)=>{
                bohaiStore.setTestItems(res);
            }).catch((err)=>tools.showToast('获取检测项目失败'));
        }, 800);
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    onPrev=()=>{
        bohaiStore.prevStep();
    }
    onNext=()=>{
        const { step, data } = bohaiStore;
        if(step === 1){
            if(!/^1(3|4|5|7|8)\d{9}$/.test(data.phoneNo)){
                tools.showToast('请输入正确的手机号');
            }else if(!data.farmName){
                tools.showToast('请选择养殖场');
            }else{
                request.getJson(urls.apis.BH_IS_SALES, {phone: data.phoneNo}).then((res)=>{
                    if(res===true){
                        bohaiStore.nextStep();
                    }else{
                        tools.showToast('手机号不属于瑞普用户');
                    }
                }).catch((err)=>{
                    tools.showToast(err.message)
                });
            }
        }else if(step === 2){
            if(data.poultryTotalCount===0){
                tools.showToast('请输入全场养殖量')
            }else if(data.poultrySingleCount===0){
                tools.showToast('请输入单舍养殖量')
            }else if(data.poultryMonthCount===0){
                tools.showToast('请输入公司养殖量')
            }else if(data.poultryBreeds.length===0){
                tools.showToast('请选择品种');
            }else if(!data.poultryGenerations){
                tools.showToast('请选择送检代次');
            }else{
                bohaiStore.nextStep();
            }
        }else if(step === 3){
            if(data.testingSamplingList.length===0){
                tools.showToast('请添加检测项目');
            }else{
                let ok = true;
                for(var index = 0; index < data.testingSamplingList.length; index++){
                    if(data.testingSamplingList[index].samplingSystemNo===''){
                        tools.showToast('请选择检测大类');
                        ok = false;
                        break;
                    }else if(data.testingSamplingList[index].testTypeName.length===0){
                        tools.showToast('请选择检测项目');
                        ok = false;
                        break;
                    }else if(data.testingSamplingList[index].testTypeDetailNames.length===0){
                        tools.showToast('请选择样品');
                        ok = false;
                        break;
                    }else if(data.testingSamplingList[index].sendSamplingCount===0){
                        tools.showToast('请输入样品数量');
                        ok = false;
                        break;
                    }
                }
                if(ok) {
                    bohaiStore.nextStep();
                }
            }
        }else if(step === 4){
            if(data.morbidity === 0){
                tools.showToast('请输入发病率');
            }else if(data.mortality === 0){
                tools.showToast('请输入死亡率');
            }else if(!data.vaccineName){
                tools.showToast('请输入疫苗名称及厂家');
            }else if(!data.immuneProcedure){
                tools.showToast('请输入免疫程序描述');
            }else if(!data.preliminaryDiagnosis){
                tools.showToast('请输入初步诊断');
            }else{
                bohaiStore.nextStep();
            }
        }else if(step === 5){
            if(data.consultantPhoneNo===''){
                tools.showToast('请选择健康咨询顾问')
            }else if(data.salesPhoneNo===''){
                tools.showToast('请选择销售审批人')
            }else{
                //提交到数据库
                request.postJson(urls.apis.BH_POST_SHEET, data).then((res)=>{
                    alert(JSON.stringify(res));
                }).catch((err)=>{
                    tools.showToast(err.message);
                })
            }
        }
    }

    render() {
        const {step, data, currentTestItemIndex} = bohaiStore;
        return (
            <Container>
                <Content>
                    <StepBar current={step}/>
                    {step === 1?
                        <Step1 store={bohaiStore} navigation={this.props.navigation}/>
                        : null
                    }
                    {step === 2?
                        <Step2 store={bohaiStore}
                               openBreed={()=>this.refs.modal1.open()}
                               openGender={()=>this.refs.modal2.open()}/>
                        : null
                    }
                    {step === 3?
                        <Step3 store={bohaiStore}
                               chooseBig={(index)=>{
                                   bohaiStore.setCurrentCheckItem(index);
                                   this.refs.modal_big.open()
                               }}
                               chooseSub={(index)=>{
                                   if(!data.testingSamplingList[index].samplingSystemNo){
                                       tools.showToast('请先选择检测大类');
                                   }else {
                                       bohaiStore.setCurrentCheckItem(index);
                                       let o = bohaiStore.poultry_test_items.find((x)=>{
                                           return x.name === data.testingSamplingList[index].samplingSystemNo
                                       });
                                       bohaiStore.setCurrentBigItemOrg(o);
                                       this.refs.modal_sub.open();
                                   }
                               }}
                               choosePart={(index) => {
                                   if (!data.testingSamplingList[index].testTypeName.length === 0) {
                                       tools.showToast('请先选择监测项目');
                                   } else {
                                       bohaiStore.setCurrentCheckItem(index);
                                       let o = bohaiStore.poultry_test_items.find((x) => {
                                           return x.name === data.testingSamplingList[index].samplingSystemNo
                                       });
                                       let samplePartPicker = [];
                                       o.details.forEach((v) => {
                                           data.testingSamplingList[index].testTypeName.forEach((p) => {
                                               if (v.detailName === p) {
                                                   v.samplingTypeName.forEach((s) => {
                                                       samplePartPicker.indexOf(s) < 0 && samplePartPicker.push(s);
                                                   });
                                               }
                                           })
                                       });
                                       bohaiStore.setSamplingPicker(samplePartPicker);
                                       bohaiStore.setCurrentBigItemOrg(o);
                                       this.refs.modal_part.open()
                                   }
                               }
                               }
                                   />
                        : null
                    }
                    {step === 4?
                        <Step4 store={bohaiStore}/>
                        : null
                    }
                    {step === 5?
                        <Step5 store={bohaiStore}
                               navigation={this.props.navigation}
                               chooseUser={(t)=> {
                                   if(t===1)
                                       this.refs.modal_consultant.open();
                                   else
                                       this.refs.modal_sales.open();
                                }}
                            />
                        : null
                    }
                </Content>
                <Footer>
                    <FooterTab>
                        <Grid>
                            {
                                step>1?
                                <Col>
                                    <Button full info onPress={()=>this.onPrev()}>
                                        <Text>上一步</Text>
                                    </Button>
                                </Col>
                                : null
                            }
                            <Col>
                                <Button full success onPress={()=>this.onNext()}>
                                    <Text>下一步</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </FooterTab>
                </Footer>
                <Modal
                    coverScreen={true}
                    style={[styles.modal, styles.modal1]}
                    ref={"modal1"}
                    position={"center"}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.breeds.map((val, key) => (
                                    <ListItem onPress={() => bohaiStore.chooseBreeds(val)} key={key}>
                                        <CheckBox onPress={() => bohaiStore.chooseBreeds(val)} checked={bohaiStore.data.poultryBreeds.indexOf(val) > -1}/>
                                        <Body>
                                            <Text> {val}</Text>
                                        </Body>
                                    </ListItem>
                                ))}
                            </List>
                            <Button onPress={()=>this.refs.modal1.close()} block info>
                                <Text>保存</Text>
                            </Button>
                        </Content>
                    </ScrollView>
                </Modal>
                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal2"}
                    position={"center"}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.poultry_genders.map((val, key) => (
                                    <ListItem onPress={() => {
                                        bohaiStore.set('poultryGenerations', val);
                                        this.refs.modal2.close()
                                    }} key={key}>
                                        <Text> {val}</Text>
                                    </ListItem>
                                ))}
                            </List>
                        </Content>
                    </ScrollView>
                </Modal>
                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal_big"}
                    position={"center"}
                    onClosed={()=>bohaiStore.setCurrentCheckItem(-1)}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.poultry_test_items.map((val, key) => (
                                    <ListItem onPress={() => {
                                        bohaiStore.setItem(currentTestItemIndex, 'samplingSystemNo', val.name);
                                        bohaiStore.setTestItemArray('testTypeName', null);
                                        bohaiStore.setTestItemArray('testTypeDetailNames', null);
                                        this.refs.modal_big.close()
                                    }} key={key}>
                                        <Text> {val.name}</Text>
                                    </ListItem>
                                ))}
                            </List>
                        </Content>
                    </ScrollView>
                </Modal>
                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal_sub"}
                    position={"center"}
                    onClosed={()=>bohaiStore.setCurrentCheckItem(-1)}>
                    <ScrollView>
                        <Content>
                            <List>
                                {
                                    bohaiStore.currentTestItemOrg &&
                                    bohaiStore.currentTestItemOrg.details &&
                                    bohaiStore.currentTestItemOrg.details.map((val, key) => (
                                    <ListItem onPress={() => {
                                        bohaiStore.setTestItemArray('testTypeName', val.detailName)
                                    }} key={key}>
                                        <Body>
                                            <Text> {val.detailName}</Text>
                                        </Body>
                                        {
                                            bohaiStore.isTestItemDetailChecked(val.detailName)?
                                            <Right>
                                                <Icon name="ios-checkmark" />
                                            </Right>
                                            :null
                                        }
                                    </ListItem>
                                ))}
                            </List>
                            <Button onPress={()=> {
                                bohaiStore.setTestItemArray('testTypeDetailNames', null);
                                this.refs.modal_sub.close()
                            }} block info>
                                <Text>保存</Text>
                            </Button>
                        </Content>
                    </ScrollView>
                </Modal>
                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal_part"}
                    position={"center"}
                    onClosed={()=>bohaiStore.setCurrentCheckItem(-1)}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.currentSamplingPicker.map((val, key) => (
                                    <ListItem onPress={() => {
                                        bohaiStore.setTestItemArray('testTypeDetailNames', val);
                                    }} key={key}>
                                        <Body>
                                            <Text> {val}</Text>
                                        </Body>
                                        {
                                            bohaiStore.isSamplingPartChecked(val)?
                                            <Right>
                                                <Icon name="ios-checkmark" />
                                            </Right>
                                            :null
                                        }
                                    </ListItem>
                                ))}
                            </List>
                            <Button onPress={()=>{
                                this.refs.modal_part.close()
                            }} block info>
                                <Text>保存</Text>
                            </Button>
                        </Content>
                    </ScrollView>
                </Modal>
                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal_consultant"}
                    position={"center"}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.approvers &&
                                bohaiStore.approvers.consultant &&
                                bohaiStore.approvers.consultant.map((val, key) => (
                                    <ListItem onPress={() => {
                                        bohaiStore.set('consultantPhoneNo', val.consultantPhoneNo);
                                        this.refs.modal_consultant.close()
                                    }} key={key}>
                                        <Text>{val.consultantName}</Text>
                                    </ListItem>
                                ))}
                            </List>
                        </Content>
                    </ScrollView>
                </Modal>
                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal_sales"}
                    position={"center"}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.approvers &&
                                bohaiStore.approvers.salse &&
                                bohaiStore.approvers.salse.map((val, key) => (
                                    <ListItem onPress={() => {
                                        bohaiStore.set('salesPhoneNo', val.salesPhoneNo);
                                        this.refs.modal_sales.close()
                                    }} key={key}>
                                        <Text>{val.salseName}</Text>
                                    </ListItem>
                                ))}
                            </List>
                        </Content>
                    </ScrollView>
                </Modal>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modal:{

    },
    modal1:{
        //height:350,
    }
});