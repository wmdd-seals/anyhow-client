import { useMutation } from '@apollo/client'
import { UPDATE_QUIZ_MUTATION } from './update-quiz'
import type { Maybe } from '@shared/types'
import type { UpdateQuizInput, UpdateQuizMutation } from '@gqlgen/graphql'

interface UseUpdateQuiz {
    data: Maybe<UpdateQuizMutation['res']>
    loading: boolean
    update(payload: UpdateQuizInput): Promise<boolean>
}

export function useUpdateQuiz(): UseUpdateQuiz {
    const [mutation, { data, loading }] = useMutation(UPDATE_QUIZ_MUTATION)

    return {
        data: data?.res,
        loading,
        update: async (payload): Promise<boolean> => {
            try {
                const res = await mutation({ variables: { input: payload } })
                return !!res.data?.res.id
            } catch (e) {
                console.error(e)
                return false
            }
        }
    }
}
