import { Button, TextEditor, TextInput } from '@shared/ui'
import type { ReactElement, ReactNode } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'

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

export function CreateGuide(): ReactNode {
    const form = useForm<UseCreateGuideForm>({
        defaultValues,
        mode: 'all',
        reValidateMode: 'onChange'
    })

    return (
        <FormProvider {...form}>
            <div className="flex flex-col">
                <h1 className="text-5xl font-bold text-center">
                    Create your guide
                </h1>

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

                <Button>Complete</Button>
            </div>
        </FormProvider>
    )
}
