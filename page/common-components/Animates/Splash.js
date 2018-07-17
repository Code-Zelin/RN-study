'use strict';
import React, { Component } from 'react';
import PropTypes from "prop-types"
import {
    StyleSheet,
    Image,
    View,
    Animated
} from 'react-native';

export default class Splash extends Component{

    static propsTypes={
        style:View.propTypes.style,
        onAnimEnd:PropTypes.func,
    }

    constructor(props){
        super(props);
        this.state={
            bounceAnimValue:new Animated.Value(1),
            opacityAnimValue:new Animated.Value(1),
        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <ScrollViewView>

            </ScrollViewView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'absolute',
        height:500,
    },

});
