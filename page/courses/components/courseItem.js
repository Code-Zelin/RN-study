import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableWithoutFeedback} from 'react-native'
import util from '../../../util/util';
const { formattingSecond } = util;

export default class courseItem extends Component {
    render() {
        const { data: propsData, navigate, baseAddress, sasToken } = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => navigate('CourseDetail', { id: propsData.id })} style={{ flex: 1 }}>
                <View style={styles.courseItem}>
                    <ImageBackground source={{
                        uri: `${baseAddress}/${propsData.coverUrl}?${sasToken}`,
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache'
                        },
                        body: 'Your Body goes here'
                    }} style={styles.courseItemBg}>
                        <View style={styles.courseItemShade}>
                            <View>
                                <Text style={styles.courseItemText}
                                      numberOfLines={1}
                                      ellipsizeMode='middle'>{propsData.name}</Text>

                                <Text style={styles.courseItemTextDown}>时长：{formattingSecond(propsData.duration)}  难度：s{propsData.level}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}


const styles = {
    courseItem: {
        flex: 1,
        padding: 10,
        paddingTop: 0,
        borderRadius: 10,
        overflow: 'hidden'
    },
    courseItemBg: {
        flex: 1,
        height: 120,
        // justifyContent: 'center',
    },
    courseItemShade: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.3)',
        paddingLeft: 12,
        justifyContent: 'center',
    },
    courseItemText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#fff',
        marginBottom: 32,
        fontFamily: 'hinted-huxiaobo-gdh'
    },
    courseItemTextDown: {
        fontSize: 14,
        color: '#fff',
    }
}
