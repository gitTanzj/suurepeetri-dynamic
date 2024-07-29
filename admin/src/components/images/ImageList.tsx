import { List, Datagrid, TextField, ImageField, EditButton } from 'react-admin';

const ImageList = (props: any) => {
    return <List {...props}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="title"/>
            <ImageField source="url" src="url"/>
            <EditButton resource="images/one" />
        </Datagrid>
    </List>
}

export default ImageList;