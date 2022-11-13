import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, ListItem, ListItemText } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { getClients, setClients, setMenus, getProducts } from "../../tools/Request";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";
import { getResource } from "../../tools/resourceRequest";

export default function ListProducts(props) {
	const { getData } = props
    const { token } = useParams()
	const navigate = useNavigate()
	const [menu, setMenu] = useState({})

	useEffect(() => {
		(async () => {
			const {data} = await getResource('m', token )
            console.log( data )
            setMenu( data.data[0] )
		})();
	}, []);


    return(
        <div style={{
            backgroundImage: `url(${menu.background})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            backgroundSize: 'cover',
            padding: 0,
            margin: 0
        }}>
            <Typography component='h1' style={{textAlign:'center', fontSize:menu.sizeTitle ?? '2rem', margin: '1.5rem', marginTop:0, color: `#${menu.colorTitle}` ?? '#000' }}>{menu.name}</Typography>
            <List sx={{ width: '100%'}}>
                {menu.Products && menu.Products.map( product => (
                    <ListItem
                    key={product.id}
                    disableGutters
                    style={{padding:'0.5rem 2rem', borderBottom: `1px solid #${menu.colorItem}`}}
                    >
                        <ListItemText primary={trans(`${product.title}`)} style={{ color: `#${menu.colorItem}` ?? '#000', fontSize: menu.sizeItem ?? '1rem' }}/>
                        <ListItemText primary={`${product.price} ${menu.currency}`} style={{color: `#${menu.colorItem}` ?? '#000', fontSize: menu.sizeItem ?? '1rem', textAlign:'right'}}/>
                    </ListItem>
                ))}
            </List>
            
        </div>
    )
}