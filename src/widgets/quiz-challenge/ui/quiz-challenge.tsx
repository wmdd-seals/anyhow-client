import { useState, useEffect, type ReactNode } from 'react'
import { useQuery } from '@apollo/client'
import type { QuestionInput } from '@gqlgen/graphql'
import { QuizScoreModal } from './quiz-score-modal'
import { Button } from '@shared/ui'
import { GET_QUIZ_ANSWERS } from '@widgets/quiz-challenge'
import { useSaveQuizAnswer } from '@widgets/quiz-challenge'

interface QuizChallengeProp {
    quizId: string
    quizLoading: boolean
    quizData: QuestionInput[]
}

export function QuizChallenge(props: QuizChallengeProp): ReactNode {
    const { quizId, quizLoading, quizData } = props
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
        options: question.options.filter(Boolean) as string[],
        correctAnswerIndex: question.correctAnswerIndex
    }))

    return (
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
                                                    value={selectedOptionIndex}
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

            <Button onClick={checkCorrectness} disabled={!allQuestionsAnswered}>
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
    )
}
