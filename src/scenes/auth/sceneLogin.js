import React, { useState } from 'react'
import { ActivityIndicator, View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DefaultPage from '../../components/DefaultPage'
import { Input } from 'react-native-elements';
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
    
    const setUserName = username => {
        setFormState({ ...formState, 'username': username })
    }
    
    const setPassword = password => {
        setFormState({ ...formState, 'password': password })
    }
    
    const handleLogin = () => {
        loginUser(formState)
    }
    
    return (
        <DefaultPage>
            <View style={styles.loginFormContainer}>
            <Input 
                value={formState.username}
                name="username"
                id="username"
                placeholder="Usuario/Email" 
                style={
                    styles.loginFormInput
                }
                onChangeText={
                    value => setUserName(value)
                }/>
            <Input 
                value={formState.password}
                name="password"
                id="password"
                placeholder="Contraseña" 
                style={
                    styles.loginFormInput
                }
                onChangeText={
                    value => setPassword(value)
                }
                secureTextEntry={true}
                />
                { loading ? <ActivityIndicator
                animating={true}
                color="#63257F"
                size={34}
            /> : <Button
            title="Press me"
            onPress={() => handleLogin()}
        />}
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
       
    },
  });