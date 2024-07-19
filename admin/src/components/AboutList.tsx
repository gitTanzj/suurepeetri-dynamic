import { List,
    Datagrid,
    TextField,
    EditButton
} from 'react-admin';

const AboutList = (props: any) => {
    return <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="title"/>
            <TextField source="content"/>
            <EditButton resource="about" />
        </Datagrid>
    </List>
};

export default AboutList;