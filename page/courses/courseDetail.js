import React, {Component} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import api from '../../util/api';
import util  from '../../util/util';
import { connect } from "react-redux";

const { formattingSecond, getStatic } = util;


class courseDetail extends Component {
    static navigationOptions = {
        title: '课程详情',
    };
    constructor() {
        super();
        this.state = {
            ajaxData: {},
            static: getStatic()
        }
    }

    handleLikeChange(){
        api.FavoritesApi({
            id: this.props.navigation.state.params.id
        }, this.state.ajaxData.favorite ? 'DELETE' : 'PUT', res => {
            this.setState(prevState => {
                prevState.ajaxData.favorite = !prevState.ajaxData.favorite;
                return prevState;
            })
        })
    }

    componentDidMount() {
        const { navigation } = this.props;
        let data = navigation.state.params;
        api.getCourses({
            id: data.id
        }, res => {
            console.log(res)
            this.setState({
                ajaxData: res
            })
        })
    }

    shouldComponentUpdate(prevProps, prevState) {
        console.log(prevProps === this.props, prevState===this.state);
        return true;
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <ImageBackground
                    source={{
                        uri: `${this.props.data.baseAddress}/${this.state.ajaxData.coverUrl}?${this.props.data.sasToken}`,
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache'
                        },
                        body: 'Your Body goes here'
                    }}
                    style={styles.header}
                >
                    <View style={styles.headerBg}>
                        <View style={styles.headerInner}>
                            <Text style={styles.headerTitle}>{this.state.ajaxData.name}</Text>
                            <View style={styles.headerTags}>
                                <View style={styles.headerTag}>
                                    <Text style={styles.headerTagTextOn}>{formattingSecond(this.state.ajaxData.duration)}</Text>
                                    <Text style={styles.headerTagTextDown}>时长/分钟</Text>
                                </View>
                                <View style={styles.headerTag}>
                                    <Text style={styles.headerTagTextOn}>S{this.state.ajaxData.level}</Text>
                                    <Text style={styles.headerTagTextDown}>难度</Text>
                                </View>
                                <View style={styles.headerTag}>
                                    <Text style={styles.headerTagTextOn}>{this.state.ajaxData.calorie}</Text>
                                    <Text style={styles.headerTagTextDown}>燃脂/千卡</Text>
                                </View>
                            </View>
                            <TouchableWithoutFeedback onPress={this.handleLikeChange.bind(this)}>
                                <View style={styles.headerPraise}>
                                    <ImageBackground source={this.state.ajaxData.favorite ? require('../../img/liked.png') : require('../../img/like.png')} style={styles.headerLike}/>
                                    <Text style={styles.headerPraiseText}>收藏</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.courseInfo}>
                    <Text style={styles.courseInfoTitleText}>课程介绍</Text>
                    <Text style={styles.courseInfoDetailText}>
                        {this.state.ajaxData.description}
                    </Text>
                </View>
                {
                    this.state.ajaxData.actions ? (
                        <View style={styles.courseInfo}>
                            <Text style={styles.courseInfoTitleText}>{ this.state.ajaxData.actions.length }个动作</Text>
                            <View style={styles.actionList}>
                                {
                                    this.state.ajaxData.actions.map((item, index) => (
                                        <View style={styles.actionItem} key={index}>
                                            <ImageBackground source={require('../../img/item.jpg')} style={styles.actionItemImg} />
                                            <View style={styles.actionItemRight}>
                                                <View style={styles.actionItemRightInner}>
                                                    <Text style={styles.actionItemText}>{item.name}</Text>
                                                    <Text style={styles.actionItemText}>{formattingSecond(item.duration)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    ) : (
                        <Text>
                            没有动作
                        </Text>
                    )
                }
            </ScrollView>
        );
    }
}

export default connect((store)=>({data: store.GetStaticReducer}))(courseDetail);

const styles = {
    header: {
        height: 250,
        marginBottom: 10
    },
    headerBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.3)',
        justifyContent: 'center'
    },
    headerInner: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 35,
        marginBottom: 20,
        color: '#fff'
    },
    headerTags: {
        flexDirection: 'row'
    },
    headerTag: {
        flex: 1,
        alignItems: 'center'
    },
    headerTagTextOn: {
        fontSize: 30,
        marginBottom: 15,
        color: '#fff'
    },
    headerTagTextDown: {
        fontSize: 14,
        color: '#fff'
    },
    headerPraise: {
        width: '100%',
        marginTop: 30,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingRight: 23
    },
    headerLike: {
        width: 17,
        height: 23,
        marginRight: 5
    },
    headerPraiseText: {
        color: '#fff',
        fontSize: 14,
        height: 23,
        lineHeight: 23
    },
    courseInfo: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#fff"
    },
    courseInfoTitleText: {
        fontSize: 17,
        color: '#626262',
        marginBottom: 12
    },
    courseInfoDetailText: {
        fontSize: 12,
        color: '#626262',
        lineHeight: 17
    },
    actionList: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    actionItem: {
        height: 73,
        flexDirection: 'row',
        marginBottom: 10
    },
    actionItemImg: {
        height: 73,
        width: 130,
        backgroundColor: '#fff'
    },
    actionItemRight: {
        flex: 1,
        paddingLeft: 18,
        justifyContent: 'center'
    },
    actionItemRightInner: {
    },
    actionItemText: {
        fontSize: 14,
        lineHeight: 17,
        color: '#626262'
    }

}
