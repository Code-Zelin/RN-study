import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import api from '../../util/api';

import CourseItem from './components/courseItem';

const TABLIST = ['levels', 'parts', 'equipments']
export default class courseList extends Component {
    static navigationOptions = {
        title: '课程列表',
    };

    constructor() {
        super();
        this.state = {
            dataList: [],
            onePageData: {
                theme: [],
                new: []
            },
            curItem: 0,
            TABS: [
                [
                    {
                        name: 1,
                        selected: false
                    }, {
                        name: 2,
                        selected: false
                    }, {
                        name: 3,
                        selected: false
                    }, {
                        name: 4,
                        selected: false
                    }, {
                        name: 5,
                        selected: false
                    }, {
                        name: 6,
                        selected: false
                    }, {
                        name: 7,
                        selected: false
                    }, {
                        name: 8,
                        selected: false
                    }, {
                        name: 9,
                        selected: false
                    }, {
                        name: 10,
                        selected: false
                    }
                ], [
                    {
                        name: '上身',
                        selected: false
                    }, {
                        name: '腰腹',
                        selected: false
                    }, {
                        name: '下肢',
                        selected: false
                    }, {
                        name: '全身',
                        selected: false
                    }, {
                        name: '臀腿',
                        selected: false
                    }
                ], [
                    {
                        name: '有器械',
                        selected: false
                    }, {
                        name: '无器械',
                        selected: false
                    }
                ]
            ]
        }
    }

    componentDidMount() {
        this.getOnePageData();
    }

    // 获取第一屏数据
    getOnePageData() {
        this.getSeriesList();
        api.getCategory({
            name: '新手入门'
        }, res => {
            console.log('category', res);
            this.setState(prevState => {
                prevState.onePageData.new = res;
                return prevState;
            })
        })
    }

    getTwoPageData(data={}) {
        api.getCourseClassify(data, res => {
            console.log('classify', res.content);
            this.setState(prevState => {
                prevState.dataList = res.content;
                return prevState;
            })
        })
    }

    getThreePageData() {
        this.props.navigation.navigate('courses', {
            type: 'favorites'
        })
    }

