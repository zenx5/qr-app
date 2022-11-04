import { ListItem, ListItemButton, ListItemText, IconButton } from "@mui/material"
import { Clear } from '@mui/icons-material'

export default function ItemMenu(props){
    const { 
        label,
        onClick,
        onDelete
    } = props

    return(
        <ListItem 
            secondaryAction={<IconButton onClick={onDelete}><Clear /></IconButton>}>
            <ListItemButton onClick={onClick}>
                <ListItemText primary={label}></ListItemText>
            </ListItemButton>
        </ListItem>
    )
}