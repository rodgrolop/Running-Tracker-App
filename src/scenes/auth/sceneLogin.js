import React, { useState } from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import { Button, TextInput, withTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DefaultPage from '../../components/DefaultPage'
import { userLogin } from '../../redux/api/user.api'

const initialFormState = {
    username: 'Test',
    password: '6665388',
}

const SceneLogin = ( 
        {   
            loading,
            isLoggedIn,
            error,
            user,
            ...props
        }
    ) => {
        
    const { colors } = props.theme
        
    const [formState, setFormState] = useState(initialFormState)
    
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    
    const [passwordInputColor, setPasswordInputColor] = useState(colors.blurInput)
    
    const setUserName = username => setFormState({ ...formState, 'username': username })
    
    const setPassword = password => setFormState({ ...formState, 'password': password })
    
    const handleLogin = () => userLogin(formState)
    
    const changePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry)
    }
    
    return (
        <DefaultPage>
            <View style={styles.imgContainer}>
                <Image
                    source={require('../../image/logo.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.loginFormContainer}>
                <TextInput 
                    value={
                        formState.username
                    }
                    name="username"
                    id="username"
                    label="Usuario/Email"
                    placeholder="Usuario/Email"
                    mode="outlined"
                    selectTextOnFocus={true}
                    selectionColor={colors.selectionColor}
                    style={
                        styles.loginFormInput
                    }
                    onChangeText={
                        value => 
                        setUserName(value)
                    }/>
                <TextInput 
                    value={
                        formState.password
                    }
                    name="password"
                    id="password"
                    label="Contraseña"
                    placeholder="Contraseña"
                    mode="outlined"
                    selectTextOnFocus={true}
                    selectionColor={colors.selectionColor}
                    onFocus={
                        () => 
                        setPasswordInputColor(colors.primary)
                    }
                    onBlur={
                        () => 
                        setPasswordInputColor(colors.blurInput)
                    }
                    right={
                        <TextInput.Icon 
                            icon={
                                secureTextEntry ? 
                                "eye" : 
                                "eye-off"
                            }
                            color={passwordInputColor}
                            style={
                                styles.loginFormInputIconPass
                            }
                            onPress={
                                () => 
                                changePasswordVisibility()
                            }
                        />
                    }
                    style={
                        styles.loginFormInputPass
                    }
                    onChangeText={
                        value => 
                        setPassword(value)
                    }
                    secureTextEntry={secureTextEntry}
                    />                
                <Button
                    loading={loading}
                    icon={
                        isLoggedIn ?  
                        "lock-open" : 
                        "lock"
                    } 
                    mode="contained"
                    onPress={
                        () => 
                        handleLogin()
                    }
                    style={
                        styles.loginFormButton
                    }
                    contentStyle={
                        {
                            height: 60,
                        }
                    }
                    labelStyle={
                        {
                            fontSize: 16,
                        }
                    }
                    >
                    Login
                </Button>
            </View>
        </DefaultPage>
    )
}

SceneLogin.defaultProps = {
    loading: false,
    isLoggedIn: false,
    error: '',
    user: {},
}

SceneLogin.propTypes = {
    loading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
    error: state.user.error,
    user: state.user.user,    
})

export default withTheme(connect(mapStateToProps)(SceneLogin))

// Styles

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    loginFormContainer: {
        width: screenWidth,
        marginVertical: 0,
        paddingHorizontal: screenWidth / 10,
    },
    imgContainer: {
        width: screenWidth,
        display: 'flex',
        paddingHorizontal: screenWidth / 4,
    },
    image: {
        width: screenWidth / 2,
        height: undefined,
        // figure out your image aspect ratio
        aspectRatio: 8 / 3,      
    },
    loginFormInput: {
        marginBottom: 10,
    },
    loginFormInputPass: {
        marginBottom: 20,
    },
    loginFormInputIconPass: {
        
    },
    loginFormButton: {
        elevation: 4,
    }
})