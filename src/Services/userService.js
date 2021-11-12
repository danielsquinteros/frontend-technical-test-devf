import axios from "axios";

const getToken = () => localStorage.getItem('token')

const getUsers = async () => {
    try {
        const { data } = await axios.get('users', {
            headers: {
               'x-token': getToken() //the token is a variable which holds the token
              }
        })
        return data
        
    } catch (error) {
        throw error.response.data
    }
}

const getUserId = async (id) => {
    try {
        const { data } = await axios.get(`user/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'x-token': getToken()//the token is a variable which holds the token
              }
        })
        return data
        
    } catch (error) {
        throw error.response.data
    }
}

const updateUser = async (id, data) => {
    const {name, password, email, role} = data
    try {
        const response = await axios.put(`user/${id}`, {name, password, email, role} , {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'x-token': getToken()//the token is a variable which holds the token
              }
        })
        return response
        
    } catch (error) {
        throw error.response.data
    }
}
const createUser = async (data) => {
    const {name, password, email, role} = data
    try {
        const response = await axios.post(`user/create`, {name, password, email, role} , {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'x-token': getToken()//the token is a variable which holds the token
              }
        })
        return response
        
    } catch (error) {
        throw error.response.data
    }
}



export {getUsers, updateUser, createUser, getUserId} 