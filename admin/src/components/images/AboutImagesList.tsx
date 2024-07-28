import { List, Datagrid, TextField, ImageField } from 'react-admin';

const AboutImageList = (props: any) => {
    return <List {...props}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="id"/>
            <ImageField source="url" src="url"/>
        </Datagrid>
    </List>
}

export default AboutImageList;