import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import Carousel from 'react-native-looped-carousel-improved';

import SmartImage from './SmartImage';

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;


export default class CarouselExample extends Component {

    constructor(props) {
        super(props);

        this.state = {
            size: { width: windowWidth, height: windowHeight },
            bannerListFetching: false,
            bannerList: [],
            bannerListError: null
        };
    }

    componentDidMount(){
        this.setState({bannerListFetching: true})
        fetch('http://avix.me/dima/wp-json/cjba/v1/banners/?action=get_banners&user_code=010101', {method: 'GET'})
            .then((data) => {
                data.json().then((json) => this.setState({bannerList: json, bannerListFetching: false}))
            })
            .catch((error) => this.setState({bannerListError: error, bannerListFetching: false}))
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    render() {
        if (this.state.bannerListFetching) {
            return (
                <View style={styles.infoPageWrapper}>
                    <Text>Loading...</Text>
                </View>)
        }

        if (this.state.bannerListError) {
            return (
                <View style={styles.infoPageWrapper}>
                    <Text style={{color: 'red'}}>Error loading</Text>
                </View>
            )
        }

        if (!this.state.bannerList || !this.state.bannerList.length) {
            return (
                <View style={styles.infoPageWrapper}>
                    <Text>Banner list is empty</Text>
                </View>
            )
        }

        return (
            <View style={styles.flex} onLayout={this._onLayoutDidChange}>
                <Carousel
                    delay={7000}
                    style={styles.flex}
                    autoplay
                    pageInfo={false}
                    currentPage={0}
                    onAnimateNextPage={(p) => console.log(p)}
                    swipe={false}
                >
                    {this.state.bannerList.filter((item) => !!item.banner).map((item, index) => (
                        <View style={[styles.infoPageWrapper, this.state.size, {backgroundColor: '#ddd'}]} key={index}>
                            <SmartImage uri={item.banner} />
                        </View>
                    ))}
                </Carousel>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    infoPageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})