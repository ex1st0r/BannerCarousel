import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';

const roundDownImageSize = (imgWidth, imgHeight) => {
    const windowSize = Dimensions.get('window');
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;

    let scaleWidth = imgWidth / windowWidth
    let scaleHeight = imgHeight / windowHeight

    if (scaleHeight <= 1 && scaleWidth <= 1) {
        return {width: imgWidth, height: imgHeight}
    }

    if (scaleWidth > scaleHeight) {
        return {
            width: windowWidth,
            height: imgHeight / scaleWidth
        }
    } else {
        return {
            width: imgWidth / scaleHeight,
            height: windowHeight
        }
    }
}

export default class SmartImage extends Component {
    constructor(props){
        super(props)

        this.state = {
            imageFetching: false,
            width: 0,
            height: 0
        }
    }

    render() {
        return (
            <Image
                source={{ uri: this.props.uri, width: this.state.width, height: this.state.height }}
                onLoad={(e) => {
                   Image.getSize(this.props.uri, (width, height) => this.setState(roundDownImageSize(width, height)))
                }} />
        )
    }
}