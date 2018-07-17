import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class calendar extends Component {
    constructor(){
        super();
        this.state = {
            days: []
        }
    }

    isLeapYear(year){
        if((!(year % 4) && year % 100) || !(year % 400)) return true;
        return false;
    }
    getMonthFrist(year, month){
        let date = new Date(`${year}/${month}/01`);
        return date.getDate();
    }
    getMonthDays(year, month){
        let nextMonthFrist = new Date(`${year}/${month+1}/01`).getTime() - 3600 * 24 * 1000;
        return new Date(nextMonthFrist).getDay();
    }

    componentDidMount() {
        let date = new Date(),
            curYear = date.getFullYear(),
            curMonth = date.getMonth() + 1,
            curDay = date.getDay();
        let monthFrist = this.getMonthFrist(curYear, curMonth);
    }


    render() {
        return (
            <View>
                <View>
                    <Text></Text>
                </View>
            </View>
        );
    }
}

const styles = {}
