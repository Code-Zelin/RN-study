import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';
import { connect } from "react-redux";

import Loading from "../../common-components/Modal"

import api from '../../../util/api';




class courseList extends Component {
    static navigationOptions = {
        title: '课程列表',
    };

    constructor() {
        super();
        this.state = {
            onePageData: {
                theme: [],
                new: []
            },
            curItem: 0,
            loading: false,
        }
        console.log(this.props)
    }

    componentDidMount() {
        this.Loading.show("正在加载");
        this.getOnePageData();
    }



    // 获取第一屏数据
    getOnePageData() {
        this.getSeriesList();
        api.getCategory({
            name: '新手入门'
        }, res => {
            this.setState(prevState => {
                prevState.onePageData.new = res;
                return prevState;
            })
            this.Loading.close();
        })
    }

    getSeriesList() {
        // 获取系列课程
        api.getSeries((res) => {
            console.log('series', res);
            this.setState(prevState => {
                prevState.onePageData.theme = res;
                return prevState;
            })
        })
    }



    /*handleTitleBarChange(index) {
        this.setState({
            curItem: index,
        })
        this.Loading.show("正在加载");
        switch (index) {
            case 0:
                this.getOnePageData();
                break;
            case 1:
                this.getTwoPageData();
                break;
            default:
                this.getOnePageData();
                break;
        }
    }*/



    /*shouldComponentUpdate(prevState, prevProps) {
        console.log(this.state, this.state === prevState, this.props, this.props === prevProps);
        return true;
    }*/

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
                {/*<LinearGradient colors={['#6FAEFF', '#8173FF']} style={styles.titleBars}>
                    {
                        ['精选', '分类', '收藏'].map((item, index) => (
                            <TouchableWithoutFeedback
                                onPress={this.handleTitleBarChange.bind(this, index)}
                                key={index}
                            >
                                <View style={styles.titleBarItem}>
                                    <View style={[styles.titleBarItemInner, this.state.curItem === index ? {
                                        opacity: 1,
                                        borderBottomColor: '#fff'
                                    } : {opacity: .6}]}>
                                        <Text style={styles.titleBarItemInnerText}>{item}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </LinearGradient>*/}
                <ScrollView style={styles.courseList}>
                    <View style={{flex: 1, padding: 10}}>
                        {
                            this.state.onePageData.theme.map((item, index) => (

                                <ImageBackground source={{
                                    uri: `${this.props.data.baseAddress}/${item.coverUrl}?${this.props.data.sasToken}`,
                                    method: 'POST',
                                }} style={[styles.courseTheme, index===(this.state.onePageData.theme.length - 1) ? {marginBottom: 0} : {}]} key={index}>
                                    <TouchableWithoutFeedback
                                        onPress={() => navigate('Courses', {type: 'series', id: item.id})}
                                        style={{ flex: 1}}
                                    >
                                    <View style={styles.courseThemeText}>
                                        <Text style={styles.courseThemeTextInner}>{item.name}</Text>
                                    </View>
                                    </TouchableWithoutFeedback>
                                </ImageBackground>
                            ))
                        }
                    </View>
                    <View style={styles.courseTitle}>
                        <Text style={styles.courseTitleText}>新手入门</Text>
                    </View>
                    <ScrollView style={styles.courseNewList} horizontal={true}>
                        {
                            this.state.onePageData.new.map((item, index) => (
                                <View
                                    style={[styles.courseNewItem, (index === this.state.onePageData.new.length - 1) ? {marginRight: 10} : {}]}
                                    id={item.id} key={index}>
                                    <ImageBackground source={require('../../../img/item.jpg')}
                                                     style={styles.courseNewItemBg}/>
                                </View>
                            ))
                        }
                    </ScrollView>
                </ScrollView>
                <Loading ref={r=>{this.Loading = r}} hudHidden = {true} hudText = {''} />
            </View>
        );
    }
}

const mapPropsStore = (store) => {
    return {
        data: store.GetStaticReducer
    };
};
export default connect(mapPropsStore)(courseList);

const styles = {
    titleBars: {
        height: 60,
        paddingTop: 20,
        flexDirection: 'row'
    },
    titleBarItem: {
        flex: 1,
        alignItems: 'center'
    },
    titleBarItemInner: {
        flex: 1,
        width: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#8173FF'
    },
    titleBarItemInnerText: {
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    courseList: {
        flex: 1,
        paddingTop: 5,
    },
    courseTheme: {
        flex: 1,
        height: 100,
        marginBottom: 10
    },
    courseThemeText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    courseThemeTextInner: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    courseTitle: {
        height: 40,
        borderColor: '#ccc',
        borderTopWidth: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    courseTitleText: {
        fontSize: 16,
    },
    courseNewList: {
        flex: 1,
        height: 200,
        marginBottom: 10,
        paddingRight: 10,
    },
    courseNewItem: {
        flex: 1,
        width: 156,
        marginLeft: 10
    },
    courseNewItemBg: {
        flex: 1,
    },


}
