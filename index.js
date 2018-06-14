import { AppRegistry } from 'react-native';
import App from './App';
import FadeInView from './components/FadeInView';
import {
    StackNavigator,
    createStackNavigator
} from 'react-navigation';

const Router = createStackNavigator(
    {
        Main: App,
        Profile: FadeInView,
    }, {
        initialRouteName: 'Main'
    }
);
AppRegistry.registerComponent('RNStudy', () => Router);
