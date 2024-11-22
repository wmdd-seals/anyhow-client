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
import { useSaveQuizAnswer } from '@widgets/quiz-challenge/api/use-save-answers.ts'
import { GET_QUIZ_ANSWERS } from '@widgets/quiz-challenge/api/get-quiz-answers'

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

const GUIDE_VIEWS_QUERY = graphql(`
    query GuideViewCountByGuide($input: GuideViewCountByGuideIdInput!) {
        res: guideViewCountByGuideId(input: $input) {
            count
            guideId
        }
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
    const { isAuthenticated, setToast } = useAuth()
    const params = useParams<{ id: string }>()
    const [storeGuideCompletedMutation] = useMutation(STORE_GUIDE_COMPLETED)
    const [storeGuideViewMutation] = useMutation(STORE_GUIDE_VIEW_MUTATION)
    const { save: storeQuizCompleted } = useSaveQuizAnswer()

    const { data, loading, error } = useQuery(GUIDE_QUERY, {
        variables: { id: params.id! },
        skip: !params.id
    })

    const { data: guideViewsData } = useQuery(GUIDE_VIEWS_QUERY, {
        variables: { input: { guideId: params.id! } },
        skip: !params.id
    })

    const guideViews = guideViewsData?.res.count || 0

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
            variables: { input: { guideId: params.id! } },
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
            variables: { input: { guideId: params.id! } },
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
            variables: { input: { id: params.id! } },
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

    const { data: quizInfo } = useQuery(GET_QUIZ_ID_QUERY, {
        variables: {
            guideId: params.id!
        },
        skip: !params
    })
    const quizId = quizInfo?.res?.quiz?.id

    const handleCompletedGuide = (guideId: string): void => {
        void storeGuideCompletedMutation({
            variables: {
                input: { guideId }
            },
            refetchQueries: [GET_GUIDE_COMPLETED_LIST]
        })
    }

    // 今かいてる
    const { data: quizCompletedInfo } = useQuery(GET_QUIZ_ANSWERS, {
        variables: { quizId },
        skip: !quizId
    })

    console.log(quizCompletedInfo)
    const isQuizCompleted = quizCompletedInfo?.res[0]?.iscompleted ?? false

    const handleCompletedQuiz = async (): Promise<void> => {
        setShowQuiz(false)
        setToast({
            visible: true,
            message: 'Quiz is completed!'
        })

        await storeQuizCompleted(
            {
                quizid: quizId as string,
                iscompleted: true
            },
            {
                refetchQueries: [
                    { query: GET_QUIZ_ANSWERS, variables: { quizId } }
                ],
                awaitRefetchQueries: true
            }
        )
    }

    const [showQuiz, setShowQuiz] = useState<boolean>(false)

    useEffect(() => {
        if (!params.id) return

        void storeGuideViewMutation({
            variables: { input: { guideId: params.id } }
        })
    }, [])

    if (!params.id) return 'Guide not found'

    if (loading) return <Loading />

    if (error || !data?.res) return 'Something went wrong...'

    const progress = getGuideProgress(data.res.body || '')
    const minutes = Math.ceil((progress * 60) / 100)

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="grow p-6">
                <article className="max-w-[50rem] w-full mx-auto flex flex-col py-16">
                    {isAuthenticated && (
                        <Button
                            onClick={(): void => setSidebar(true)}
                            size="small"
                            className="max-sm:fixed sticky right-5 max-sm:bottom-5 md:top-[10rem] ml-auto w-fit border-2 border-white"
                        >
                            Ask Any
                            <Zap className="size-5" />
                        </Button>
                    )}
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

                        <div className="ml-auto text-sm font-normal">
                            {guideViews} views
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
                    <img
                        src={`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_IMAGES_ENDPOINT}/${data.res.id}`}
                        onError={(e): void => {
                            // if not loaded for any reason, remove it
                            e.currentTarget.remove()
                        }}
                        alt="Guide Cover Thumbnail"
                        className="w-full object-cover object-center mx-auto rounded-3xl mt-6 mb-4"
                    />
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
                        {isAuthenticated &&
                            quizId &&
                            !showQuiz &&
                            isQuizCompleted && (
                                <Button
                                    onClick={() => setShowQuiz(true)}
                                    kind="secondary"
                                >
                                    Try Quiz Again
                                    <ArrowRight />
                                </Button>
                            )}

                        {isAuthenticated &&
                            quizId &&
                            !showQuiz &&
                            !isQuizCompleted && (
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
                                    handleCompletedGuide(params.id as string)
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
                            handleCompletedGuide={() =>
                                handleCompletedGuide(params.id as string)
                            }
                            handleCompletedQuiz={handleCompletedQuiz}
                            isQuizCompleted={isQuizCompleted}
                        />
                    )}
                </article>

                <Transition show={sidebar}>
                    <TransitionChild>
                        <div
                            className={`transition bg-any-gray-50 h-screen fixed
                                max-w-[25rem] w-full rounded-l-3xl top-0 right-0 z-[2]
                                data-[closed]:translate-x-full py-8 px-5
                                flex flex-col border shadow-md`}
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
