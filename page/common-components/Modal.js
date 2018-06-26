import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    Platform,
    ActivityIndicator,
    Modal
} from 'react-native';
// import Modal from 'react-native-root-modal';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: !this.props.hudHidden,
            hudText:!this.props.hudText,
        }
    }
    close() {
        // alert('关闭')
        if (Platform.OS === 'android') {
            // setTimeout(()=>{
                this.setState({modalVisible: false});
            // },500)
        }else {
            this.setState({modalVisible: false});
        }
    }
    show(textStr) {
        this.setState({modalVisible: true,hudText:textStr});
    }
    render() {
        if (!this.state.modalVisible) {
            return null
        }
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
            >
                <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
                    <View style={{borderRadius: 10,backgroundColor:'rgba(0,0,0,0.5)',width:100,height:100,alignItems:'center'}}>
                        <ActivityIndicator
                            animating={true}
                            color = 'white'
                            style={{
                                marginTop:20,
                                width: 60,
                                height: 60,
                            }}
                            size="large" />
                        <Text allowFontScaling={false} style={{fontSize:15,color: 'white'}}>{this.state.hudText}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

// Loading.PropTypes = {
//     hudHidden: PropTypes.bool.isRequired,
//     hudText: PropTypes.string,
// }

export default Loading;
