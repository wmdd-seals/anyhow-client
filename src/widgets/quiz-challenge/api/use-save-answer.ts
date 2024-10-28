import { useMutation } from '@apollo/client'
import { SAVE_QUIZ_ANSWER } from '../index'
import type {
    SaveQuizAnswersInput,
    SaveQuizAnswerMutation
} from '@gqlgen/graphql'
import type { Maybe } from '@shared/types'

interface UseSaveAnswer {
    save(payload: SaveQuizAnswersInput): void
    data: Maybe<SaveQuizAnswerMutation['res']>
}

export function useSaveAnswer(): UseSaveAnswer {
    const [mutation, { data }] = useMutation<
        SaveQuizAnswerMutation,
        { input: SaveQuizAnswersInput }
    >(SAVE_QUIZ_ANSWER)

    return {
        save: (payload): void => {
            void mutation({ variables: { input: payload } })
        },
        data: data?.res
    }
}
