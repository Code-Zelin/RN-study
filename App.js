/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    ImageBackground,
    BVLinearGradient
} from 'react-native';



const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    constructor(Props) {
        super(Props);
        this.state = {
            userInformation: {
                "id": 1228,
                "name": "Pooking",
                "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJXR9kMGqicplvGuE3ljicG0PicSS1ngQhMH7wfQHlOYnjI2mTIz3xF2YRqkpkQwZ5TXtWweUp7Pa6JQ/132",
                "gender": "Male",
                "age": 20,
                "height": 170,
                "weight": 60,
                "calorie": 0,
                "duration": null,
                "fitCount": null,
                "weeklyFitCount": null,
                "fitnessExperience": null
            }
        }
    }

    componentDidMount() {
        /*fetch("https://fitnesstest.shapejoy.com/api/courses/145", {
            method: ''get',
            headers: '{
                'Content-Type': ''application/x-www-form-urlencoded',
                'x-fit-token': ''eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNzMiLCJpc3MiOiJTVFNZRU0iLCJleHAiOjE1MjY0NjQ4Njd9.kcH0yZ1CCd730njPlyMcNMun5AIh4P8hN_pwwx_nEDg'
            },
        }).then(res=>{
            // window.alert(res.status);
        })*/
    }

    openNewPage() {

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapper} id='app'>

                <View style={styles.wrapperOn}>
                    <LinearGradient colors={['#8173FF', '#ff0000']} style={styles.linearGradient}>
                        <ImageBackground source={
                            {
                                uri: 'https://miniapp.static.shapejoy.com/miniapp/my/index/profile-bg%20.png',
                                calorie: 'only-if-cached',
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache'
                                },
                                body: 'Your Body goes here'
                            }
                        }
                                         style={styles.wrapperOnBg}
                        >
                            <View style={styles.wrapperOnWrapper}>
                                <Image source={require('./img/footer-5-on.png')} style={styles.wrapperOnImg}></Image>
                            </View>
                        </ImageBackground>
                    </LinearGradient>
                </View>

                <View style={[styles.wrapperCenter, { marginTop: -30 }]}>
                    <View style={styles.wrapperItem}>
                        <View>
                            <Text style={styles.wrapperCenterText1}>92</Text>
                            <Text style={styles.wrapperCenterText2}>我的</Text>
                        </View>
                    </View>
                    <View style={styles.wrapperItemLine}></View>
                    <View style={styles.wrapperItem}>
                        <View>
                            <Text style={styles.wrapperCenterText1}>100</Text>
                            <Text style={styles.wrapperCenterText2}>你的</Text>
                        </View>

                    </View>
                    <View style={styles.wrapperItemLine}></View>
                    <View style={styles.wrapperItem}>
                        <View>
                            <Text style={styles.wrapperCenterText1}>50</Text>
                            <Text style={styles.wrapperCenterText2}>他的</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.wrapperCenter, { marginTop:30 }]}>
                    <View style={styles.wrapperItem}>
                        <View>
                            <Image source={{
                                uri: 'https://miniapp.static.shapejoy.com/miniapp/my/index/data-icon.png',
                                calorie: 'only-if-cached',
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache'
                                },
                            }}
                                   style={{
                                       height: 50,
                                       marginLeft: 20,
                                       overflow: 'hidden'
                                   }}
                            ></Image>
                            <Text style={styles.wrapperCenterText2}>我的</Text>
                        </View>
                    </View>
                    <View style={styles.wrapperItemLine}></View>
                    <View style={styles.wrapperItem}>
                        <TouchableHighlight onPress={() => navigate('Profile', { name: 'Jane' })}>
                            <View>
                                <Text style={styles.wrapperCenterText1}>100</Text>
                                <Text style={styles.wrapperCenterText2}>你的</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                    <View style={styles.wrapperItemLine}></View>
                    <View style={styles.wrapperItem}>
                        <View>
                            <Text style={styles.wrapperCenterText1}>50</Text>
                            <Text style={styles.wrapperCenterText2}>他的</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    wrapperOn: {
        height: 200,
    },
    wrapperOnBg: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperOnWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperOnImg: {
        width: 75,
        height: 75,
        borderRadius: 37,
        overflow: 'hidden',
    },
    wrapperCenter: {
        // flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        height: 95,
        borderRadius: 20,
    },
    wrapperItem: {
        height: 95,
        flex: 1,
        color: '#000',
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center',
    },
    wrapperItemLine: {
        width: 1,
        height: 50,
        backgroundColor: '#e1e1e1',
        marginTop: 22,
    },
    wrapperCenterText1: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    wrapperCenterText2: {
        textAlign: 'center',
        opacity: .7
    }
});
