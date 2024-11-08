import { Button, TextEditor, TextInput } from '@shared/ui'
import { useCallback, useRef, type ReactElement, type ReactNode } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import cn from 'clsx'
import { GET_GUIDE_QUERY } from '../api/get-guide'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_GUIDE_MUTATION } from '../api/update-guide'
import { useGenerateQuiz } from '../../quiz-creation/api/use-generate-quiz'
import { useNavigate } from 'react-router-dom'
import { UPLOAD_GUIDE_COVER } from '../api/upload-guide-cover'
import { toBase64 } from '@shared/lib/file'
import { REMOVE_GUIDE_COVER } from '../api/remove-guide-cover'
import { UPLOAD_GUIDE_IMAGE } from '../api/upload-guide-image'
import { getGuideProgress, TagList } from 'src/entities/guide'

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

type EditGuideProps = {
    className?: string
    id: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => unknown>(fn: T, delay: number) {
    let timeoutId: number | undefined

    return function deferred(...args: Parameters<T>): void {
        if (typeof timeoutId !== 'undefined') clearTimeout(timeoutId)

        timeoutId = setTimeout(() => fn(...args), delay) as unknown as number
    }
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
    const [uploadGuideImage] = useMutation(UPLOAD_GUIDE_IMAGE)

    const coverImageRef = useRef<HTMLImageElement>(null)

    const form = useForm<UseCreateGuideForm>({
        defaultValues,
        values: {
            body: data?.res?.body || '',
            title: data?.res?.title || '',
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            tags: (data?.res?.tags as string[]) || []
        },
        mode: 'all',
        reValidateMode: 'onChange'
    })

    const { generate: generateQuiz, loading: generateQuizLoading } =
        useGenerateQuiz()

    const body = form.watch('body')
    const progress = getGuideProgress(body)

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

            coverImageRef.current!.src = getGuideImageUrl(id)
        })

        input.click()
    }, [])

    const removeCover = useCallback(() => {
        void removeCoverMutation()

        coverImageRef.current!.src = `/guide-cover-thumbnail.jpg`
    }, [])

    const syncGuide = useCallback(
        debounce((body: string) => {
            void updateGuideMutation({ variables: { input: { id, body } } })
        }, 1000),
        [id]
    )

    if (loading) return 'Loading...'

    if (!data?.res) return 'Something went wrong...'

    return (
        <FormProvider {...form}>
            <div className="relative">
                <img
                    ref={coverImageRef}
                    src={getGuideImageUrl(id)}
                    onError={(e): void => {
                        // if not loaded for any reason, use thumbnail
                        e.currentTarget.src = `/guide-cover-thumbnail.jpg`
                    }}
                    alt="Guide Cover Thumbnail"
                    className="max-w-[1300px] w-full max-h-[520px] object-cover object-center mx-auto rounded-3xl"
                />

                <div className="absolute left-1/2 -translate-x-1/2 bottom-14 flex items-center gap-2">
                    <Button onClick={selectCoverAndUpload}>Edit</Button>
                    <Button onClick={removeCover}>Delete</Button>
                </div>
            </div>

            <div
                className={cn(
                    'flex flex-col gap-3 max-w-[50rem] mx-auto w-full',
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
                                    blockEditing={progress !== 100}
                                    initialValue={data.res!.body!}
                                    onChange={body => {
                                        field.onChange(body)
                                        syncGuide(body)
                                    }}
                                    onImageUpload={async image => {
                                        const res = await uploadGuideImage({
                                            variables: {
                                                input: {
                                                    name: image.name,
                                                    guideId: id,
                                                    mimeType: image.type,
                                                    base64Data:
                                                        await toBase64(image)
                                                }
                                            }
                                        })

                                        return getGuideImageUrl(
                                            res.data!.res.id!
                                        )
                                    }}
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
                            <div className="mb-4">
                                <TextInput
                                    label={'Tags'}
                                    placeholder="Hit enter to add"
                                    onKeyDown={e => {
                                        if (e.key !== 'Enter') {
                                            return
                                        }

                                        const val = e.currentTarget.value

                                        field.onChange([...field.value, val])
                                        e.currentTarget.value = ''
                                    }}
                                />
                                {error?.message && (
                                    <span className="text-red-500">
                                        {error.message}
                                    </span>
                                )}
                                <TagList tags={field.value} />
                            </div>
                        )
                    }}
                />

                <div className="flex gap-3 justify-center">
                    <Button
                        kind="secondary"
                        onClick={form.handleSubmit(async data => {
                            const guide = await updateGuideMutation({
                                variables: {
                                    input: {
                                        id,
                                        title: data.title,
                                        body: data.body,
                                        tags: data.tags,
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

                    <Button
                        onClick={form.handleSubmit(async data => {
                            const guide = await updateGuideMutation({
                                variables: {
                                    input: {
                                        id,
                                        title: data.title,
                                        body: data.body,
                                        tags: data.tags,
                                        published: true
                                    }
                                }
                            })
                            if (!guide.data?.res) return

                            if (!id) return
                            const result = await generateQuiz({ guideId: id })
                            if (!result) return

                            navigate(`/${id}/edit/quiz`)
                        })}
                    >
                        Generate Quiz
                    </Button>
                </div>
                {generateQuizLoading && (
                    <p className="text-center text-xl">Generating quiz...</p>
                )}
            </div>
        </FormProvider>
    )
}

function getGuideImageUrl(id: string): string {
    return (
        import.meta.env.VITE_API_URL +
        import.meta.env.VITE_IMAGES_ENDPOINT +
        `/${id}`
    )
}
