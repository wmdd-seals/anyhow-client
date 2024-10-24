import { useMutation } from '@apollo/client'
import { CREATE_GUIDE_MUTATION } from './create-guide'
import type { CreateGuideMutation, GuideCreationInput } from '@gqlgen/graphql'
import type { Maybe } from '@shared/types'

interface UseCreateGuide {
    create(payload: GuideCreationInput): Promise<Maybe<string>>
    data: Maybe<CreateGuideMutation['res']>
    loading: boolean
}

export function useCreateGuide(): UseCreateGuide {
    const [mutation, { data, loading }] = useMutation(CREATE_GUIDE_MUTATION)

    return {
        data: data?.res,
        loading,
        create: async (payload): Promise<Maybe<string>> => {
            const res = await mutation({ variables: { input: payload } })

            return res.data?.res.id
        }
    }
}
