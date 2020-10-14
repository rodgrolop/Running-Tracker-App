import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DefaultPage from '../../components/DefaultPage'
import { TextInput, withTheme } from 'react-native-paper'
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
            ...props
        }
    ) => {
        
    const { colors } = props.theme
        
    const [formState, setFormState] = useState(initialFormState)
    
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    
    const [passwordInputColor, setPasswordInputColor] = useState(colors.blurInput)
    
    const setUserName = username => setFormState({ ...formState, 'username': username })
    
    const setPassword = password => setFormState({ ...formState, 'password': password })
    
    const handleLogin = () => loginUser(formState)
    
    const changePasswordVisibility = () => {
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

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(SceneLogin))

const styles = StyleSheet.create({
    loginFormContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: Dimensions.get('window').width / 10,
    },
    loginFormInput: {
        marginBottom: 10,
    },
    loginFormInputPass: {
        marginBottom: 20,
    },
    loginFormInputIconPass: {
        
    },
  });