import { type ReactNode, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QuestionCreation } from './question-creation'
import { Button } from '../../../shared/ui'
import { useUpdateQuiz, usePublishGuide } from '../index'
import type { QuestionInput } from '@gqlgen/graphql'
import { GET_QUIZ_QUERY } from '../../../entities/quiz'
import cn from 'clsx'

// debounce function to delay the update of the quiz data when the user is continuously typing
// Need to place this function outside of QuizCreation component to prevent it from being redefined on each render (need to keep the "timeoutId" variable for the debounce to work)
const debounce = (
    func: (updatedQuizData: QuestionInput[]) => void,
    delay: number
) => {
    let timeoutId: number | null = null
    return (updatedQuizData: QuestionInput[]): void => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = window.setTimeout(() => {
            func(updatedQuizData)
        }, delay)
    }
}

type QuizCreationProps = {
    className?: string
    guideId: string
}

export function QuizCreation(props: QuizCreationProps): ReactNode {
    const { className, guideId } = props

    const { data, loading } = useQuery(GET_QUIZ_QUERY, {
        variables: { guideId: guideId as string }
    })
    const quizId = data?.res.quiz?.id
    
    const [quizData, setQuizData] = useState<QuestionInput[] | null>(null)
    const [visibleQuestions, setVisibleQuestions] = useState(3)

    const { update: updateQuiz, loading: updateQuizLoading } = useUpdateQuiz()
    const { publish: publishGuide, loading: publishGuideLoading } =
        usePublishGuide()

    const navigate = useNavigate()

    useEffect(() => {
        if (data?.res.quiz?.body?.quiz?.questions) {
            setQuizData(data.res.quiz.body.quiz.questions as QuestionInput[])
        }
    }, [data])

    const remainingQuestions = quizData ? quizData.length - visibleQuestions : 0

const debouncedUpdateQuiz = useCallback(
    debounce(async (updatedQuizData: QuestionInput[]) => {
        if (!quizId) return

        const payload = {
            id: quizId,
            body: {
                quiz: {
                    questions: updatedQuizData.map(question => ({
                        questionTitle: question.questionTitle,
                        options: question.options,
                        correctAnswerIndex: question.correctAnswerIndex
                    }))
                }
            }
        };

        const result = await updateQuiz(payload)
        if (!result) return
    }, 1500),
    [quizId, updateQuiz]
);


    const updateQuizDataOnServer = (updatedQuizData: QuestionInput[]): void => {
        debouncedUpdateQuiz(updatedQuizData)
    }

    const handleChangeQuestionTitle = (
        questionIndex: number,
        newTitle: string
    ): void => {
        setQuizData(prevQuizData => {
            if (!prevQuizData) return null

            // Create a deep copy of the previous quiz data
            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            newQuizData[questionIndex].questionTitle = newTitle
            updateQuizDataOnServer(newQuizData)
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
            updateQuizDataOnServer(newQuizData)
            return newQuizData
        })
    }

    const handleAddQuestion = (): void => {
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

            // Create a deep copy of the quiz data
            const newQuizData = JSON.parse(
                JSON.stringify(prevQuizData)
            ) as QuestionInput[]

            newQuizData[questionIndex].options[optionIndex] = value
            updateQuizDataOnServer(newQuizData)
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
            updateQuizDataOnServer(newQuizData)
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

                updateQuizDataOnServer(newQuizData)
            }

            return newQuizData
        })
    }

    const handlePublish = async (): Promise<void> => {
        if (!quizData || !quizId) return

        const visibleQuizData = quizData.slice(0, visibleQuestions)

        const guideInput = {
            id: guideId!,
            published: true
        }

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

        publishGuide(guideInput)
        const result = await updateQuiz(quizInput)

        if (result) {
            navigate(`/${guideId}`)
        } else {
            console.error('An error occurred during publishing quiz.')
        }
    }

    return (
        <div className={cn('flex flex-col gap-1 max-w-3xl mx-auto px-6', className)}
            >
            <h1 className="text-center text-5xl font-bold">Generated Quiz</h1>

            <div className="grow">
                {loading && <p>Loading quiz...</p>}
                {updateQuizLoading && <p>Updating quiz...</p>}
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
