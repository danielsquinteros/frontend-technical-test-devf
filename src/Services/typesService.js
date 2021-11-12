import axios from "axios";

const getToken = () => localStorage.getItem('token')

const getTypes = async () => {
    try {
        const { data } = await axios.get('types', {
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
        const response = await axios.put(`type/${id}`, {title, description} , {
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
        const response = await axios.post(`type/create`, data , {
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