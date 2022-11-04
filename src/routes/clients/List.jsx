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
	const navigate = useNavigate()
	const [clients, setClients] = useState([])

	useEffect(() => {
		(async () => {
			const {data} = await getClients( ) 
            console.log( data )
            setClients( prev => data.data )
		})();
	  }, []);

      const handlerView = userId => {
        navigate('/clients/'+userId)
      }
      const handlerEdit = userId => {
        navigate('/client/'+userId)
      }

    return(
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {clients.map((client) => (
                <ListItem
                key={client.id}
                disableGutters
                secondaryAction={
                    <div>
                        <Button onClick={_=> handlerView(client.id) } >View</Button>
                        <Button onClick={_=> handlerEdit(client.id) } >edit</Button>
                    </div>
                    
                  }
            
                >
                    <ListItemText primary={`${client.firstname}`} />
                    <ListItemText primary={`${client.lastname}`} />
                </ListItem>
            ))}
            </List>
        </div>
    )
}