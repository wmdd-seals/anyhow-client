import { Button } from '@shared/ui'

interface ModalProps {
    Correctness: string[]
    questions: {
        questionTitle: string
        options: string[]
        correctAnswerIndex: number
    }[]
    selectedOptions: number[]
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const QuizScoreModal: React.FC<ModalProps> = ({
    Correctness,
    questions,
    setShowModal,
    selectedOptions
}) => {
    const correctAnswers = Correctness.filter(
        result => result === 'Correct'
    ).length
    const totalQuestions = questions.length
    const score = (correctAnswers / totalQuestions) * 100

    const getFeedbackMessage = (): string => {
        if (score === 100) return 'Your learning capacity is impressive!'
        if (score >= 50) return 'Almost there, never give up!'
        return 'Never give up!'
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg flex flex-col gap-3">
                <h1 className="text-2xl font-bold">Test your learning</h1>
                <ul className="flex flex-col gap-4">
                    {questions.map((question, index) => (
                        <li key={index}>
                            <h2 className="text-lg font-semibold">
                                Question {index + 1}: {question.questionTitle}
                            </h2>
                            <p>
                                Your Answer:{' '}
                                {question.options[selectedOptions[index]]}{' '}
                                {Correctness[index] === 'Correct'
                                    ? ' ✔️'
                                    : ' ❌'}
                            </p>

                            {Correctness[index] === 'Incorrect' && (
                                <p className="text-red-500">
                                    Correct Answer:{' '}
                                    {
                                        question.options[
                                            question.correctAnswerIndex
                                        ]
                                    }
                                </p>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="bg-slate-200 rounded-lg flex gap-3 justify-center items-center py-3 border border-slate-400 text-xl font-bold">
                    <h2>
                        Score: {correctAnswers}/{totalQuestions}
                    </h2>
                    <p>{getFeedbackMessage()}</p>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button onClick={() => setShowModal(false)}>
                        Try again
                    </Button>
                    <Button>Mark as completed</Button>
                </div>
            </div>
        </div>
    )
}
