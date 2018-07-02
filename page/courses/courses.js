import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import CourseItem from './components/courseItem';
import api from "../../util/api"

export default class Courses extends Component {
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
        console.log("ssdsdsadsadasdas", this.props.navigation.state.params);
        const { type, id } = this.props.navigation.state.params;
        const that = this;
        if (type == 'series') {
            api.getCourses({
                id: id
            }, res => {
                console.log(res)
                if(res.status === 200 ) {
                    that.setState({
                        list: res
                    })
                }else{
                    alert("错了！！！")
                }
            })
        } else {
             api.FavoritesApi('GET', res => {
                 console.log("收藏", res);
                 that.setState({
                     list: res
                 })
             })
        }
    }
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                {
                    this.state.list.map((item, index) => (
                        <CourseItem data={item} navigate={navigate} key={index} />
                    ))
                }
            </ScrollView>
        );
    }
}

const styles = {}
