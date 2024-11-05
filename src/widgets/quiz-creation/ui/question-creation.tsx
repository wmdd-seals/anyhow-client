import { type ReactNode, useState, useEffect } from 'react'
import { Button, TextInput } from '@shared/ui'
import type { QuestionInput, InputMaybe } from '@gqlgen/graphql'
import { Trash } from 'react-feather'

type QuestionCreationProps = {
    questionInput: QuestionInput
    index: number
    onChangeQuestionTitle: (newTitle: string) => void
    onChangeOptionValue: (optionIndex: number, value: string) => void
    onAddOption: () => void
    onDeleteOption: (optionIndex: number) => void
    onSelectAnswer: (answerIndex: number) => void
}

export const QuestionCreation = ({
    questionInput,
    index,
    onChangeQuestionTitle,
    onChangeOptionValue,
    onAddOption,
    onDeleteOption,
    onSelectAnswer
}: QuestionCreationProps): ReactNode => {
    const [questionTitle, setQuestionTitle] = useState<string>(
        questionInput.questionTitle
    )
    const [options, setOptions] = useState<InputMaybe<string>[]>(
        questionInput.options
    )
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(
        questionInput.correctAnswerIndex
    )

    useEffect((): void => {
        setQuestionTitle(questionInput.questionTitle)
        setOptions(questionInput.options)
        setSelectedAnswerIndex(questionInput.correctAnswerIndex)
    }, [questionInput])

    return (
        <div className="py-4">
            {/* QuestionTitle Input */}
            <div className="py-3">
                <h2 className="text-xl font-bold py-2">Question {index + 1}</h2>
                <div>
                    <TextInput
                        type="text"
                        value={questionTitle}
                        onChange={e => onChangeQuestionTitle(e.target.value)}
                    />
                </div>
            </div>

            {/* Options Input */}
            <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-4">
                {options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                        <label className="block pb-1 font-medium">Option</label>
                        <div className="flex gap-3 items-center">
                            <input
                                type="radio"
                                name={`answer-${index}`}
                                checked={selectedAnswerIndex === optionIndex}
                                onChange={() => onSelectAnswer(optionIndex)}
                            />
                            <div className="grow">
                                <TextInput
                                    type="text"
                                    value={option as string}
                                    onChange={e =>
                                        onChangeOptionValue(
                                            optionIndex,
                                            e.target.value
                                        )
                                    }
                                ></TextInput>
                            </div>
                            <button
                                onClick={() => onDeleteOption(optionIndex)}
                                disabled={options.length <= 2}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    </div>
                ))}

                <Button onClick={onAddOption} disabled={options.length >= 4}>
                    Add option
                </Button>
                <p className="text-black text-md">
                    You can have options of between 2 and 4.
                </p>
            </div>
        </div>
    )
}
