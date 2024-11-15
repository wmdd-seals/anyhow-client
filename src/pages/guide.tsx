import { useEffect, useState, type ReactNode } from 'react'
import { Icon, TextEditor } from '@shared/ui'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer/ui/footer'
import { QuizChallenge } from '@widgets/quiz-challenge'
import { GET_QUIZ_ID_QUERY } from '../entities/quiz'
import { Button } from '@shared/ui'
import { GuideChat } from '@widgets/guide-chat'
import { Transition, TransitionChild } from '@headlessui/react'
import { getGuideProgress, Tag } from 'src/entities/guide'
import { STORE_GUIDE_COMPLETED } from 'src/features/store-guide-completed/api/store-guide-completed'
import { GET_GUIDE_COMPLETED_LIST } from '@widgets/quiz-challenge/api/get-guide-completed-list'
import { ArrowRight, Bookmark, Zap } from 'react-feather'
import { ThumbsUp, ThumbsDown } from 'react-feather'
import { useAuth } from '@shared/lib'
import { Loading } from '@widgets/loading'

const GUIDE_QUERY = graphql(`
    query Guide($id: ID!) {
        res: guide(id: $id) {
            id
            title
            liked
            rating
            body
            bookmark
            tags
            user {
                id
                firstName
                lastName
            }
        }
    }
`)

const REVIEW_GUIDE_MUTATION = graphql(`
    mutation ReviewGuide($input: ReviewGuideInput!) {
        res: reviewGuide(input: $input)
    }
`)

const REVOKE_GUIDE_REVIEW_MUTATION = graphql(`
    mutation RevokeGuideReview($input: RevokeGuideReviewInput!) {
        res: revokeGuideReview(input: $input)
    }
`)

const ADD_BOOKMARK_MUTATION = graphql(`
    mutation AddBookmark($input: AddBookmarkInput!) {
        res: addBookmark(input: $input)
    }
`)

const REMOVE_BOOKMARK_MUTATION = graphql(`
    mutation RemoveBookmark($input: RemoveBookmarkInput!) {
        res: removeBookmark(input: $input)
    }
`)

const STORE_GUIDE_VIEW_MUTATION = graphql(`
    mutation StoreGuideView($input: GuideViewInput!) {
        storeGuideView(input: $input) {
            createdAt
            guideId
            id
            userId
        }
    }
`)

