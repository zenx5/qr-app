import axios from "axios";

const getClients = async (id='') => {
    return await axios.get(`${process.env.REACT_APP_BACK_URL}/clients/${id}`)
}

const setClients = async (data) => {
    if( data.id ){
        return await axios.put(`${process.env.REACT_APP_BACK_URL}/clients`, data)    
    }else{
        return await axios.post(`${process.env.REACT_APP_BACK_URL}/clients`, data)
    }
}

const setMenus = async (data) => {
    if( data.id ){
        return await axios.put(`${process.env.REACT_APP_BACK_URL}/menus`, data)    
    }else{
        return await axios.post(`${process.env.REACT_APP_BACK_URL}/menus`, data)
    }
}

export {
    getClients,
    setClients,
    setMenus
}