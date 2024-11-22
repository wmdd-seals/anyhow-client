import { useMutation } from '@apollo/client'
import { SAVE_QUIZ_ANSWERS } from './save-quiz-answers'
import type {
    SaveQuizAnswersMutation,
    SaveQuizAnswersInput
} from '@gqlgen/graphql'
import type { Maybe } from '@shared/types'
import type { InputMaybe } from '@gqlgen/graphql'
import type { MutationFunctionOptions } from '@apollo/client'

interface UseSaveQuizAnswer {
    save(
        payload: InputMaybe<SaveQuizAnswersInput>,
        options?: MutationFunctionOptions<
            SaveQuizAnswersMutation,
            { input: InputMaybe<SaveQuizAnswersInput> }
        >
    ): Promise<Maybe<string>>
    data: Maybe<SaveQuizAnswersMutation['res']>
}

export function useSaveQuizAnswer(): UseSaveQuizAnswer {
    const [mutation, { data }] = useMutation<
        SaveQuizAnswersMutation,
        { input: InputMaybe<SaveQuizAnswersInput> }
    >(SAVE_QUIZ_ANSWERS)

    return {
        save: async (
            payload: InputMaybe<SaveQuizAnswersInput>,
            options?: MutationFunctionOptions<
                SaveQuizAnswersMutation,
                { input: InputMaybe<SaveQuizAnswersInput> }
            >
        ): Promise<Maybe<string>> => {
            const res = await mutation({
                variables: { input: payload },
                ...options // Spread options like refetchQueries
            })

            return res.data?.res.id
        },
        data: data?.res
    }
}
