import { graphql } from '@gqlgen'

export const GET_QUIZ_ID_QUERY = graphql(`
    query GetQuizId($guideId: ID!) {
        res: guide(id: $guideId) {
            quiz {
                id
            }
        }
    }
`)
