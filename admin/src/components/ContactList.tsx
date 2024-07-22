import { List,
    Datagrid,
    TextField,
    EditButton
} from 'react-admin';

const ContactList = (props: any) => {
    return <List {...props}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="id"/>
            <TextField source="title"/>
            <TextField source="email"/>
            <TextField source="phone_number"/>
            <TextField source="address"/>
            <EditButton resource="contents/contact" />
        </Datagrid>
    </List>
};

export default ContactList;