import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import RNFS from 'react-native-fs';


export default class Fs extends Component {
    constructor(){
        super();
        this.state = {
            readTxtResult: ''
        }
    }
    /*下载文件*/
    downloadFile() {
        // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

        // 图片
        // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.jpg`;
        // const formUrl = 'http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg';

        // 文件
        // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.zip`;
        // const formUrl = 'http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip';

        // 视频
        // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp4`;
        // http://gslb.miaopai.com/stream/SnY~bbkqbi2uLEBMXHxGqnNKqyiG9ub8.mp4?vend=miaopai&
        // https://gslb.miaopai.com/stream/BNaEYOL-tEwSrAiYBnPDR03dDlFavoWD.mp4?vend=miaopai&
        // const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';

        // 音频
        const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/${((Math.random() * 1000) | 0)}.mp3`;
        // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
        const formUrl = 'http://wvoice.spriteapp.cn/voice/2015/0818/55d2248309b09.mp3';

        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {

                let pro = res.bytesWritten / res.contentLength;

                this.setState({
                    progressNum: pro,
                });
            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                console.log('success', res);

                console.log('file://' + downloadDest)

            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }

    }

    /*将文本写入本地 txt*/
    writeFile() {
        // create a path you want to write to
        const path = RNFS.ExternalStorageDirectoryPath + '/test.txt';

        // write the file
        RNFS.writeFile(path, '这是一段文本，YES', 'utf8')
            .then((success) => {
                console.log('path', path);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    /*读取txt文件内容*/
    readFile() {
        // create a path you want to delete
        const path = RNFS.ExternalStorageDirectoryPath + '/test.txt';

        return RNFS.readFile(path)
            .then((result) => {
                console.log(result);

                this.setState({
                    readTxtResult: result,
                })
            })
            .catch((err) => {
                console.log(err.message);

            });
    }
    /*在已有的txt上添加新的文本*/
    appendFile() {
        const path = RNFS.MainBundlePath + '/test.txt';

        return RNFS.appendFile(path, '新添加的文本', 'utf8')
            .then((success) => {
                console.log('success');
            })
            .catch((err) => {
                console.log(err.message);

            });
    }

    /*删除文件*/
    deleteFile() {
        // create a path you want to delete
        const path = RNFS.MainBundlePath + '/test.txt';

        return RNFS.unlink(path)
            .then(() => {
                console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                console.log(err.message);
            });
    }

    /*上传文件 only iOS*/
    uploadFile() {
        const uploadSrc = `${RNFS.MainBundlePath}/test.txt`;

        const uploadUrl = 'http://buz.co/rnfs/upload-tester.php';

        const options = {
            toUrl: uploadUrl,
            files: [{name: 'myfile', filename: 'test.txt', filepath: uploadSrc, filetype: 'text/plain'}],
            background: true,
            method: 'POST', // PUT
            begin: (res) => {
                console.log('begin', res);
            },
            progress: (res) => {
                console.log('progress', res);
            }
        };

        const ret = RNFS.uploadFiles(options);

        return ret.promise.then(res => {
            const response = JSON.parse(res.body);
            console.log(response);

        })
            .catch(err => {
                console.log('err', err);
            });
    }

    render() {
        return (
            <View>
                <Text onPress={this.downloadFile.bind(this)} style={styles.text}>downloadFile</Text>
                <Text onPress={this.writeFile.bind(this)} style={styles.text}> writeFile</Text>
                <Text onPress={this.readFile.bind(this)} style={styles.text}> readFile</Text>
                <Text>{this.state.readTxtResult?this.state.readTxtResult: ""}</Text>
            </View>
        );
    }
}

const styles = {
    text: {
        fontSize: 30,
        marginBottom: 10
    }
}
