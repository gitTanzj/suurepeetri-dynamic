import { Edit, SimpleForm, TextInput } from 'react-admin';

const HousingEdit = (props: any) => {
    return (
        <Edit {...props} mutationMode='pessimistic'>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="title" />
                <TextInput source="content" multiline />
                <TextInput disabled source="page"/>
            </SimpleForm>
        </Edit>
    );
};

export default HousingEdit;