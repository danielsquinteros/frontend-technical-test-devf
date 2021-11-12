import axios from "axios";

const getToken = () => localStorage.getItem('token')

const getCases = async () => {
    try {
        const { data } = await axios.get(' http://localhost:3000/api/v1/cases', {
            headers: {
               'x-token': getToken() //the token is a variable which holds the token
              }
        })
        return data
        
    } catch (error) {
        throw error.response.data
    }
}
const getCasesUserId = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/cases/user/${id}`, {
            headers: {
                'x-token': getToken()//the token is a variable which holds the token
              }
        })
        return data
        
    } catch (error) {
        throw error.response.data
    }
}

const updateCase = async (id, data) => {
    const {title, description, user, state, type} = data
    try {
        const response = await axios.put(`http://localhost:3000/api/v1/case/${id}`, {title, description, user, state, type} , {
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
const createCase = async (data) => {
    const { title, description, type, user, state, student,date_started } = data

    try {
        const response = await axios.post(`http://localhost:3000/api/v1/case/create`, {title, description, type, user, state, student,date_started} , {
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

const deteleCase = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/v1/case/${id}`, {
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

export {getCases, updateCase, createCase, deteleCase, getCasesUserId} 