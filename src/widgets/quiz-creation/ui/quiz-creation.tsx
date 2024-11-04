import { type ReactNode, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QuestionCreation } from './question-creation'
import { Button } from '@shared/ui'
import { useUpdateQuiz, usePublishGuide } from '../index'
import type { QuestionInput } from '@gqlgen/graphql'
import { GET_QUIZ_QUERY } from '../../../entities/quiz'
import cn from 'clsx'

type QuizCreationProps = {
    className?: string
    guideId: string
}

export function QuizCreation(props: QuizCreationProps): ReactNode {
    const { className, guideId } = props

    const { data, loading } = useQuery(GET_QUIZ_QUERY, {
        variables: { guideId: guideId }
    })
    const quizId = data?.res?.quiz?.id

    // "quizData" includes the invisible questions
    const [quizData, setQuizData] = useState<QuestionInput[] | null>(null)

    const [visibleQuestions, setVisibleQuestions] = useState(3)

    const { update: updateQuiz } = useUpdateQuiz()
    const { publish: publishGuide, loading: publishGuideLoading } =
        usePublishGuide()

    const navigate = useNavigate()

    const remainingQuestions = quizData ? quizData.length - visibleQuestions : 0

    useEffect(() => {
        if (data?.res?.quiz?.body?.quiz?.questions) {
            setQuizData(data.res.quiz.body.quiz.questions as QuestionInput[])
        }
    }, [data])

    // Save the local state "quizData" on the server when it is updated
    useEffect(() => {
        const timeOutId = setTimeout(async () => {
            await updateQuizOnServer()
        }, 500)
        return (): void => clearTimeout(timeOutId)
    }, [quizData])

    const updateQuizOnServer = useCallback(async () => {
        if (!quizId || !quizData) return

        const payload = {
            id: quizId,
            body: {
                quiz: {
                    questions: quizData.map(question => ({
                        questionTitle: question.questionTitle,
                        options: question.options,
                        correctAnswerIndex: question.correctAnswerIndex
                    }))
                }
            }
        }
        const result = await updateQuiz(payload)
        if (!result) return
    }, [quizId, quizData, updateQuiz])

    const handleChangeQuestionTitle = (
        questionIndex: number,
        newTitle: string
    ): void => {
        // Update the "quizData" in the local state
        setQuizData(prevQuizData => {
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            newQuizData[questionIndex].questionTitle = newTitle

            return newQuizData
        })
    }

    const handleSelectAnswer = (
        questionIndex: number,
        answerIndex: number
    ): void => {
        setQuizData(prevQuizData => {
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            newQuizData[questionIndex].correctAnswerIndex = answerIndex

            return newQuizData
        })
    }

    const handleAddQuestion = (): void => {
        // This function reveals the next invisible question on the screen.
        // No need to update the "quizData" in the local state because "quizData" already includes the invisible questions.
        // No need to update the quiz data on the server because the quiz data on the server already includes the invisible questions.
        if (!quizData) return

        const nextQuestionIndex = visibleQuestions
        if (nextQuestionIndex < quizData.length) {
            setVisibleQuestions(
                prevVisibleQuestions => prevVisibleQuestions + 1
            )
        }
    }

    const handleChangeOptionValue = (
        questionIndex: number,
        optionIndex: number,
        value: string
    ): void => {
        setQuizData(prevQuizData => {
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            newQuizData[questionIndex].options[optionIndex] = value

            return newQuizData
        })
    }

    const handleAddOption = (questionIndex: number): void => {
        setQuizData(prevQuizData => {
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            const options = newQuizData[questionIndex].options
            newQuizData[questionIndex].options = [...options, '']

            return newQuizData
        })
    }

    const handleDeleteOption = (
        questionIndex: number,
        optionIndex: number
    ): void => {
        setQuizData(prevQuizData => {
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            const options = newQuizData[questionIndex].options

            if (options.length > 2) {
                newQuizData[questionIndex].options = options.filter(
                    (_, idx) => idx !== optionIndex
                )
            }

            return newQuizData
        })
    }

    const handlePublish = async (): Promise<void> => {
        // Only make the isPublished field of the guide "true". No need to save any other guide data.
        const guideInput = {
            id: guideId,
            published: true
        }
        publishGuide(guideInput)

        // Remove the data about invisible questions from the server
        if (!quizData || !quizId) return

        const visibleQuizData = quizData.slice(0, visibleQuestions)

        const quizInput = {
            id: quizId,
            body: {
                quiz: {
                    questions: visibleQuizData.map(question => ({
                        questionTitle: question.questionTitle,
                        options: question.options,
                        correctAnswerIndex: question.correctAnswerIndex
                    }))
                }
            },
            published: true
        }

        const result = await updateQuiz(quizInput)

        if (!result) return
        navigate(`/${guideId}`)
    }

    return (
        <div
            className={cn(
                'flex flex-col gap-1 max-w-3xl mx-auto px-6',
                className
            )}
        >
            <h1 className="text-center text-5xl font-bold">Generated Quiz</h1>

            <div className="grow">
                {loading && <p>Loading quiz...</p>}
                {publishGuideLoading && <p>Publishing guide...</p>}

                {quizData && (
                    <div className="flex flex-col gap-4">
                        {quizData
                            .slice(0, visibleQuestions)
                            .map((question, questionIndex) => (
                                <QuestionCreation
                                    key={questionIndex}
                                    questionInput={question}
                                    index={questionIndex}
                                    onChangeQuestionTitle={newTitle =>
                                        handleChangeQuestionTitle(
                                            questionIndex,
                                            newTitle
                                        )
                                    }
                                    onChangeOptionValue={(optionIndex, value) =>
                                        handleChangeOptionValue(
                                            questionIndex,
                                            optionIndex,
                                            value
                                        )
                                    }
                                    onAddOption={() =>
                                        handleAddOption(questionIndex)
                                    }
                                    onDeleteOption={optionIndex =>
                                        handleDeleteOption(
                                            questionIndex,
                                            optionIndex
                                        )
                                    }
                                    onSelectAnswer={answerIndex =>
                                        handleSelectAnswer(
                                            questionIndex,
                                            answerIndex
                                        )
                                    }
                                />
                            ))}

                        {remainingQuestions > 0 && (
                            <>
                                <p className="text-gray-500 mt-4">
                                    You can add up to {remainingQuestions} more
                                    question
                                    {remainingQuestions > 1 ? 's' : ''}.
                                </p>
                                <Button onClick={handleAddQuestion}>
                                    Add question
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
            <Button onClick={handlePublish}>Publish guide</Button>
        </div>
    )
}
