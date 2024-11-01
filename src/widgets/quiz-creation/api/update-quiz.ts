import { graphql } from '@gqlgen'

export const UPDATE_QUIZ_MUTATION = graphql(`
    mutation UpdateQuiz($input: UpdateQuizInput!) {
        res: updateQuiz(input: $input) {
            id
        }
    }
`)
