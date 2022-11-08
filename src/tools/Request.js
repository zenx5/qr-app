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

const getMenus = async (id='') => {
    return await axios.get(`${process.env.REACT_APP_BACK_URL}/menus/${id}`)
}

const setMenus = async (data) => {
    if( data.id ){
        return await axios.put(`${process.env.REACT_APP_BACK_URL}/menus`, data)    
    }else{
        return await axios.post(`${process.env.REACT_APP_BACK_URL}/menus`, data)
    }
}

const getProducts = async (id='') => {
    return await axios.get(`${process.env.REACT_APP_BACK_URL}/products/${id}`)
}

const setProducts = async (data) => {
    if( data.id ){
        return await axios.put(`${process.env.REACT_APP_BACK_URL}/products`, data)    
    }else{
        return await axios.post(`${process.env.REACT_APP_BACK_URL}/products`, data)
    }
}

export {
    getClients,
    setClients,
    getMenus,
    setMenus,
    getProducts,
    setProducts
}