export function GuidePage(): ReactNode {
    const { isAuthenticated } = useAuth()
    const params = useParams<{ id: string }>()
    const [storeGuideCompletedMutation] = useMutation(STORE_GUIDE_COMPLETED)
    const [storeGuideViewMutation] = useMutation(STORE_GUIDE_VIEW_MUTATION)

    if (!params.id) return 'Guide not found'

    const { data, loading, error } = useQuery(GUIDE_QUERY, {
        variables: { id: params.id },
        skip: !params.id
    })

    const [sidebar, setSidebar] = useState<boolean>(false)

    const { data: guideCompletedList } = useQuery(GET_GUIDE_COMPLETED_LIST)

    const [reviewGuideMutation] = useMutation(REVIEW_GUIDE_MUTATION, {
        update: (cache, _, { variables }) => {
            if (!variables) return

            const {
                input: { liked }
            } = variables

            cache.modify({
                id: `Guide:${params.id!}`,
                fields: {
                    liked: () => liked
                }
            })
        }
    })

    const [addBookmarkMutation, { loading: addingBookmarkLoading }] =
        useMutation(ADD_BOOKMARK_MUTATION, {
            variables: { input: { guideId: params.id } },
            update: (cache, _, { variables }) => {
                if (!variables) return

                const {
                    input: { guideId }
                } = variables

                cache.modify({
                    id: `Guide:${guideId}`,
                    fields: {
                        bookmark: () => true
                    }
                })
            }
        })

    const [removeBookmarkMutation, { loading: removingBookmarkLoading }] =
        useMutation(REMOVE_BOOKMARK_MUTATION, {
            variables: { input: { guideId: params.id } },
            update: (cache, _, { variables }) => {
                if (!variables) return

                const {
                    input: { guideId }
                } = variables

                cache.modify({
                    id: `Guide:${guideId}`,
                    fields: {
                        bookmark: () => false
                    }
                })
            }
        })

    const [revokeGuideReviewMutation] = useMutation(
        REVOKE_GUIDE_REVIEW_MUTATION,
        {
            variables: { input: { id: params.id } },
            update: cache => {
                cache.modify({
                    id: `Guide:${params.id!}`,
                    fields: {
                        liked: () => null
                    }
                })
            }
        }
    )

    const likeGuide = (): void => {
        const isLiked = data?.res?.liked

        if (typeof isLiked === 'boolean' && isLiked) {
            void revokeGuideReviewMutation()
            return
        }

        void reviewGuideMutation({
            variables: { input: { liked: true, id: params.id! } }
        })
    }

    const dislikeGuide = (): void => {
        const isLiked = data?.res?.liked

        if (typeof isLiked === 'boolean' && !isLiked) {
            void revokeGuideReviewMutation()
            return
        }

        void reviewGuideMutation({
            variables: { input: { liked: false, id: params.id! } }
        })
    }

    const isGuideCompleted = guideCompletedList?.res.some(
        item => item.guideId === params.id
    )

    const handleCompleted = (guideId: string): void => {
        void storeGuideCompletedMutation({
            variables: {
                input: { guideId }
            },
            refetchQueries: [GET_GUIDE_COMPLETED_LIST]
        })
    }

    const { data: quizInfo } = useQuery(GET_QUIZ_ID_QUERY, {
        variables: {
            guideId: params.id
        },
        skip: !params
    })
    const quizId = quizInfo?.res?.quiz?.id

    const [showQuiz, setShowQuiz] = useState<boolean>(false)

    useEffect(() => {
        if (!params.id) return

        void storeGuideViewMutation({
            variables: { input: { guideId: params.id } }
        })
    }, [params.id])

    if (loading) return <Loading />

    if (error || !data?.res) return 'Something went wrong...'

    const progress = getGuideProgress(data.res.body || '')
    const minutes = Math.ceil((progress * 60) / 100)

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="grow p-6">
                <article className="max-w-[50rem] w-full mx-auto flex flex-col py-16">
                    <Button
                        onClick={(): void => setSidebar(true)}
                        size="small"
                        className="max-sm:fixed sticky right-5 max-sm:bottom-5 md:top-[10rem] ml-auto w-fit border-2 border-white"
                    >
                        Ask Any
                        <Zap className="size-5" />
                    </Button>

                    <h1 className="text-5xl font-bold mb-8 text-center">
                        {data.res.title}
                    </h1>

                    <span className="text-center font-medium">
                        {minutes} minute{minutes === 1 ? '' : 's'} guide
                    </span>

                    <div className="flex items-center gap-3 font-bold mb-8">
                        <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-200 text-slate-800 space-x-1">
                            {data.res.user!.firstName[0].toUpperCase() +
                                data.res.user!.lastName[0].toUpperCase()}
                        </div>
                        <div>
                            {data.res.user!.firstName} {data.res.user!.lastName}
                        </div>
                    </div>

                    <div className="py-3 border-t border-b border-any-purple-100 flex items-center justify-between">
                        {!!data.res.rating && data.res.rating > 0 && (
                            <div className="flex items-center gap-2">
                                <ThumbsUp className="w-5 h-5" />
                                <p className="h-full mt-1 flex items-center text-xs align-middle text-gray-500">
                                    {data.res.rating}% Positive
                                </p>
                            </div>
                        )}

                        <button
                            onClick={(): void => {
                                if (
                                    addingBookmarkLoading ||
                                    removingBookmarkLoading
                                )
                                    return

                                if (data.res?.bookmark) {
                                    void removeBookmarkMutation()
                                } else {
                                    void addBookmarkMutation()
                                }
                            }}
                        >
                            <Bookmark
                                fill={
                                    typeof data.res.bookmark === 'boolean' &&
                                    data.res.bookmark
                                        ? '#000'
                                        : '#fff'
                                }
                            />
                        </button>
                    </div>

                    <TextEditor value={data.res.body || ''} editable={false} />

                    {!!data.res.tags.length && (
                        <div className="flex items-center flex-wrap gap-4 my-16">
                            {(data.res.tags as string[]).map((tag, index) => {
                                return (
                                    <Tag key={index} active>
                                        {tag}
                                    </Tag>
                                )
                            })}
                        </div>
                    )}

                    <hr />

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-6">
                        {isAuthenticated && quizId && !showQuiz && (
                            <Button
                                onClick={() => setShowQuiz(true)}
                                kind="secondary"
                            >
                                Test your learning
                                <ArrowRight />
                            </Button>
                        )}

                        {isAuthenticated && !showQuiz && !isGuideCompleted && (
                            <Button
                                onClick={() =>
                                    handleCompleted(params.id as string)
                                }
                            >
                                Mark as completed
                            </Button>
                        )}

                        {isGuideCompleted && (
                            <div className="flex items-center gap-2">
                                <button onClick={likeGuide}>
                                    <ThumbsUp
                                        fill={
                                            typeof data.res.liked ===
                                                'boolean' && data.res.liked
                                                ? '#000'
                                                : '#fff'
                                        }
                                    />
                                </button>
                                <button onClick={dislikeGuide}>
                                    <ThumbsDown
                                        fill={
                                            typeof data.res.liked ===
                                                'boolean' && !data.res.liked
                                                ? '#000'
                                                : '#fff'
                                        }
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    {quizId && showQuiz && (
                        <QuizChallenge
                            guideId={params.id}
                            quizId={quizId}
                            handleCompleted={() =>
                                handleCompleted(params.id as string)
                            }
                            isGuideCompleted={isGuideCompleted as boolean}
                        />
                    )}
                </article>

                <Transition show={sidebar}>
                    {/* Backdrop effect */}
                    <TransitionChild>
                        <div
                            className="z-[2] fixed inset-0 transition bg-gray-900/30 data-[closed]:opacity-0"
                            onClick={(): void => {
                                setSidebar(false)
                            }}
                        />
                    </TransitionChild>

                    <TransitionChild>
                        <div
                            className={`transition bg-white h-screen fixed
                                max-w-[30rem] w-full rounded-l-3xl top-0 right-0 z-[2]
                                data-[closed]:translate-x-full py-8 px-5
                                flex flex-col`}
                        >
                            <button
                                className="p-1 ml-auto"
                                onClick={(): void => setSidebar(false)}
                            >
                                <Icon.X />
                            </button>

                            <GuideChat guideId={params.id} className="" />
                        </div>
                    </TransitionChild>
                </Transition>
            </main>

            <Footer />
        </div>
    )
}
