import { useMutation } from '@apollo/client'
import { GENERATE_QUIZ_MUTATION } from './generate-quiz'
import type { GenerateQuizMutation, GenerateQuizInput } from '@gqlgen/graphql'
import type { Maybe } from '@shared/types'

interface UseGenerateQuiz {
    generate(payload: GenerateQuizInput): Promise<boolean>
    data: Maybe<GenerateQuizMutation['res']>
    loading: boolean
}

export function useGenerateQuiz(): UseGenerateQuiz {
    const [mutation, { data, loading }] = useMutation(GENERATE_QUIZ_MUTATION)

    return {
        data: data?.res,
        loading,
        generate: async (payload): Promise<boolean> => {
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
