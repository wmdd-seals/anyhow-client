import { useState, useEffect, type ReactNode } from 'react'

export function QuizChallenge(): ReactNode {
    // Will replace the following quiz later with a query to fetch the quiz data once the server is ready
    const quiz = {
        id: '1',
        title: 'favorite color',
        desctiption: 'This is a quiz to determine your favorite color.',
        body: [
            {
                question: 'The question text goes here',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                answer: 0,
                input: 1
            },
            {
                question: 'The question text goes here',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                answer: 2,
                input: 1
            },
            {
                question: 'The question text goes here',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                answer: 2,
                input: 1
            }
        ]
    }

    const [loading, setLoading] = useState(true)
    const [Correctness, setCorrectness] = useState<string[]>([])

    // Will delete the following useEffect once the server is ready
    useEffect(() => {
        const id = setTimeout(setLoading, 2000, false)

        return (): void => clearTimeout(id)
    }, [])

    const checkCorrectness = (
        questionIndex: number,
        selectedOptionIndex: number
    ): void => {
        setCorrectness(prevCorrectness => {
            const updatedCorrectness = [...prevCorrectness]
            updatedCorrectness[questionIndex] =
                selectedOptionIndex === quiz.body[questionIndex].answer
                    ? 'Correct'
                    : 'Incorrect'
            return updatedCorrectness
        })
    }

    return (
        <div>
            <h1>Quiz</h1>
            <ul className="flex flex-col gap-5">
                {loading && <h1>Loading...</h1>}

                {!loading &&
                    quiz.body.map((question, questionIndex) => {
                        return (
                            <li key={questionIndex}>
                                <h2>{question.question}</h2>
                                <ul>
                                    {question.options.map(
                                        (option, selectedOptionIndex) => {
                                            return (
                                                <li key={selectedOptionIndex}>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name={`question-${questionIndex}`}
                                                            value={
                                                                selectedOptionIndex
                                                            }
                                                            onChange={() =>
                                                                checkCorrectness(
                                                                    questionIndex,
                                                                    selectedOptionIndex
                                                                )
                                                            }
                                                        />
                                                        {option}
                                                    </label>
                                                </li>
                                            )
                                        }
                                    )}
                                </ul>

                                {Correctness[questionIndex] && (
                                    <p>{Correctness[questionIndex]}</p>
                                )}
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
