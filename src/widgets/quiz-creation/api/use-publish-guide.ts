import { useMutation } from '@apollo/client'
import { PUBLISH_GUIDE_MUTATION } from './publish-guide'
import type { PublishGuideMutation, UpdateGuideInput } from '@gqlgen/graphql'
import type { Maybe } from '@shared/types'

interface UsePublishGuide {
    publish(payload: UpdateGuideInput): void
    data: Maybe<PublishGuideMutation['res']>
    loading: boolean
}

export function usePublishGuide(): UsePublishGuide {
    const [mutation, { data, loading }] = useMutation(PUBLISH_GUIDE_MUTATION)

    return {
        data: data?.res,
        loading,
        publish: (payload): void => {
            void mutation({ variables: { input: payload } })
        }
    }
}
