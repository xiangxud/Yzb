/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Alert,
} from 'react-native'
import {Container, Content, Footer, FooterTab, Button, List, ListItem, Body,
    Text, Icon, Right} from 'native-base';
import Modal from 'react-native-modalbox';
import {observer, inject} from 'mobx-react/native';
import StepBar from '../../components/bohai/StepBar';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Step1 from '../../components/bohai/Step1';
import Step2 from '../../components/bohai/Step2';
import Step3 from '../../components/bohai/Step3';
import Step4 from '../../components/bohai/Step4';
import Step5 from '../../components/bohai/Step5';
import Step6 from '../../components/bohai/Step6';
import {MaskLoading} from '../../components';

@inject('bohaiStore')
@observer
export default class BHApply extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '填写送检申请',
        headerRight: <Button transparent light onPress={()=>navigation.goBack()}><Text>取消申请</Text></Button>
    });

    componentDidMount () {
        let animalType = this.props.navigation.state.params.type;
        bohaiStore.setFetch(true);
        if(animalType){
            bohaiStore.set('animalType', animalType);
        }
        var timer = setTimeout(()=>{
            this._fetch();
        }, 1000);
    }
    _fetch = () => {
        if(bohaiStore.data.animalType==='家禽') {
            request.getJson(urls.apis.BH_BREEDS, null).then((res) => {
                bohaiStore.setBreeds(res);
            }).catch((err) => tools.showToast(err.message));
        }
        request.getJson(urls.apis.BH_TEST_TYPES, null).then((res)=>{
            bohaiStore.setTestItems(res);
        }).catch((err)=>tools.showToast(err.message));
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
            if(data.animalType==='家禽') {
                if (data.poultryTotalCount === 0) {
                    tools.showToast('请输入全场养殖量')
                } else if (data.poultrySingleCount === 0) {
                    tools.showToast('请输入单舍养殖量')
                } else if (data.poultryMonthCount === 0) {
                    tools.showToast('请输入公司养殖量')
                } else if (data.poultryBreeds.length === 0) {
                    tools.showToast('请选择品种');
                } else if (!data.poultryGenerations) {
                    tools.showToast('请选择送检代次');
                } else {
                    bohaiStore.nextStep();
                }
            }else{
                if(!data.livestockTotalCount){
                    tools.showToast('请输入母猪存栏数')
                }else if(!data.livestockYearCount){
                    tools.showToast('请输入年出栏肥猪数')
                }else if(data.livestockBreeds.length===0){
                    tools.showToast('请选择饲养品种')
                }else if(data.livestockGenders.length===0){
                    tools.showToast('请选择送检猪类别')
                }else{
                    bohaiStore.nextStep();
                }
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
                ok && data.animalType==='家禽'? bohaiStore.nextStep(2): ok && bohaiStore.nextStep();
            }
        }else if(step === 4){
            if(data.pigSerumRecordList.length===0){
                tools.showToast('请添加猪场血清学调查');
            }else{
                let ok = true;
                for(var index = 0; index < data.pigSerumRecordList.length; index++){
                    if(data.pigSerumRecordList[index].no===''){
                        tools.showToast('请输入编号');
                        ok = false;
                        break;
                    }else if(data.pigSerumRecordList[index].pigStage===''){
                        tools.showToast('请选择猪阶段');
                        ok = false;
                        break;
                    }else if(data.pigSerumRecordList[index].othersymptom===''){
                        tools.showToast('请输入其他症状');
                        ok = false;
                        break;
                    }
                }
                ok && bohaiStore.nextStep();
            }
        }else if(step === 5){
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
        }else if(step === 6){
            if(data.consultantPhoneNo===''){
                tools.showToast('请选择健康咨询顾问')
            }else if(data.salesPhoneNo===''){
                tools.showToast('请选择销售审批人')
            }else{
                //提交到数据库
                bohaiStore.setFetch(true);
                request.postJson(urls.apis.BH_POST_SHEET, data).then((res)=>{
                    bohaiStore.setFetch(false);
                    Alert.alert(
                        '成功提交',
                        '您的检测申请单已经成功提交，请耐心等待审核。',
                        [
                            {text: '确定', onPress: () => this.props.navigation.goBack()},
                        ]
                    );
                }).catch((err)=>{
                    tools.showToast(err.message);
                })
            }
        }
    }

    render() {
        const {step, data, currentItemIndex, currentPigRecordIndex} = bohaiStore;
        return (
            <Container>
                <Content>
                    <StepBar current={step} animalType={data.animalType}/>
                    {step === 1?
                        <Step1 store={bohaiStore} navigation={this.props.navigation}/>
                        : null
                    }
                    {step === 2?
                        <Step2 store={bohaiStore}
                               openBreed={()=>this.refs.modal1.open()}
                               openGender={()=>this.refs.modal2.open()}
                               openPigBreed={()=>this.refs.modal_pig_breed.open()}
                               openPigGender={()=>this.refs.modal_pig_genders.open()}/>
                        : null
                    }
                    {step === 3?
                        <Step3 store={bohaiStore}
                               chooseBig={(index)=>{
                                   bohaiStore.setCurrentItemIndex(index);
                                   this.refs.modal_big.open()
                               }}
                               chooseSub={(index)=>{
                                   if(!data.testingSamplingList[index].samplingSystemNo){
                                       tools.showToast('请先选择检测大类');
                                   }else {
                                       bohaiStore.setCurrentItemIndex(index);
                                       let o = (data.animalType==='家禽'? bohaiStore.poultry_test_items: bohaiStore.livestock_test_items).find((x)=>{
                                           return x.name === data.testingSamplingList[index].samplingSystemNo
                                       });
                                       bohaiStore.setCurrentBigItemOrg(o);
                                       this.refs.modal_sub.open();
                                   }
                               }}
                               choosePart={(index) => {
                                   if (!data.testingSamplingList[index].testTypeName.length === 0) {
                                       tools.showToast('请先选择检测项目');
                                   } else {
                                       bohaiStore.setCurrentItemIndex(index);
                                       let o = (data.animalType==='家禽'? bohaiStore.poultry_test_items: bohaiStore.livestock_test_items).find((x) => {
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
                        <Step4 store={bohaiStore}
                               choosePigStage={(index)=>{
                                   bohaiStore.setCurrentItemIndex(index, 'pig_record');
                                   this.refs.modal_pigstage.open();
                               }}/>
                        : null
                    }
                    {step === 5?
                        <Step5 store={bohaiStore}/>
                        : null
                    }
                    {step === 6?
                        <Step6 store={bohaiStore}
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
                                    <Button full light large onPress={()=>this.onPrev()}>
                                        <Text>上一步</Text>
                                    </Button>
                                </Col>
                                : null
                            }
                            <Col>
                                <Button full info large onPress={()=>this.onNext()}>
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
                                {bohaiStore.picker_poultry_breeds.map((val, key) => (
                                    <ListItem onPress={() => bohaiStore.setDataArray('poultryBreeds', val)} key={key}>
                                        <Body>
                                            <Text> {val}</Text>
                                        </Body>
                                        {
                                            bohaiStore.inDataArray('poultryBreeds', val)?
                                            <Right>
                                                <Icon name="ios-checkmark" />
                                            </Right>
                                            :null
                                        }
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
                                {bohaiStore.picker_poultry_genders.map((val, key) => (
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
                    onClosed={()=>bohaiStore.setCurrentItemIndex(-1)}>
                    <ScrollView>
                        <Content>
                            <List>
                                {
                                    (data.animalType==='家禽'? bohaiStore.poultry_test_items: bohaiStore.livestock_test_items).map((val, key) => (
                                    <ListItem onPress={() => {
                                        bohaiStore.setItem(currentItemIndex, 'samplingSystemNo', val.name);
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
                    onClosed={()=>bohaiStore.setCurrentItemIndex(-1)}>
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
                    onClosed={()=>bohaiStore.setCurrentItemIndex(-1)}>
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
                                {bohaiStore.picker_approvers &&
                                bohaiStore.picker_approvers.consultant &&
                                bohaiStore.picker_approvers.consultant.map((val, key) => (
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
                                {bohaiStore.picker_approvers &&
                                bohaiStore.picker_approvers.salse &&
                                bohaiStore.picker_approvers.salse.map((val, key) => (
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

                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal_pig_breed"}
                    position={"center"}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.picker_livestock_breeds.map((val, key) => (
                                    <ListItem onPress={() => bohaiStore.setDataArray('livestockBreeds', val)} key={key}>
                                        <Body>
                                        <Text> {val}</Text>
                                        </Body>
                                        {
                                            bohaiStore.inDataArray('livestockBreeds', val)?
                                                <Right>
                                                    <Icon name="ios-checkmark" />
                                                </Right>
                                                :null
                                        }
                                    </ListItem>
                                ))}
                            </List>
                            <Button onPress={()=>this.refs.modal_pig_breed.close()} block info>
                                <Text>保存</Text>
                            </Button>
                        </Content>
                    </ScrollView>
                </Modal>
                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal_pig_genders"}
                    position={"center"}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.picker_livestock_genders.map((val, key) => (
                                    <ListItem onPress={() => bohaiStore.setDataArray('livestockGenders', val)} key={key}>
                                        <Body>
                                        <Text> {val}</Text>
                                        </Body>
                                        {
                                            bohaiStore.inDataArray('livestockGenders', val)?
                                                <Right>
                                                    <Icon name="ios-checkmark" />
                                                </Right>
                                                :null
                                        }
                                    </ListItem>
                                ))}
                            </List>
                            <Button onPress={()=>this.refs.modal_pig_genders.close()} block info>
                                <Text>保存</Text>
                            </Button>
                        </Content>
                    </ScrollView>
                </Modal>
                <Modal
                    coverScreen={true}
                    style={styles.modal}
                    ref={"modal_pigstage"}
                    position={"center"}
                    onClosed={()=>bohaiStore.setCurrentItemIndex(-1, 'pig_record')}>
                    <ScrollView>
                        <Content>
                            <List>
                                {bohaiStore.picker_livestock_pig_stage.map((val, key) => (
                                    <ListItem onPress={() => {
                                        bohaiStore.setItem(currentPigRecordIndex, 'pigStage', val, 'pigSerumRecordList');
                                        this.refs.modal_pigstage.close();
                                    }} key={key}>
                                        <Body>
                                            <Text> {val}</Text>
                                        </Body>
                                    </ListItem>
                                ))}
                            </List>
                        </Content>
                    </ScrollView>
                </Modal>
                <MaskLoading show={bohaiStore.isFetching}/>
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