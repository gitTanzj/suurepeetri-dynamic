import { List, Datagrid, TextField } from "react-admin";

export const AboutList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="content" />
        </Datagrid>
    </List>
);