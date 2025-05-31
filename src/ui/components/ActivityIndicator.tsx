import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { Colors } from '@styles/colors';
import LoaderIcon from '@svg/LoaderIcon.svg';

interface ActivityIndicatorProps {
    size?: number;
    color?: string;
}

function LocationCard({
    size = 64,
    color = Colors.black,
}: ActivityIndicatorProps) {
    const value = useRef(new Animated.Value(0)).current;

    const transformedValues = value.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        width: size,
        height: size,
        transform: [{ rotate: transformedValues }],
    };

    useEffect(() => {
        Animated.loop(
            Animated.timing(value, {
                toValue: 1,
                easing: Easing.linear,
                duration: 750,
                useNativeDriver: false,
            }),
        ).start();
    }, []);

    return (
        <View>
            <Animated.View style={animatedStyle}>
                <LoaderIcon color={color} width={size} height={size} />
            </Animated.View>
        </View>
    );
}

export default React.memo(LocationCard);
