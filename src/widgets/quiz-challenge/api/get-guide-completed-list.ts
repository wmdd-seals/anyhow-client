import { graphql } from '@gqlgen'

export const GET_GUIDE_COMPLETED_LIST = graphql(`
    query GetGuideCompletedList {
        res: guideCompletedList {
            guideId
        }
    }
`)
