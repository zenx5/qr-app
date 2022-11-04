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
	const [entity, setEntity] = useState({})

	useEffect(() => {
		(async () => {
			const {data} = await getData( id )
            console.log( data )
            setEntity( prev => data.data[0] )
		})();
	}, []);

    const backHandler = _ => {
        navigate('/products')
    }

    const keys = Object.keys(entity);
    const fields = keys.map( (key, index) => {;
        return(
            <ListItemText primary={`${entity[key]}`} key={index} />
        )
    })

    return(
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            
                <ListItem
                key={entity.id}
                disableGutters
                >
                    {fields}
                </ListItem>
            
            </List>
            <Button onClick={backHandler}>Back</Button>
        </div>
    )
}