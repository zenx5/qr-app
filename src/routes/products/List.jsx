import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, ListItem, ListItemText } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { getClients, setClients, setMenus, getProducts, setProducts } from "../../tools/Request";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function ListClients(props) {
	const navigate = useNavigate()
	const [products, setProducts] = useState([])

	useEffect(() => {
		(async () => {
			const {data} = await getProducts( )
            console.log( data )
            setProducts( prev => data.data )
		})();
	  }, []);

      const handlerView = userId => {
        navigate('/products/'+userId)
      }
      const handlerEdit = userId => {
        navigate('/products/'+userId)
      }

    return(
        <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {products.map((product) => (
                <ListItem
                key={product.id}
                disableGutters
                secondaryAction={
                    <div>
                        <Button onClick={_=> handlerView(product.id) } >View</Button>
                        <Button onClick={_=> handlerEdit(product.id) } >edit</Button>
                    </div>
                    
                  }
            
                >
                    <ListItemText primary={`${product.title}`} />
                    <ListItemText primary={`${product.price}`} />
                </ListItem>
            ))}
            </List>
        </div>
    )
}