import { gql } from '@apollo/client'

export const SAVE_FAVORITE_TOPICS = gql`
    mutation saveFavoriteTopics($input: UserProfile) {
        res: updateUserProfile(input: $input) {
            id
        }
    }
`
