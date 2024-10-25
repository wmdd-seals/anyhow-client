import { Button, TextEditor, TextInput } from '@shared/ui'
import { type ReactElement, type ReactNode } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import cn from 'clsx'
import { GET_GUIDE_QUERY } from '../api/get-guide'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_GUIDE_MUTATION } from '../api/update-guide'
import { useNavigate } from 'react-router-dom'

type UseCreateGuideForm = {
    title: string
    tags: string
    body: string
}

const defaultValues = {
    title: '',
    tags: '',
    body: ''
}

type EditGuideProps = {
    className?: string
    id: string
}

export function EditGuide(props: EditGuideProps): ReactNode {
    const { className, id } = props

    const { data, loading } = useQuery(GET_GUIDE_QUERY, { variables: { id } })

    const navigate = useNavigate()

    const [updateGuide] = useMutation(UPDATE_GUIDE_MUTATION)

    const form = useForm<UseCreateGuideForm>({
        defaultValues,
        values: {
            body: data?.res.body || '',
            title: data?.res.title || '',
            tags: (data?.res.tags as string) || ''
        },
        mode: 'all',
        reValidateMode: 'onChange'
    })

    const body = form.watch('body')
    const progress =
        ((body.replaceAll('\n', '').length * 0.95) / (1500 * 6)) * 100

    if (loading) return 'Loading...'

    if (!data?.res) return 'Something went wrong...'

    return (
        <FormProvider {...form}>
            <div
                className={cn(
                    'flex flex-col max-w-[50rem] mx-auto w-full',
                    className
                )}
            >
                <h1 className="text-5xl font-bold text-center">
                    Create your guide
                </h1>

                <div className="flex flex-col">
                    <span>Progress</span>

                    <div
                        className="h-4 rounded-lg border border-grey-200"
                        style={{
                            background: `linear-gradient(to right, #000 0% ${progress}%, #fff ${progress}%)`
                        }}
                    />
                </div>

                <Controller<UseCreateGuideForm, 'title'>
                    name="title"
                    rules={{
                        required: { value: true, message: 'Title is required' }
                    }}
                    render={({
                        field,
                        fieldState: { error }
                    }): ReactElement => {
                        return (
                            <div>
                                <TextInput label={'Title'} {...field} />
                                {error?.message && (
                                    <span className="text-red-500">
                                        {error.message}
                                    </span>
                                )}
                            </div>
                        )
                    }}
                />

                <Controller<UseCreateGuideForm, 'tags'>
                    name="tags"
                    rules={{
                        required: {
                            value: true,
                            message:
                                'Adds several tags to allow users to find your guide'
                        }
                    }}
                    render={({
                        field,
                        fieldState: { error }
                    }): ReactElement => {
                        return (
                            <div>
                                <TextInput label={'Tags'} {...field} />
                                {error?.message && (
                                    <span className="text-red-500">
                                        {error.message}
                                    </span>
                                )}
                            </div>
                        )
                    }}
                />

                <Controller<UseCreateGuideForm, 'body'>
                    name="body"
                    rules={{
                        required: {
                            value: true,
                            message: 'Content is required'
                        }
                    }}
                    render={({
                        field,
                        fieldState: { error }
                    }): ReactElement => {
                        return (
                            <div className="flex flex-col">
                                <span>Content</span>
                                <TextEditor
                                    editable
                                    initialValue={data.res.body!}
                                    onChange={field.onChange}
                                />
                                {error?.message && (
                                    <span className="text-red-500">
                                        {error.message}
                                    </span>
                                )}
                            </div>
                        )
                    }}
                />

                <Button
                    onClick={form.handleSubmit(async data => {
                        const guide = await updateGuide({
                            variables: {
                                input: {
                                    id,
                                    title: data.title,
                                    body: data.body,
                                    tags: data.tags.trim().split(','),
                                    published: true
                                }
                            }
                        })

                        if (!guide.data?.res) return

                        navigate(`/${guide.data.res.id}`)
                    })}
                >
                    Publish
                </Button>
            </div>
        </FormProvider>
    )
}
