import { useMutation } from '@apollo/client'
import { SAVE_FAVORITE_TOPICS } from './save-favorite-topics'
import type { SaveFavoriteTopicsMutation, UserProfile } from '@gqlgen/graphql'
import type { Maybe } from '@shared/types'
import type { InputMaybe } from '@gqlgen/graphql'

interface UseSaveFavoriteTopics {
    save(payload: InputMaybe<UserProfile>): Promise<void>
    data: Maybe<SaveFavoriteTopicsMutation['res']>
    loading: boolean
}

export function useSaveFavoriteTopics(): UseSaveFavoriteTopics {
    const [mutation, { data, loading }] = useMutation<
        SaveFavoriteTopicsMutation,
        { input: InputMaybe<UserProfile> }
    >(SAVE_FAVORITE_TOPICS)

    return {
        save: async (payload): Promise<void> => {
            await mutation({ variables: { input: payload } })
        },
        data: data?.res,
        loading
    }
}
