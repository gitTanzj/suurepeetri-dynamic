import { Edit, SimpleForm, TextInput } from 'react-admin';
import SaveOnlyToolbar from '../Toolbar';

const ContactEdit = (props: any) => {
    return (
        <Edit {...props} mutationMode='pessimistic'>
            <SimpleForm toolbar={<SaveOnlyToolbar/>}>
                <TextInput disabled source="id" />
                <TextInput source="title" />
                <TextInput source="email" />
                <TextInput source="phone_number" />
                <TextInput source="address" />
            </SimpleForm>
        </Edit>
    );
};

export default ContactEdit;