import axios from "axios";

const getToken = () => localStorage.getItem('token')

const getStatus = async () => {
    try {
        const { data } = await axios.get(' http://localhost:3000/api/v1/states', {
            headers: {
               'x-token': getToken() //the token is a variable which holds the token
              }
        })
        return data
        
    } catch (error) {
        throw error.response.data
    }
}
const updateStatus = async (id, data) => {
    const {title, description} = data
    try {
        const response = await axios.put(`http://localhost:3000/api/v1/state/${id}`, {title, description} , {
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
const createState = async (data) => {
    const {title, description} = data
    try {
        const response = await axios.post(`http://localhost:3000/api/v1/state/create`, {title, description} , {
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


export {getStatus, updateStatus, createState} 