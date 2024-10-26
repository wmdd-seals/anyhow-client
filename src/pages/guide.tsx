import { type ReactNode, useState } from 'react'
import { TextEditor, Button, Icon } from '@shared/ui'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer/ui/footer'
import { GuideChat } from '@widgets/guide-chat'
import { Transition, TransitionChild } from '@headlessui/react'
import { getGuideProgress } from 'src/entities/guide'
import { QuizChallenge } from '@widgets/quiz-challenge'

const GUIDE_QUERY = graphql(`
    query Guide($id: ID!) {
        res: guide(id: $id) {
            id
            title
            body
            tags
            user {
                id
                firstName
                lastName
            }
        }
    }
`)

const GET_QUIZ_DATA_QUERY = graphql(`
    query GetQuizData($guideId: ID!) {
        res: guide(id: $guideId) {
            quiz {
                id
                body {
                    quiz {
                        questions {
                            correctAnswerIndex
                            options
                            questionTitle
                        }
                    }
                }
            }
        }
    }
`)

export function GuidePage(): ReactNode {
    const params = useParams<{ id: string }>()

    const { data, loading, error } = useQuery(GUIDE_QUERY, {
        variables: { id: params.id! },
        skip: !params.id
    })

    const [sidebar, setSidebar] = useState<boolean>(false)
    const { data: quizInfo, loading: quizLoading } = useQuery(
        GET_QUIZ_DATA_QUERY,
        {
            variables: {
                guideId: params.id!
            },
            skip: !params
        }
    )

    const quizId = quizInfo?.res.quiz?.id
    const quizData =
        quizInfo?.res.quiz?.body?.quiz?.questions
            ?.filter(question => question?.options)
            .map(question => ({
                questionTitle: question!.questionTitle,
                options: question!.options.filter(
                    (option): option is string => option !== null
                ),
                correctAnswerIndex: question!.correctAnswerIndex
            })) || []

    const [showQuiz, setShowQuiz] = useState(false)

    if (!params.id) return 'Guide not found'

    if (loading) return 'Loading...'

    if (error || !data?.res) return 'Something went wrong...'

    const progress = getGuideProgress(data.res.body!)
    const minutes = Math.ceil((progress * 60) / 100)

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="grow">
                <article className="max-w-[50rem] w-full mx-auto flex flex-col">
                    <button onClick={(): void => setSidebar(true)}>
                        Ask Any
                    </button>

                    <h1 className="text-5xl font-bold mb-8 text-center">
                        {data.res.title}
                    </h1>

                    <span className="text-center font-medium">
                        {minutes} minute{minutes === 1 ? '' : 's'} guide
                    </span>

                    <div className="flex items-center gap-3 font-bold mb-8">
                        <div className="size-10 rounded-full bg-gray-200" />
                        <div>
                            {data.res.user!.firstName} {data.res.user!.lastName}
                        </div>
                    </div>
                    <TextEditor value={data.res.body || ''} editable={false} />
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

                <div className="flex justify-center">
                    {quizId && !showQuiz && (
                        <Button onClick={() => setShowQuiz(true)}>
                            Test your learning
                        </Button>
                    )}

                    {quizId && showQuiz && (
                        <QuizChallenge
                            quizId={quizId}
                            quizData={quizData}
                            quizLoading={quizLoading}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
