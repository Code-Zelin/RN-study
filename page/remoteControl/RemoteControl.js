import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

export default class RemoteControl extends Component {
    render() {
        return (
            <View>
                <Text onPress={() => this.props.navigation.navigate("Camera")}>
                    点击扫一扫
                </Text>
            </View>
        );
    }
}

const styles = {}
