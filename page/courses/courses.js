import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import CourseItem from './components/courseItem';

export default class Courses extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        const { type, id } = this.props;
        const that = this;
        if (type == 'series') {
            api.getCourses({
                id: id
            }, res => {
                that.setState({
                    list: res
                })
            })
        } else {
             api.FavoritesApi('GET', res => {
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
