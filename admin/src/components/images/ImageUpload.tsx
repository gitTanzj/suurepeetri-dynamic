import { Create, TextInput, ImageInput, SimpleForm, ImageField } from 'react-admin';

const ImageUpload = (props: any) => {
    return <Create title="Upload an Image" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <ImageInput source="image" name="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
                <ImageField source="src" title="image"/>
            </ImageInput>
        </SimpleForm>
    </Create>
}

export default ImageUpload