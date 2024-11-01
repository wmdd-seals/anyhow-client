import { useState, useEffect, type ReactNode } from 'react'
import { useQuery } from '@apollo/client'
import { QuizScoreModal } from './quiz-score-modal'
import { Button } from '@shared/ui'
import { GET_QUIZ_ANSWERS } from '@widgets/quiz-challenge/api/get-quiz-answers'
import { useSaveQuizAnswer } from '@widgets/quiz-challenge/api/use-save-answers'
import { GET_QUIZ_QUERY } from '../../../entities/quiz'

interface QuizChallengeProp {
    guideId: string
    quizId: string
}

export function QuizChallenge(props: QuizChallengeProp): ReactNode {
    const { guideId, quizId } = props

    const { data: quizInfo, loading: quizLoading } = useQuery(GET_QUIZ_QUERY, {
        variables: {
            guideId: guideId
        },
        skip: !guideId
    })

    const quizData =
        quizInfo?.res?.quiz?.body?.quiz?.questions
            ?.filter(question => question?.options)
            .map(question => ({
                questionTitle: question!.questionTitle,
                options: question!.options.filter(
                    (option): option is string => option !== null
                ),
                correctAnswerIndex: question!.correctAnswerIndex
            })) || []

    const [correctness, setCorrectness] = useState<string[]>([])
    const [selectedOptions, setSelectedOptions] = useState<number[]>(
        Array(quizData.length).fill(-1)
    )
    const [showModal, setShowModal] = useState(false)

    // Display the saved answers after the page refresh
    const { data: quizAnswerData } = useQuery<{ res: { answers: number[] }[] }>(
        GET_QUIZ_ANSWERS,
        {
            variables: { quizId }
        }
    )
    useEffect(() => {
        if (quizAnswerData?.res[0]?.answers) {
            const savedAnswers = quizAnswerData.res[0].answers
            setSelectedOptions(savedAnswers)
        }
    }, [quizAnswerData])

    const { save: saveQuizAnswer } = useSaveQuizAnswer()

    const checkCorrectness = (): void => {
        const updatedCorrectness = quizData.map((question, questionIndex) =>
            selectedOptions[questionIndex] === question.correctAnswerIndex
                ? 'Correct'
                : 'Incorrect'
        )
        setCorrectness(updatedCorrectness)
        setShowModal(true)
    }

    const handleOptionChange = async (
        questionIndex: number,
        selectedOptionIndex: number
    ): Promise<void> => {
        const updatedSelectedOptions = [...selectedOptions]
        updatedSelectedOptions[questionIndex] = selectedOptionIndex
        setSelectedOptions(updatedSelectedOptions)

        await saveQuizAnswer({
            quizid: quizId,
            answers: updatedSelectedOptions
        })
    }

    const allQuestionsAnswered = selectedOptions.every(option => option !== -1)

    const formattedQuizData = quizData.map(question => ({
        questionTitle: question.questionTitle,
        options: question.options.filter(Boolean),
        correctAnswerIndex: question.correctAnswerIndex
    }))

    return (
        <>
            {quizId && (
                <div className="p-4 flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">Test your learning</h1>
                    <ul className="flex flex-col gap-5">
                        {quizLoading && <h1 className="text-lg">Loading...</h1>}

                        {!quizLoading &&
                            formattedQuizData.map((question, questionIndex) => (
                                <li key={questionIndex}>
                                    <h2 className="text-xl font-bold">
                                        Question {questionIndex + 1}:{' '}
                                        {question.questionTitle}
                                    </h2>

                                    <ul>
                                        {question.options.map(
                                            (option, selectedOptionIndex) => (
                                                <li key={selectedOptionIndex}>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            name={`question-${questionIndex}`}
                                                            value={
                                                                selectedOptionIndex
                                                            }
                                                            onChange={() =>
                                                                handleOptionChange(
                                                                    questionIndex,
                                                                    selectedOptionIndex
                                                                )
                                                            }
                                                            checked={
                                                                selectedOptions[
                                                                    questionIndex
                                                                ] ===
                                                                selectedOptionIndex
                                                            }
                                                            className="form-radio text-slate-800"
                                                        />
                                                        {option}
                                                    </label>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                            ))}
                    </ul>

                    <Button
                        onClick={checkCorrectness}
                        disabled={!allQuestionsAnswered}
                    >
                        Complete
                    </Button>

                    {showModal && (
                        <QuizScoreModal
                            Correctness={correctness}
                            questions={formattedQuizData}
                            setShowModal={setShowModal}
                            selectedOptions={selectedOptions}
                        />
                    )}
                </div>
            )}
        </>
    )
}
