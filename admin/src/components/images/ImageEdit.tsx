import { Edit, SimpleForm, TextInput, ImageInput } from 'react-admin';
import SaveOnlyToolbar from '../Toolbar';

const ImageEdit = (props: any) => {
  return <Edit {...props} mutationMode='pessimistic'>
        <SimpleForm toolbar={<SaveOnlyToolbar/>}>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <ImageInput source="url" />
            <TextInput disabled source="url"/>
        </SimpleForm>
    </Edit>
}

export default ImageEdit;
