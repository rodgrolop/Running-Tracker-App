export const USER_LOGIN = 'USER_LOGIN'
export const LOADING = 'LOADING'
export const USER_LOGOUT = 'USER_LOGOUT'


export const userLogin = formState => ({
    type: USER_LOGIN,
    payload: {
        'username': formState.username,
        'password': formState.password,
    },
})

export const setLoading = loading => ({
    type: LOADING,
    payload: {
        loading: loading,
    }
})

export const userLogout = () => ({
    type: USER_LOGOUT,
    payload: {},
})