import axios from "axios"

export const mainAPI = axios.create({ baseURL: 'http://localhost:3000' });

export const Auth = async (data)=> {
   const log = await mainAPI.post('/api/auth/login',data)
   return log.data
}