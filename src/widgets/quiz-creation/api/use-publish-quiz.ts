import { useMutation } from '@apollo/client'
import { PUBLISH_QUIZ_MUTATION } from './publish-quiz'
import type { PublishQuizMutation, UpdateQuizInput } from '@gqlgen/graphql'
import type { Maybe } from '@shared/types'

interface UsePublishQuiz {
    publish(payload: UpdateQuizInput): void
    data: Maybe<PublishQuizMutation['res']>
    loading: boolean
}

export function usePublishQuiz(): UsePublishQuiz {
    const [mutation, { data, loading }] = useMutation(PUBLISH_QUIZ_MUTATION)

    return {
        data: data?.res,
        loading,
        publish: (payload): void => {
            void mutation({ variables: { input: payload } })
        }
    }
}
