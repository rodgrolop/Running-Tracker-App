import React, { useState, useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DefaultPage from '../../components/DefaultPage'
import { TextInput } from 'react-native-paper'
import { userLogin } from '../../redux/actions/user.actions'

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
            loginUser,
        }
    ) => {
        
    const [formState, setFormState] = useState(initialFormState)
    
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    
    const [userInputColor, setUserInputColor] = useState("#ccc")
    
    const [passwordInputColor, setPasswordInputColor] = useState("#ccc")
    
    const passwordInput = useRef(null)
    
    const userInput = useRef(null)
    
    const setUserName = username => setFormState({ ...formState, 'username': username })
    
    const setPassword = password => setFormState({ ...formState, 'password': password })
    
    const handleLogin = () => loginUser(formState)
    
    const changePasswordVisibility = () => {
        passwordInput.current.focus()
        setSecureTextEntry(!secureTextEntry)
    }
    
    return (
        <DefaultPage>
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
                selectionColor="#63257F55"
                ref={userInput}
                autoFocus={true}
                onFocus={
                    () => 
                    setUserInputColor("#63257F")
                }
                onBlur={
                    () => 
                    setUserInputColor("#ccc")
                }
                left={
                    <TextInput.Icon 
                        icon="account-circle"
                        color={userInputColor}
                        style={
                            styles.loginFormInputIcon
                        }
                    />
                }
                leftIconContainerStyle={
                    {  
                        marginRight: 10,
                    }
                }
                style={
                    styles.loginFormInput
                }
                onChangeText={
                    value => setUserName(value)
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
                selectionColor="#63257F55"
                ref={passwordInput}
                onFocus={
                    () => 
                    setPasswordInputColor("#63257F")
                }
                onBlur={
                    () => 
                    setPasswordInputColor("#ccc")
                }
                left={
                    <TextInput.Icon 
                        icon="lock"
                        color={passwordInputColor}
                        style={
                            styles.loginFormInputIcon
                        }
                    />
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
                    styles.loginFormInput
                }
                onChangeText={
                    value => setPassword(value)
                }
                secureTextEntry={secureTextEntry}
                />                
            <Button
                loading={loading}
                icon={
                    !loading && 
                    "arrow-right-circle"
                } 
                mode="contained"
                onPress={
                    () => 
                    handleLogin()
                }
                contentStyle={
                    {
                        height: 60
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
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
    error: state.user.error,
    user: state.user.user,
    
})

const mapDispatchToProps = dispatch => ({
    loginUser: formState => dispatch(userLogin( formState )),
})

export default connect(mapStateToProps, mapDispatchToProps)(SceneLogin)

const styles = StyleSheet.create({
    loginFormContainer: {
        width: Dimensions.get('window').width * 8 / 10,
    },
    loginFormInput: {
        marginBottom: 10,
    },
    loginFormInputIcon: {
        
    },
    loginFormInputIconPass: {
        zIndex:999
    },
  });