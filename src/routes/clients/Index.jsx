import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, ListItem, ListItemText } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { getClients, setClients, setMenus } from "../../tools/Request";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function ListClients(props) {
    const { create } = props
    const { id } = useParams()
	const navigate = useNavigate()
	const [client, setClient] = useState({})

	useEffect(() => {
		(async () => {
			const {data} = await getClients( id )
            console.log( data )
            setClient( prev => data.data[0] )
		})();
	}, []);

    const backHandler = _ => {
        navigate('/clients')
    }

    return(
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            
                <ListItem
                key={client.id}
                disableGutters
                >
                    <ListItemText primary={`${client.firstname}`} />
                    <ListItemText primary={`${client.lastname}`} />
                </ListItem>
            
            </List>
            <Button onClick={backHandler}>Back</Button>
        </div>
    )
}