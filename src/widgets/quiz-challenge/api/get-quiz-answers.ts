import { graphql } from '@gqlgen'

export const GET_QUIZ_ANSWERS = graphql(`
    query GetQuizAnswers($quizId: String) {
        res: quizAnswers(quizId: $quizId) {
            answers
        }
    }
`)
