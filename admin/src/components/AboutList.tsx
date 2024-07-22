import { List,
    Datagrid,
    TextField,
    EditButton
} from 'react-admin';

const AboutList = (props: any) => {
    return <List {...props}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="id"/>
            <TextField source="title"/>
            <TextField source="content"/>
            <EditButton resource="contents/about" />
        </Datagrid>
    </List>
};

export default AboutList;