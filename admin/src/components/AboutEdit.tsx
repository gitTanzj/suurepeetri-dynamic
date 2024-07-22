import { Edit, SimpleForm, TextInput } from 'react-admin';

const AboutEdit = (props: any) => {
    return (
        <Edit {...props} mutationMode='pessimistic'>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="title" />
                <TextInput source="content" multiline />
            </SimpleForm>
        </Edit>
    );
};

export default AboutEdit;