import { StyleSheet, View } from 'react-native'
import React, { memo, ReactElement, useContext } from 'react'
import { useThemeColor } from '@hooks/useThemeColor'
import StatusBar from '@blocks/StatusBar'
import Icon from '@blocks/Icon'
import { router } from 'expo-router'
import ImageAvatar from '@blocks/ImageAvatar'
import { userContext } from '@UserContext';
import Text from '@blocks/Text'
import { ThemeContext } from '@ThemeContext'

type AppBarProps = {
    dark?: boolean,
    height?: number,
    center?: boolean,
    action?: ReactElement,
    title?: string | ReactElement,
    leading?: 'avatar' | 'back' | ReactElement,
}
const AppBar = ({ center = false, leading, title, action, dark, height = 50 }: AppBarProps) => {
    const { user: { avatar, role, name: { first } } } = useContext(userContext);
    const Colors = useThemeColor();

    return (
        <View style={[
            styles.container,
            { minHeight: height , alignItems:'center' },
            { backgroundColor:  Colors.card},
        ]}>
            <StatusBar dark={dark} />
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                {/* /**Leading Icon | Profile-Image */}
                <View>
                    {typeof leading === 'object' && leading}
                    {leading === 'back' && <Icon icon='back' iconColor={Colors.text} size={24} onPress={() => router.back()} />}
                    {leading === 'avatar' && <ImageAvatar type="avatar" url={avatar} onPress={() => router.push('/profile')} />}
                </View>
                {/* /** Trailing Icon | Notification | Title */}
                <View>
                    {leading === 'avatar' && <Text type='subtitle' color={dark ? 'white' : 'black'} title={title as string || `Welcome ${first}!`} />}
                    {typeof title === 'string' ? <Text type='subtitle' color={dark ? 'white' : 'black'} title={title} /> : title}
                </View>
            </View>
            {/* /** Action Buttons */}
            <View>
                {action}
            </View>
        </View>
    )
}
export default memo(AppBar)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16, paddingVertical: 8,
        flexDirection: 'row', alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
})