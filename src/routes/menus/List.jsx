import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, ListItem, ListItemText } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function ListClients(props) {
	const { nameSing, namePlural, getData } = props
	const navigate = useNavigate()
	const [entities, setEntities] = useState([])

	useEffect(() => {
		(async () => {
			const {data} = await getData( )
            console.log( data )
            setEntities( prev => data.data )
		})();
	  }, []);

      const handlerView = userId => {
        navigate(`/${namePlural}/${userId}`)
      }
      const handlerEdit = userId => {
        navigate(`/${nameSing}/${userId}`)
      }

    return(
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {entities.map((entity) => (
                <ListItem
                key={entity.id}
                disableGutters
                secondaryAction={
                    <div>
                        <Button onClick={_=> handlerView(entity.id) } >View</Button>
                        <Button onClick={_=> handlerEdit(entity.id) } >edit</Button>
                    </div>
                    
                  }
                >
                    <ListItemText primary={`${entity.name}`} />
                    <ListItemText primary={`${entity.currency}`} />
                </ListItem>
            ))}
            </List>
        </div>
    )
}