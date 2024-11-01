import { graphql } from '@gqlgen'

export const STORE_GUIDE_COMPLETED = graphql(`
    mutation StoreGuideCompleted($input: StoreGuideCompletedInput!) {
        storeGuideCompleted(input: $input) {
            id
            guideId
            userId
            createdAt
        }
    }
`)
