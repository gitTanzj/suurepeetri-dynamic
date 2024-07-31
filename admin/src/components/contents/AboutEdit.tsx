import { Edit, SimpleForm, TextInput } from 'react-admin';
import SaveOnlyToolbar from '../Toolbar';

const AboutEdit = (props: any) => {
    return (
        <Edit {...props}  mutationMode='pessimistic'>
            <SimpleForm toolbar={<SaveOnlyToolbar/>}>
                <TextInput disabled source="id" />
                <TextInput source="title" />
                <TextInput source="content" multiline />
            </SimpleForm>
        </Edit>
    );
};

export default AboutEdit;