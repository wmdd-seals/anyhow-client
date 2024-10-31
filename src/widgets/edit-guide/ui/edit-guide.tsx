import { Button, TextEditor, TextInput } from '@shared/ui'
import { useCallback, useRef, type ReactElement, type ReactNode } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import cn from 'clsx'
import { GET_GUIDE_QUERY } from '../api/get-guide'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_GUIDE_MUTATION } from '../api/update-guide'
import { useNavigate } from 'react-router-dom'
import { UPLOAD_GUIDE_COVER } from '../api/upload-guide-cover'
import { toBase64 } from '@shared/lib/file'
import { REMOVE_GUIDE_COVER } from '../api/remove-guide-cover'

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

    const [updateGuideMutation] = useMutation(UPDATE_GUIDE_MUTATION)
    const [uploadCoverMutation] = useMutation(UPLOAD_GUIDE_COVER)
    const [removeCoverMutation] = useMutation(REMOVE_GUIDE_COVER, {
        variables: { id }
    })

    const coverImageRef = useRef<HTMLImageElement>(null)

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

    const selectCoverAndUpload = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.multiple = false

        input.addEventListener('change', async () => {
            const cover = input.files?.[0]
            if (!cover) return

            await uploadCoverMutation({
                variables: {
                    input: {
                        name: cover.name,
                        guideId: id,
                        mimeType: cover.type,
                        base64Data: await toBase64(cover)
                    }
                }
            })

            coverImageRef.current!.src = getGuideCoverUrl(id)
        })

        input.click()
    }, [])

    const removeCover = useCallback(() => {
        void removeCoverMutation()

        coverImageRef.current!.src = `/guide-cover-thumbnail.jpg`
    }, [])

    if (loading) return 'Loading...'

    if (!data?.res) return 'Something went wrong...'

    return (
        <FormProvider {...form}>
            <div className="relative">
                <img
                    ref={coverImageRef}
                    src={getGuideCoverUrl(id)}
                    onError={(e): void => {
                        // if not loaded for any reason, use thumbnail
                        e.currentTarget.src = `/guide-cover-thumbnail.jpg`
                    }}
                    alt="Guide Cover Thumbnail"
                    className="max-w-[1300px] mx-auto"
                />

                <div className="absolute left-1/2 -translate-x-1/2 bottom-14 flex items-center gap-2">
                    <Button onClick={selectCoverAndUpload}>Edit</Button>
                    <Button onClick={removeCover}>Delete</Button>
                </div>
            </div>

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
                        const guide = await updateGuideMutation({
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

function getGuideCoverUrl(id: string): string {
    return (
        import.meta.env.VITE_API_URL +
        import.meta.env.VITE_IMAGES_ENDPOINT +
        `/${id}`
    )
}
