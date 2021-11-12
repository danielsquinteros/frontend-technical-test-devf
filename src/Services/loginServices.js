import axios from 'axios';

const login = async(email, password) => {
    const data = {
        email, password
    }
    try {
        const response = await axios.post('login', data)
        return response
    } catch (error) {
        throw error.response.data
    }
}
export default login