import { Button, TextEditor, TextInput } from '@shared/ui'
import type { ReactElement, ReactNode } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useCreateGuide } from '../api/use-create-guide'
import cn from 'clsx'

type UseCreateGuideForm = {
    title: string
    tags: string[]
    body: string
}

const defaultValues = {
    title: '',
    tags: [],
    body: ''
}

type CreateGuideProps = {
    className?: string
}

export function CreateGuide(props: CreateGuideProps): ReactNode {
    const { className } = props

    const form = useForm<UseCreateGuideForm>({
        defaultValues,
        mode: 'all',
        reValidateMode: 'onChange'
    })

    const { create, data, loading } = useCreateGuide()

    const body = form.watch('body')
    const progress =
        ((body.replaceAll('\n', '').length * 0.95) / (1500 * 6)) * 100

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
                    onClick={form.handleSubmit(data => {
                        create({
                            body: data.body,
                            title: data.title,
                            tags: data.tags.split(','),
                            description: 'description'
                        })
                    })}
                >
                    Complete
                </Button>
            </div>
        </FormProvider>
    )
}
