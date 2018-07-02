import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import api from "../../../util/api";
import CourseItem from '../components/courseItem';
import Loading from "../../common-components/Modal"

export default class courseStar extends Component {

    static navigationOptions = {
        title: '收藏',
    };


    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount() {

        this.Loading.show("正在加载");
        const { type, id } = this.props;
        const that = this;
        if (type == 'series') {
            // navigationOptions = "列表"
            api.getCourses({
                id: id
            }, res => {
                that.setState({
                    list: res
                })
                this.Loading.close();
            })
        } else {
            api.FavoritesApi('GET', res => {
                that.setState({
                    list: res
                })
                this.Loading.close();
            })
        }
    }

    getFavoriteList() {
        this.Loading.show("正在加载");
        // 获取收藏列表
        api.FavoritesApi('GET', (res) => {
            console.log('favorites', res);
            this.setState({
                dataList: res
            })
            this.Loading.close();
        })
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f1f1f1'}}>
                <ScrollView style={styles.courseList}>
                    {
                        this.state.list.map((item, index) => (
                            <CourseItem data={item} key={index}/>
                        ))
                    }
                </ScrollView>
                <Loading ref={r=>{this.Loading = r}} hudHidden = {true} hudText = {''} />
            </View>
        );
    }
}

const styles = {
    courseList: {
        // flex: 1,
        paddingTop: 5,
    },
}
