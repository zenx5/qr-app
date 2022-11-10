import { BrowserRouter, Route, Routes } from "react-router-dom"
import ClientEdit from './routes/clients/Edit.jsx'
import ClientCreate from './routes/clients/Edit.jsx'
import ClientIndex from './routes/clients/Edit.jsx'
import ClientList from './routes/clients/List.jsx'

// import ProductEdit from './routes/products/Edit.jsx'
// import ProductCreate from './routes/products/Edit.jsx'
// import ProductIndex from './routes/products/Edit.jsx'
// import ProductList from './routes/products/List.jsx'

import MenuEdit from './routes/menus/Edit.jsx'
import MenuCreate from './routes/menus/Edit.jsx'
import MenuIndex from './routes/menus/Edit.jsx'
import MenuList from './routes/menus/List.jsx'

import Main from "./routes/Main.jsx"

export default function App(){
    
    return(
        <>
             <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path={`${process.env.REACT_APP_ROUTE_CREATE_CLIENT}`} element={<ClientCreate create />} />
                    <Route path={`${process.env.REACT_APP_ROUTE_EDIT_CLIENT}/:id`} element={<ClientEdit />} />
                    <Route path={`${process.env.REACT_APP_ROUTE_LIST_CLIENT}`} element={<ClientList />} />
                    <Route path={`${process.env.REACT_APP_ROUTE_VIEW_CLIENT}/:id`} element={<ClientIndex view/>} />

                    <Route path={`${process.env.REACT_APP_ROUTE_CREATE_MENU}`} element={<MenuCreate create />} />
                    <Route path={`${process.env.REACT_APP_ROUTE_EDIT_MENU}/:id`} element={<MenuEdit />} />
                    <Route path={`${process.env.REACT_APP_ROUTE_LIST_MENU}`} element={<MenuList />} />
                    <Route path={`${process.env.REACT_APP_ROUTE_VIEW_MENU}/:id`} element={<MenuIndex view />} />

                    {/* <Route path="product" element={<ProductCreate create />} />
                    <Route path="product/:id" element={<ProductEdit />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:id" element={<ProductIndex />} />

                    <Route path="menu" element={<MenuCreate name='Menu' model={menuModel} getData={getMenus} setData={setMenus} create />} />
                    <Route path="menu/:id" element={<MenuEdit name='Menu' model={menuModel} getData={getMenus} setData={setMenus} />} />
                    <Route path="menus" element={<MenuList getData={getMenus} nameSing='menu' namePlural='menus' />} />
                    <Route path="menus/:id" element={<MenuIndex getData={getMenus} />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}
