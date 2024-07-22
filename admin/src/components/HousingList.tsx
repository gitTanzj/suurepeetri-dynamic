import { List,
    Datagrid,
    TextField,
    EditButton
} from 'react-admin';

const HousingList = (props: any) => {
    return <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="title"/>
            <TextField source="content"/>
            <EditButton resource="housing" />
        </Datagrid>
    </List>
};

export default HousingList;