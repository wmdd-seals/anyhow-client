import { graphql } from '@gqlgen'

export const PUBLISH_QUIZ_MUTATION = graphql(`
    mutation PublishQuiz($input: UpdateQuizInput!) {
        res: updateQuiz(input: $input) {
            id
        }
    }
`)
