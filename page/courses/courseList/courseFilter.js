import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    ListView,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import CourseItem from '../components/courseItem';
import api from "../../../util/api";
import Loading from "../../common-components/Modal"
import {connect} from "react-redux";


const TABLIST = ['levels', 'parts', 'equipments'];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class courseFilter extends Component {
    constructor() {
        super();
        this.state = {
            dataList: ds,
            loading: false,
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
        this._data = [];
    }

    componentDidMount() {
        this.Loading.show("正在加载");
        this.getTwoPageData();
    }

    getTwoPageData(data={}) {
        api.getCourseClassify(data, res => {
            /*this.setState(prevState => {
                prevState.dataList = res.content;
                return prevState;
            })*/
            this._data = res.content || [];
            this.setState(prev => {
                prev.dataList = prev.dataList.cloneWithRows(this._data);
                return prev;
            });
            this.Loading.close();
        })
    }

    handleClickTag(type, index, element) {
        const that = this;
        let time = 0;
        this.Loading.show("正在加载");

        new Promise((response) => {
            time = new Date().getTime();
            let tabs = this.state.TABS;
            let item = tabs[type][index];
            item.selected = !item.selected;

            // 修改state效率较低
            /*that.setState({
                TABS: tabs
            })*/

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
                <View style={{flex:1}}>
                    <View style={styles.classifyTabsWrapper}>
                        {
                            this.state.TABS.map((element, i) => (
                                <View key={i} style={[styles.classifyTabs, i===0?{marginTop:0}:{}]}>
                                    <View style={styles.classifyTabText}>
                                        <Text style={styles.classifyTabTextInner}>
                                            {
                                                i === 0 ? '难度' : i === 1 ? '部位' : '器械'
                                            }
                                        </Text>
                                    </View>

                                    <ScrollView horizontal={true} style={styles.classifyTabWrapper}>
                                        {
                                            element.map((item, index) => (
                                                    <TouchableWithoutFeedback key={index} onPress={this.handleClickTag.bind(this, i, index)}>
                                                        <LinearGradient
                                                            colors={item.selected ? ['#6fadff', '#8174ff'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
                                                            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                                                            style={[styles.classifyTabItem, item.selected ? { backgroundColor: 'transparent'} : {}]}
                                                        >
                                                            <Text style={[styles.classifyTabItemText, item.selected ? { color: '#fff' } : {}]}>{item.name}</Text>
                                                        </LinearGradient>
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
                        this.state.dataList._cachedRowCount > 0 ?
                            (
                                <ListView
                                    style={[styles.courseList, {paddingTop: 0}]}
                                    dataSource={this.state.dataList}
                                    renderRow={(rowData) => (
                                        <CourseItem navigate={navigate} baseAddress={this.props.data.baseAddress} sasToken={this.props.data.sasToken} data={rowData}/>
                                    )}
                                />
                            )
                            :
                            (
                                <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                    没有课程!!
                                </Text>
                            )
                    }
                </View>
                <Loading ref={r=>{this.Loading = r}} hudHidden = {true} hudText = {''} />
            </View>
        );
    }
}

export default connect(store => ({data: store.GetStaticReducer}))(courseFilter)

const styles = {
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
    },
}
