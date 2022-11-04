import { useParams } from "react-router-dom";


export default function Index(){
    const { id } = useParams()
    
    return(<p>ID: {id}</p>)
}