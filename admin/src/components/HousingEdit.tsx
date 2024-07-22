import { Edit, SimpleForm, TextInput } from 'react-admin';
import SaveOnlyToolbar from './Toolbar';

const HousingEdit = (props: any) => {
    return (
        <Edit {...props} mutationMode='pessimistic'>
            <SimpleForm toolbar={<SaveOnlyToolbar/>}>
                <TextInput disabled source="id" />
                <TextInput source="title" />
                <TextInput source="content" multiline />
                <TextInput disabled source="page"/>
            </SimpleForm>
        </Edit>
    );
};

export default HousingEdit;