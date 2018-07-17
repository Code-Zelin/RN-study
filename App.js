'use strict';

import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    LayoutAnimation,
    NativeModules,
    ScrollView
} from "react-native";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


export default class App extends Component{
    constructor(){
        super();
        this.state = {
            opacity: new Animated.Value(0),
            animatedValue: 200
        }
        this.wrapperHeight = 200;
    }

    handleScroll(e) {
        LayoutAnimation.configureNext(LayoutAnimation.create(100,
            LayoutAnimation.Types.linear,
            LayoutAnimation.Properties.scaleXY));
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);w

        // console.log(e.nativeEvent.contentOffset);
        let offset = e.nativeEvent.contentOffset.y;
        if(offset <= 140) {
           /* this.setState(prev => {
                prev.animatedValue = 200 - offset;
                console.log(prev)
                return prev;
            })*/
            this.wrapper.setNativeProps({
                style: {
                    height: 200 - offset
                }
            })
        }
    }

    render()
    {
        return (
            <View style={{flex:1}}>
                <View ref={a => this.wrapper = a} style={
                        [{
                            // flex:1,
                            height: 200,
                            justifyContent: "center"
                        }, {
                            height: this.state.animatedValue
                        }]
                    }
                >
                    <Text>
                        啦啦啦啦啦啦啦啦啦啦阿联案例啦啦啦啦啦啦啦啦啦啦啦啦啦阿联案例啦啦啦啦
                        啦啦啦啦啦啦啦啦啦啦啦啦啦阿联案例啦啦啦啦啦啦啦啦啦啦啦啦啦阿联案例啦
                        啦啦啦啦啦啦啦啦阿联案例啦啦啦啦啦啦啦啦啦啦啦啦啦阿联案例啦啦啦大撒大
                    </Text>
                </View>
                <ScrollView
                    style={[styles.container]}
                    onScroll={this.handleScroll.bind(this)}
                >
                    <Text style={{ height: 2000, backgroundColor:"green" }}>
                        12312312321123112313321321132113123121231332133213112231331133211312313
                        1321133121331213123211321332113123121231332113321131123112311311323113321
                        132133121331123311323113321131323112311332113321131231123112231232211331213
                        213231133121331132113211332
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // height: 2000,
        flex:1,
        backgroundColor: '#f00'
    }
});
