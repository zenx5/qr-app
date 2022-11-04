import { BrowserRouter, Route, Routes } from "react-router-dom"
import { getProducts, setProducts, getMenus, setMenus } from "./tools/Request";
import ClientEdit from './routes/clients/Edit.jsx'
import ClientCreate from './routes/clients/Edit.jsx'
import ClientIndex from './routes/clients/Index.jsx'
import ClientList from './routes/clients/List.jsx'

import ProductEdit from './routes/products/Edit.jsx'
import ProductCreate from './routes/products/Edit.jsx'
import ProductIndex from './routes/products/Index.jsx'
import ProductList from './routes/products/List.jsx'

import MenuEdit from './routes/menus/Edit.jsx'
import MenuCreate from './routes/menus/Edit.jsx'
import MenuIndex from './routes/menus/Index.jsx'
import MenuList from './routes/menus/List.jsx'

export default function App(){
    
    const menuModel = {
        name: '',
        currency: ''
    }
    
    return(
        <>
             <BrowserRouter>
                <Routes>
                    <Route path="/" element={<p>main</p>} />
                    <Route path="client" element={<ClientCreate create />} />
                    <Route path="client/:id" element={<ClientEdit />} />
                    <Route path="clients" element={<ClientList />} />
                    <Route path="clients/:id" element={<ClientIndex />} />

                    <Route path="product" element={<ProductCreate create />} />
                    <Route path="product/:id" element={<ProductEdit />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:id" element={<ProductIndex />} />

                    <Route path="menu" element={<MenuCreate name='Menu' model={menuModel} getData={getMenus} setData={setMenus} create />} />
                    <Route path="menu/:id" element={<MenuEdit name='Menu' model={menuModel} getData={getMenus} setData={setMenus} />} />
                    <Route path="menus" element={<MenuList getData={getMenus} nameSing='menu' namePlural='menus' />} />
                    <Route path="menus/:id" element={<MenuIndex getData={getMenus} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}