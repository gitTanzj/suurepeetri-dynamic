import { useParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useGetOne, useUpdate, Title } from 'react-admin'
import { Card, TextField, Button, Stack } from '@mui/material'

const AboutEdit = () => {
    const { id } = useParams();
    const { handleSubmit, reset, control } = useForm();
    const { isPending } = useGetOne(
        'about',
        { id },
        { onSuccess: ({ data }) => reset(data) }
    );
    const [update, {isPending: isSubmitting}] = useUpdate();
    const navigate = useNavigate();
    const onSubmit = (data: any) => {
        update(
            'about',
            { id, data },
            { onSuccess: () => navigate('/about') }
        )
    }

    if (isPending) return null;
    return (
        <div>
            <Title title='About Edition'/>
            <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            name='title'
                            render={({ field }) => <TextField {...field} label='Title' />}
                            control={control}
                        />
                        <Controller
                            name='content'
                            render={({ field }) => <TextField {...field} label='Content' multiline />}
                            control={control}
                        />
                        <Button type='submit' disabled={isSubmitting}>
                            Save
                        </Button>
                    </Stack>
                </form>
            </Card>
        </div>
    )
}

export default AboutEdit
