import React, { Component } from "react";
import { AppRegistry } from 'react-native';

import App from './App';
import CourseList from './page/courses/courseList/courseList';
import CourseStar from './page/courses/courseList/courseStar';
import CourseFilter from './page/courses/courseList/courseFilter';

import CourseDetail from './page/courses/courseDetail';
import Courses from './page/courses/courses';
import api from './util/api';
import configureStore from "./util/store"
import { Provider } from "react-redux";

import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator
} from 'react-navigation';
import RemoteControl from "./page/remoteControl/RemoteControl";
import Camera from "./page/common-components/Camera";


const store = configureStore();

api.getStatic(store.dispatch);

// 正文开始
const CourseListNav = createMaterialTopTabNavigator(
    {
        CourseList: {
            screen: CourseList,
            navigationOptions: ()=>({
                title: `精选`,
                headerBackTitle: null
            })
        },
        CourseFilter: {
            screen: CourseFilter,
            navigationOptions: ()=>({
                title: `分类`,
                headerBackTitle: null
            })
        },
        CourseStar: {
            screen: CourseStar,
            navigationOptions: ()=>({
                title: `收藏`,
                headerBackTitle: null
            })
        }
    }
)
const CourseNav = createStackNavigator(
    {
        List: {
            screen: CourseListNav,
            navigationOptions: ()=>({
                title: `课程列表`,
                headerBackTitle: null
            })
        },
        CourseDetail: {
            screen: CourseDetail,
            navigationOptions: ()=>({
                title: `课程详情`,
                headerBackTitle: null
            })
        },
        Courses
    }, {
        initialRouteName: 'List'
    }
);
const ControlNav = createStackNavigator(
    {
        Control: {
            screen: RemoteControl,
            navigationOptions: ()=>({
                title: "遥控器",
                headerBackTitle: null
            })
        },
        Camera: {
            screen: Camera,
            navigationOptions: ()=>({
                title: "扫一扫",
                headerBackTitle: null
            })
        }

    }
)
const MainNav = createStackNavigator(
    {
        Main: {
            screen: App,
            navigationOptions: ()=>({
                title: `Main——我的`,
                headerBackTitle: null
            })
        },
    }
)

const TabNavigator = createBottomTabNavigator(
    {
        Main: MainNav,
        Courses: CourseNav,
        Control: ControlNav
    }
)

class Router extends Component{
    render(){
        return (
            <Provider store={store}>
                <TabNavigator />
            </Provider>
        )
    }
}
AppRegistry.registerComponent('RNStudy', () => Router);
