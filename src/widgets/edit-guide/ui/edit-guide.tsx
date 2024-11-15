import { Button, TextEditor, TextInput } from '@shared/ui'
import { useCallback, type ReactElement, type ReactNode } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import cn from 'clsx'
import { GET_GUIDE_QUERY } from '../api/get-guide'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_GUIDE_MUTATION } from '../api/update-guide'
import { useGenerateQuiz } from '../../quiz-creation/api/use-generate-quiz'
import { useNavigate } from 'react-router-dom'

import { toBase64 } from '@shared/lib/file'
import { UPLOAD_GUIDE_IMAGE } from '../api/upload-guide-image'
import { getGuideProgress, Tag } from 'src/entities/guide'
import { X, Check } from 'react-feather'
import { Loading, SmallLoading } from '@widgets/loading'

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

    const [uploadGuideImage] = useMutation(UPLOAD_GUIDE_IMAGE)

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

    const wordsLeft = Math.max(1500 - Math.round(body.length / 6), 0)

    const syncGuide = useCallback(
        debounce((body: string) => {
            void updateGuideMutation({ variables: { input: { id, body } } })
        }, 1000),
        [id]
    )

    if (loading) return <Loading />

    if (!data?.res) return 'Something went wrong...'

    return (
        <FormProvider {...form}>
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
                    <span className="mb-2">Progress</span>

                    <div className="relative border border-any-gray-100 h-4 w-full rounded-lg overflow-hidden">
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(to right, ${progress !== 100 ? '#32d430' : '#ef4444'} 0% ${progress}%, #fff ${progress}%)`
                            }}
                        />
                    </div>

                    <div className="self-end text-sm font-medium mt-2">
                        ≈ {wordsLeft} words left
                    </div>
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
                                <span className="font-bold mb-2">Content</span>
                                <TextEditor
                                    editable
                                    className={cn(
                                        progress === 100 && '!border-red-500'
                                    )}
                                    maxLength={Math.round(1500 * 6) + 1}
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
                                    labelClassName="font-bold"
                                    placeholder="Hit enter to add"
                                    suffix={
                                        <Button
                                            kind="neutral"
                                            size="small"
                                            className="pointer-events-none"
                                        >
                                            Hit enter to add
                                        </Button>
                                    }
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
                                {!!field.value.length && (
                                    <div className="flex items-center flex-wrap gap-4 mt-6">
                                        {field.value.map((tag, index) => {
                                            return (
                                                <Tag
                                                    key={index}
                                                    active
                                                    prefix={
                                                        <Check className="size-4" />
                                                    }
                                                    suffix={
                                                        <button
                                                            onClick={function () {
                                                                field.onChange(
                                                                    field.value.filter(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    )
                                                                )
                                                            }}
                                                        >
                                                            <X className="size-4" />
                                                        </button>
                                                    }
                                                >
                                                    {tag}
                                                </Tag>
                                            )
                                        })}
                                    </div>
                                )}
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
                    <p className="text-center text-xl flex items-center gap-2 justify-center">
                        <div className="flex items-center gap-2 w-16 h-16">
                            <SmallLoading />
                        </div>
                        <span>Generating quiz...</span>
                    </p>
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