    getCourseList() {
        // 获取全部课程
        api.getCourses({}, (res) => {
            console.log('courses', res);
        });
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

    getFavoriteList() {
        // 获取收藏列表
        api.FavoritesApi('GET', (res) => {
            console.log('favorites', res);
        })
    }

    handleTitleBarChange(index) {
        this.setState({
            curItem: index,
        })
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
    }

    handleClickTag(type, index) {
        const that = this;
        let time = 0
        new Promise((response) => {
            time = new Date().getTime();
            let tabs = this.state.TABS;
            let item = tabs[type][index];
            item.selected = !item.selected;

            // 只修改一个值，应该全部替换效率高一点。。猜测
            that.setState({
                TABS: tabs
            })

            return response(tabs);
        }).then(res => {
            console.log(new Date().getTime() - time);
            let data = {
                levels: [],
                parts: [],
                equipments: []
            };
            res.map((item, index) => {
                item.map((element, i) => {
                    if (element.selected) {
                        if (index == 2) {
                            data[TABLIST[index]].push(i == 0 ? '无器械' : '哑铃');
                        } else {
                            data[TABLIST[index]].push(element.name);
                        }
                    }
                })
            })
            return data;
        }).then(data => {
            that.getTwoPageData(data);
        })

    }



    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
                <LinearGradient colors={['#6FAEFF', '#8173FF']} style={styles.titleBars}>
                    {
                        ['精选', '分类', '收藏'].map((item, index) => (
                            <TouchableWithoutFeedback
                                onPress={this.handleTitleBarChange.bind(this, index)}
                                key={index}
                            >
                                <View style={styles.titleBarItem}>
                                    <View style={[styles.titleBarItemInner, this.state.curItem == index ? {
                                        opacity: 1,
                                        borderBottomColor: '#fff'
                                    } : {opacity: .6}]}>
                                        <Text style={styles.titleBarItemInnerText}>{item}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </LinearGradient>
                {
                    this.state.curItem === 0 ?
                        (
                            <ScrollView style={styles.courseList}>
                                <View style={{flex: 1, padding: 10}}>
                                    {
                                        this.state.onePageData.theme.map((item, index) => (
                                            <TouchableWithoutFeedback
                                                id={item.id} key={index}
                                                onPress={() => navigate('Courses', { type: 'series',id: item.id })}
                                                style={[styles.courseTheme, index == this.state.onePageData.theme.length - 1 ? {marginBottom: 0} : {}]}
                                            >
                                                <ImageBackground source={require('../../img/item.jpg')}
                                                                 style={{flex: 1}}>
                                                    <View style={styles.courseThemeText}>
                                                        <Text style={styles.courseThemeTextInner}>{item.name}</Text>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableWithoutFeedback>
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
                                                style={[styles.courseNewItem, index == this.state.onePageData.new.length - 1 ? {marginRight: 10} : {}]}
                                                id={item.id} key={index}>
                                                <ImageBackground source={require('../../img/item.jpg')}
                                                                 style={styles.courseNewItemBg}/>
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            </ScrollView>
                        )
                        :
                        this.state.curItem === 1 ?
                            (
                                <View style={{flex:1}}>
                                    <View style={styles.classifyTabsWrapper}>
                                        {
                                            this.state.TABS.map((element, i) => (
                                                <View key={i} style={[styles.classifyTabs, i==0?{marginTop:0}:{}]}>
                                                    <View style={styles.classifyTabText}>
                                                        <Text style={styles.classifyTabTextInner}>
                                                            {
                                                                i == 0 ? '难度' : i == 1 ? '部位' : '器械'
                                                            }
                                                        </Text>
                                                    </View>

                                                    <ScrollView horizontal={true} style={styles.classifyTabWrapper}>
                                                        {
                                                            element.map((item, index) => (
                                                                    <TouchableWithoutFeedback key={index} onPress={this.handleClickTag.bind(this, i, index)}>
                                                                        {
                                                                            item.selected ? (
                                                                            <LinearGradient
                                                                            colors={['#6fadff', '#8174ff']}
                                                                            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                                                                            style={[styles.classifyTabItem, { backgroundColor: 'transparent'}]}
                                                                            >
                                                                                <Text style={[styles.classifyTabItemText, { color: '#fff' }]}>{item.name}</Text>
                                                                            </LinearGradient>
                                                                            ) : (
                                                                            <View key={index} style={styles.classifyTabItem}>
                                                                                <Text style={styles.classifyTabItemText}>{item.name}</Text>
                                                                            </View>
                                                                            )
                                                                        }
                                                                    </TouchableWithoutFeedback>
                                                                )
                                                            )
                                                        }
                                                    </ScrollView>
                                                </View>
                                            ))
                                        }
                                    </View>
                                    {
                                        this.state.dataList.length > 0  ? (
                                            <ScrollView style={[styles.courseList, {paddingTop: 0}]}>
                                                {
                                                    this.state.dataList.map((item, index) => (
                                                        <CourseItem navigate={navigate} data={item} key={index}/>
                                                    ))
                                                }
                                            </ScrollView>
                                        ) : (
                                            <Text>
                                                没有课程
                                            </Text>
                                        )
                                    }
                                </View>
                            )
                            :
                            (
                                <ScrollView style={styles.courseList}>
                                    {
                                        this.state.dataList.map((item, index) => (
                                            <CourseItem data={item} key={index}/>
                                        ))
                                    }
                                </ScrollView>
                            )
                }
            </View>
        );
    }
}

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
        height: 140,
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden'
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

    classifyTabsWrapper: {
        paddingTop: 10,
        paddingBottom: 10
    },
    classifyTabs: {
        marginTop: 10,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    classifyTabText: {
        width: 40,
        height: 40,
        justifyContent: 'center'
    },
    classifyTabTextInner: {
        fontSize: 16,
    },
    classifyTabWrapper: {
        flex: 1,
        height: 40,
    },
    classifyTabItem: {
        flex: 1,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        backgroundColor: '#e1e1e1',
        marginRight: 10,
        justifyContent: 'center'
    },
    classifyTabItemText: {
        fontSize: 16,
        color: 'rgba(0,0,0,.3)',
    }

}
