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
	const [menus, setMenus] = useState([])

	useEffect(() => {
		(async () => {
			const {data} = await getData( )
            console.log( data )
            setMenus( prev => data.data )
		})();
	  }, []);

      const handlerView = userId => {
        navigate(`/${menus}/${userId}`)
      }
      const handlerEdit = userId => {
        navigate(`/menu/${userId}`)
      }

    return(
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {menus.map((menu) => (
                <ListItem
                key={menu.id}
                disableGutters
                secondaryAction={
                    <div>
                        <Button onClick={_=> handlerView(menu.id) } >View</Button>
                        <Button onClick={_=> handlerEdit(menu.id) } >edit</Button>
                    </div>
                    
                  }
                >
                    <ListItemText primary={`${menu.name}`} />
                    <ListItemText primary={`${menu.currency}`} />
                </ListItem>
            ))}
            </List>
        </div>
    )
}