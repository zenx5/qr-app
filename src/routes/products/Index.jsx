import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, ListItem, ListItemText } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { getClients, setClients, setMenus, getProducts } from "../../tools/Request";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function ListProducts(props) {
    const { id } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState({})

	useEffect(() => {
		(async () => {
			const {data} = await getProducts( id )
            console.log( data )
            setProduct( prev => data.data[0] )
		})();
	}, []);

    const backHandler = _ => {
        navigate('/products')
    }

    return(
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            
                <ListItem
                key={product.id}
                disableGutters
                >
                    <ListItemText primary={`${product.title}`} />
                    <ListItemText primary={`${product.price}`} />
                </ListItem>
            
            </List>
            <Button onClick={backHandler}>Back</Button>
        </div>
    )
}