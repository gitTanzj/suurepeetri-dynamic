import {Toolbar, SaveButton} from 'react-admin';

const SaveOnlyToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton label="Save"/>
    </Toolbar>
);

export default SaveOnlyToolbar