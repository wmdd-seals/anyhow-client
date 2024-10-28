import { graphql } from '@gqlgen'

export const SAVE_QUIZ_ANSWER = graphql(`
    mutation SaveQuizAnswer($input: SaveQuizAnswersInput) {
        res: saveQuizAnswers(input: $input) {
            id
            answers
        }
    }
`)
