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
import {Container, Content, Footer, FooterTab, Button, List, ListItem, CheckBox,Body,} from 'native-base';
import Modal from 'react-native-modalbox';
import {observer, inject} from 'mobx-react/native';
import StepBar from '../../components/bohai/StepBar';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Step1 from '../../components/bohai/Step1';
import Step2 from '../../components/bohai/Step2';
import Step3 from '../../components/bohai/Step3';

@inject('bohaiStore')
@observer
export default class BHApply extends Component {
    constructor(props){
        super(props);
        this.state = {
            hideFooter: false,
        }
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '渤海监测',
        headerRight: <View></View>
    });

    componentDidMount () {
        request.getJson(urls.apis.BH_BREEDS, null).then((res)=>{
            bohaiStore.setBreeds(res);
        }).catch((err)=>{});
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
                bohaiStore.nextStep();
            }
        }else if(step === 2){
            if(data.poultryBreeds.length===0){
                tools.showToast('请选择品种');
            }else if(!data.poultryGenerations){
                tools.showToast('请选择送检代次');
            }else{
                bohaiStore.nextStep();
            }
        }
    }

    render() {
        const {step} = bohaiStore;
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
                        <Step3 store={bohaiStore}/>
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
                            <Button onPress={()=>this.refs.modal1.close()} block>
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