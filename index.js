import { AppRegistry } from 'react-native';

import App from './App';
import CourseList from './page/courses/courseList';
import CourseDetail from './page/courses/courseDetail';
import Courses from './page/courses/courses';
import api from './util/api';

import {
    createStackNavigator
} from 'react-navigation';

api.getStatic();

const Router = createStackNavigator(
    {
        Main: App,
        List: CourseList,
        CourseDetail,
        Courses
    }, {
        initialRouteName: 'List'
    }
);
AppRegistry.registerComponent('RNStudy', () => Router);
