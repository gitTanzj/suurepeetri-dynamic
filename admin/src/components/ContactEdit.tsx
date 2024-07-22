import { Edit, SimpleForm, TextInput } from 'react-admin';

const ContactEdit = (props: any) => {
    return (
        <Edit {...props} mutationMode='pessimistic'>
            <SimpleForm>
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