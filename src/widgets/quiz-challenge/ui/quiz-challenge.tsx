import { useState, type ReactNode } from 'react'
import type { QuestionInput } from '@gqlgen/graphql'
import { QuizScoreModal } from './quiz-score-modal'
import { Button } from '@shared/ui'

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

    const checkCorrectness = (): void => {
        const updatedCorrectness = quizData.map((question, questionIndex) =>
            selectedOptions[questionIndex] === question.correctAnswerIndex
                ? 'Correct'
                : 'Incorrect'
        )
        setCorrectness(updatedCorrectness)
        setShowModal(true)
    }

    const handleOptionChange = (
        questionIndex: number,
        selectedOptionIndex: number
    ): void => {
        const updatedSelectedOptions = [...selectedOptions]
        updatedSelectedOptions[questionIndex] = selectedOptionIndex
        setSelectedOptions(updatedSelectedOptions)
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
