import { graphql } from '@gqlgen'

export const SAVE_QUIZ_ANSWERS = graphql(`
    mutation SaveQuizAnswers($input: SaveQuizAnswersInput) {
        res: saveQuizAnswers(input: $input) {
            id
            answers
        }
    }
`)
