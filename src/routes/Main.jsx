import { Container, Card, Typography, MenuList, MenuItem, CardContent } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Main(){
    const navigate = useNavigate()
    return(<Container>
        <Card variant='outlined' style={{
            marginTop:'40px',
            marginBottom:'40px',
        }}>
            <CardContent>
                <Typography>Menu</Typography>
                <MenuList>
                    <MenuItem onClick={()=>navigate(process.env.REACT_APP_ROUTE_CREATE_CLIENT)}>Nuevo Cliente</MenuItem>
                    <MenuItem onClick={()=>navigate(process.env.REACT_APP_ROUTE_LIST_CLIENT)}>Lista de Clientes</MenuItem>
                    <MenuItem onClick={()=>navigate(process.env.REACT_APP_ROUTE_CREATE_MENU)}>Nuevo Menu</MenuItem>                    
                </MenuList>
            </CardContent>
        </Card>
    </Container>)
}