import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

export default class courseTab extends Component {
    render() {
        return (
            <View>
                element.map((item, index) => (
                        <TouchableWithoutFeedback key={index} onPress={this.handleClickTag.bind(this, i, index)}>
                            <LinearGradient
                                colors={item.selected ? ['#6fadff', '#8174ff'] : ['rgba(0,0,0,0)']}
                                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
                                style={[styles.classifyTabItem, item.selected ? { backgroundColor: 'transparent'} : {}]}
                            >
                                <Text style={[styles.classifyTabItemText, item.selected ? { color: '#fff' } : {}]}>{item.name}</Text>
                            </LinearGradient>
                        </TouchableWithoutFeedback>
                    )
                )
            </View>
        );
    }
}

const styles = {}
