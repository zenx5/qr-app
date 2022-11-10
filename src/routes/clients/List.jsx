import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trans } from "../../tools/Location";
import { getResource } from "../../tools/resourceRequest";
import { ListView } from "../../components";
import { Grid, Typography, Button } from '@mui/material'

export default function ListClients() {
	const navigate = useNavigate()
	const [clients, setClients] = useState([])

	useEffect(() => {
		(async () => {
			const {data} = await getResource('clients') 
      console.log( data.data )
      setClients( prev => data.data )
		})();
	  }, []);

    const handlerView = userId => {
      navigate(`/${process.env.REACT_APP_ROUTE_VIEW_MENU}/${userId}`)
    }
    const handlerEdit = userId => {
      navigate(`/${process.env.REACT_APP_ROUTE_EDIT_MENU}/${userId}`)
    }

    const backHandler = () => {
      window.history.go(-1)
    }

    return(
    <Grid container>
          <Grid item xs={9}>
						<Typography style={{fontWeight:'bold', margin:'8px'}}>{trans('Menus')}: </Typography>
					</Grid>
					<Grid item xs={3}><Button onClick={backHandler}>Back</Button></Grid>
          <Grid item xs={12}>
            <ListView 
              headers={ [
                { key: 'nickname', name: trans('Nick'), default: '' },
                { key: 'firstname', name: trans('First Name'), default: '' },
                { key: 'lastname', name: trans('Last Name'), default: ''},
                { key: 'email', name: trans('Email'), default: ''},
              ] }
              disableSelection
              records={clients}
              onView={handlerView}
              onEdit={handlerEdit}
              id={'id'}
          />
        </Grid>
    </Grid>)
}