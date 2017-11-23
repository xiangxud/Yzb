import React, {Component} from 'react';
import
{
    View,
    Text ,
    Button,
    TextInput,
    WebView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {observer,inject} from 'mobx-react/native';
import SearchBar from '../components/common/SearchBar';
import TabHead from '../components/common/tabHead';
import BreedList from '../components/common/BreedList';

@inject('hotBreedStore')
@observer
export default class HotBreed extends Component{
    static navigationOptions = ({navigation})=>({
        header:(<SearchBar goBack={navigation.goBack} navigate={navigation.navigate} onChanged={
            (txt)=> navigation.state.params.onChanged(txt)
        } Title="养殖头条"></SearchBar>)
    });
    constructor(props){
        const {navigation} = props;
        super(props);
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigation.setParams({
                onChanged : this.onSearchTxtChanged.bind(this)
            });
        }, 2000);
    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }

    onSearchTxtChanged(txt){
        const {hotBreedStore} = this.props;
        hotBreedStore.onFilter(txt);
    }

    componentWillMount()
    {
        this.onItemPress.bind(this);
        const {hotBreedStore} = this.props;
        hotBreedStore.onChanged(hotBreedStore.labels[0]);
    }

    onItemPress(code,title){
        const {navigation} = this.props;
        navigation.navigate("InfoDetail",{ code : code , title:title })
    }

    renderList(){
        const {hotBreedStore} = this.props;

        if(hotBreedStore.currentLabel == hotBreedStore.labels[0]){
            return <BreedList source={hotBreedStore.data0} onItemPress={(c,t) => this.onItemPress(c,t)}>
            </BreedList>
        }else if(hotBreedStore.currentLabel == hotBreedStore.labels[1]){
            return <BreedList source={hotBreedStore.data1} onItemPress={(c,t) => this.onItemPress(c,t)}>
            </BreedList>
        }else if(hotBreedStore.currentLabel == hotBreedStore.labels[2]){
            return <BreedList source={hotBreedStore.data2} onItemPress={(c,t) => this.onItemPress(c,t)}>
            </BreedList>
        }
    }

    render(){
        const {hotBreedStore} = this.props;
        return <View style={{flex:1}}>
            <View style={style.tab}>
                <TabHead items={[...hotBreedStore.labels]} onChanged={(label)=>{
                    const {hotBreedStore} = this.props;
                    hotBreedStore.onChanged(label);
                }}>
                </TabHead>
            </View>
                {
                    this.renderList()
                }
        </View>
    }
}

const style = StyleSheet.create({
    tab : {
        height:60,
        flexDirection:'row',
        alignItems:'stretch'
    },
});