/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Animated, Easing } from 'react-native';

export default class App extends Component {

	image2AnimatedValue = new Animated.Value(0);
	image1AnimatedValue = new Animated.Value(0);

	componentDidMount() {
		this.animate()
	}

	animate() {
		this.image1AnimatedValue.setValue(0);
		const image1Timing = Animated.timing(
			this.image1AnimatedValue,
			{
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true,
			}
		);

		this.image2AnimatedValue.setValue(0);
		const image2Timing = Animated.timing(
			this.image2AnimatedValue,
			{
				toValue: 1,
				duration: 300,
				easing: Easing.exp,
				useNativeDriver: true,
			}
		);

		Animated.sequence([image1Timing, image2Timing]).start();
	}

	render() {
		//#region Image1: Fade animation
		const fade = this.image1AnimatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1]
		});

		const image1Style = { opacity: fade };
    	//#endregion
    
		//#region Image2: Fade+Rotation animation
		const rotateX = this.image2AnimatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['90deg', '0deg']
		});

		const opacity = this.image2AnimatedValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, 1, 1]
		});

		// FIXME: rotateX doesn't work on iOS, I don't know why
		const image2Style = { opacity, transform: [{ rotateX }] };
		//#endregion

		return (
			<SafeAreaView style={styles.container}>
        		<Animated.Image resizeMode="contain" style={[styles.logo, image1Style]} source={require('./resources/images/puppy.png')} ></Animated.Image>
        		<Animated.Image resizeMode="contain" style={[styles.logo, image2Style]} source={require('./resources/images/poop.png')} ></Animated.Image>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
	logoContainer: {
	},
	logo: {
		width: '50%',
		height: undefined,
		aspectRatio: 1,
	},
});
