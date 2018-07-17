import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import FadeInView from "../common-components/Animates/FadeInView";

export default class RemoteControl extends Component {
    render() {
        return (
            <View>
                <Text onPress={() => this.props.navigation.navigate("Camera")}>
                    点击扫一扫
                </Text>
                <FadeInView style={{width: 250, height: 50, backgroundColor: 'green'}}>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>渐变渐变渐变渐变渐变渐变渐变渐变渐变</Text>
                </FadeInView>

                <FadeInView style={{width: 250, height: 50, backgroundColor: 'yellow'}}>
                    <View>
                        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
                            渐变渐变渐变渐变渐变渐变渐变渐变渐变12313213
                        </Text>
                    </View>
                </FadeInView>
            </View>
        );
    }
}

const styles = {}
