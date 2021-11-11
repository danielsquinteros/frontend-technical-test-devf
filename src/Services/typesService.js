import axios from "axios";

const getToken = () => localStorage.getItem('token')

const getTypes = async () => {
    try {
        const { data } = await axios.get(' http://localhost:3000/api/v1/types', {
            headers: {
               'x-token': getToken() //the token is a variable which holds the token
              }
        })
        return data
        
    } catch (error) {
        throw error.response.data
    }
}
const updateType = async (id, data) => {
    const {title, description} = data
    try {
        const response = await axios.put(`http://localhost:3000/api/v1/type/${id}`, {title, description} , {
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
const createType = async (title, description) => {
    const data = {
        title, description
    }
    try {
        const response = await axios.post(`http://localhost:3000/api/v1/type/create`, data , {
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



export {getTypes, updateType, createType} 