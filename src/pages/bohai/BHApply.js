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
import {Container, Content, Footer, FooterTab, Button} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import StepBar from '../../components/bohai/StepBar';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Step1 from '../../components/bohai/Step1';
import Step2 from '../../components/bohai/Step2';

@inject('bohaiStore')
@observer
export default class BHApply extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '渤海监测',
        headerRight: <View></View>
    });

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
                        <Step2 store={bohaiStore} navigation={this.props.navigation}/>
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
            </Container>
        )
    }
}