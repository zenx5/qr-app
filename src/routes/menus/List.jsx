import { useState, useEffect } from "react";
import { trans } from "../../tools/Location";
import { useNavigate } from "react-router-dom";
import { ListView } from "../../components";
import { getResource } from "../../tools/resourceRequest";

export default function ListClients(props) {
  const navigate = useNavigate()
	const [menus, setMenus] = useState([])

  useEffect(() => {
		(async () => {
			const {data} = await getResource('menus', props.client )
      console.log( data )
      setMenus( prev => data.data )
		})();
	}, []);

  const handlerView = id => {
    navigate(`/${process.env.REACT_APP_ROUTE_VIEW_MENU}/${id}`)
  }

  const handlerEdit = id => {
    navigate(`/${process.env.REACT_APP_ROUTE_EDIT_MENU}/${id}`)
  }

  return(<ListView 
    headers={ [
      { key: 'name', name: trans('Name'), default: '' },
      { key: 'currency', name: trans('Currency'), default: '' },
      { key: 'token', name: trans('Token'), default: 'http://localhost:5000/m/', format: (index, value) => (<a href={`http://localhost:5000/m/${value}`} target='_blank'>http://localhost:5000/m/{value}</a>) },
      { key: 'Client', name: trans('Client'), default: '', format: (index, item) => item?.email},
    ] }
    disableSelection
    records={menus}
    onView={handlerView}
    onEdit={handlerEdit}
    id={'id'}
  />)
}