import { BrowserRouter, Route, Routes } from "react-router-dom"
import ClientEdit from './routes/clients/Edit.jsx'
import ClientCreate from './routes/clients/Edit.jsx'
import ClientIndex from './routes/clients/Index.jsx'
import ClientList from './routes/clients/List.jsx'

export default function App(){
    
    return(
        <>
             <BrowserRouter>
                <Routes>
                    <Route path="/" element={<p>main</p>} />
                    <Route path="client" element={<ClientCreate create />} />
                    <Route path="client/:id" element={<ClientEdit />} />
                    <Route path="clients" element={<ClientList />} />
                    <Route path="clients/:id" element={<ClientIndex />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}