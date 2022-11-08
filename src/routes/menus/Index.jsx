import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, ListItem, ListItemText } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { getClients, setClients, setMenus, getProducts } from "../../tools/Request";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function ListProducts(props) {
	const { getData } = props
    const { id } = useParams()
	const navigate = useNavigate()
	const [menu, setMenu] = useState({})

	useEffect(() => {
		(async () => {
			const {data} = await getData( id )
            console.log( data )
            setMenu( prev => data.data[0] )
		})();
	}, []);

    const backHandler = _ => {
        navigate('/menus')
    }

    return(
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            
                <ListItem
                key={menu.id}
                disableGutters
                >
                    <ListItemText primary={`${menu.name}`} />
                    <ListItemText primary={`${menu.currency}`} />
                </ListItem>
            
            </List>
            <Button onClick={backHandler}>Back</Button>
        </div>
    )
}