import { type ReactNode, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QuestionCreation } from './question-creation'
import { Button } from '@shared/ui'
import { useUpdateQuiz, usePublishGuide } from '../index'
import type { QuestionInput } from '@gqlgen/graphql'
import { GET_QUIZ_QUERY } from '../../../entities/quiz'
import cn from 'clsx'

const timerIds: (number | null)[] = []

let lastlyChangedQuestionIndex: number | null = null

const debounceQuestionUpdate = (
    func: (questionIndex: number) => Promise<void>,
    questionIndex: number
): void => {
    if (timerIds[questionIndex]) clearTimeout(timerIds[questionIndex])

    timerIds[questionIndex] = window.setTimeout(async () => {
        if (lastlyChangedQuestionIndex !== questionIndex) return

        await func(questionIndex)
        lastlyChangedQuestionIndex = null
    }, 1000)
}

type QuizCreationProps = {
    className?: string
    guideId: string
}

export function QuizCreation(props: QuizCreationProps): ReactNode {
    const { className, guideId } = props

    const { data, loading } = useQuery(GET_QUIZ_QUERY, {
        variables: { guideId: guideId }
    })
    const quizId = data?.res.quiz?.id

    // "quizData" includes the invisible questions
    const [quizData, setQuizData] = useState<QuestionInput[] | null>(null)

    const [visibleQuestions, setVisibleQuestions] = useState(3)

    const { update: updateQuiz } = useUpdateQuiz()
    const { publish: publishGuide, loading: publishGuideLoading } =
        usePublishGuide()

    const navigate = useNavigate()

    useEffect(() => {
        if (data?.res.quiz?.body?.quiz?.questions) {
            setQuizData(data.res.quiz.body.quiz.questions as QuestionInput[])
        }
    }, [data])

    const remainingQuestions = quizData ? quizData.length - visibleQuestions : 0

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

    const handleChangeQuizData = async (
        questionIndex: number
    ): Promise<void> => {
        // If the change is for a different question, update immediately and reset the index
        if (lastlyChangedQuestionIndex !== questionIndex) {
            await updateQuizOnServer()
            lastlyChangedQuestionIndex = questionIndex
        }

        // Use debounce to delay the server update, setting lastlyChangedQuestionIndex after it executes
        debounceQuestionUpdate(async () => {
            await updateQuizOnServer()
            lastlyChangedQuestionIndex = questionIndex
        }, questionIndex)
    }

    const handleChangeQuestionTitle = async (
        questionIndex: number,
        newTitle: string
    ): Promise<void> => {
        // Update the "quizData" in the local state
        setQuizData(prevQuizData => {
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            newQuizData[questionIndex].questionTitle = newTitle

            return newQuizData
        })

        // Update the quiz data on the server
        await handleChangeQuizData(questionIndex)
    }

    const handleSelectAnswer = async (
        questionIndex: number,
        answerIndex: number
    ): Promise<void> => {
        // Update the "quizData" in the local state
        setQuizData(prevQuizData => {
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            newQuizData[questionIndex].correctAnswerIndex = answerIndex

            return newQuizData
        })

        // Update the quiz data on the server
        await handleChangeQuizData(questionIndex)
    }

    const handleAddQuestion = (): void => {
        // This function reveals the next invisible question on the screen.
        // No need to update the "quizData" in the local state because "quizData" already includes the invisible questions).
        // No need to update the quiz data on the server because the quiz data on the server already includes the invisible questions.
        if (!quizData) return

        const nextQuestionIndex = visibleQuestions
        if (nextQuestionIndex < quizData.length) {
            setVisibleQuestions(
                prevVisibleQuestions => prevVisibleQuestions + 1
            )
        }
    }

    const handleChangeOptionValue = async (
        questionIndex: number,
        optionIndex: number,
        value: string
    ): Promise<void> => {
        setQuizData(prevQuizData => {
            // Update the "quizData" in the local state
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            newQuizData[questionIndex].options[optionIndex] = value

            return newQuizData
        })

        // Update the quiz data on the server
        await handleChangeQuizData(questionIndex)
    }

    const handleAddOption = async (questionIndex: number): Promise<void> => {
        setQuizData(prevQuizData => {
            // Update the "quizData" in the local state
            if (!prevQuizData) return null

            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            const options = newQuizData[questionIndex].options
            newQuizData[questionIndex].options = [...options, '']

            return newQuizData
        })

        // Update the quiz data on the server
        await handleChangeQuizData(questionIndex)
    }

    const handleDeleteOption = async (
        questionIndex: number,
        optionIndex: number
    ): Promise<void> => {
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

        await handleChangeQuizData(questionIndex)
    }

    const handlePublish = async (): Promise<void> => {
        // Only make the isPublished field of the guide "true". No need to save any other guide data.
        const guideInput = {
            id: guideId,
            published: true
        }
        publishGuide(guideInput)

        // Update the quiz data on the server (remove the invisible questions by saving the only quiz data of visible questions)
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
