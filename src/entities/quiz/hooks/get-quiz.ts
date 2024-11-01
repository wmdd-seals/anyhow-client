import { graphql } from '@gqlgen'

export const GET_QUIZ_QUERY = graphql(`
    query GetQuiz($guideId: ID!) {
        res: guide(id: $guideId) {
            quiz {
                id
                body {
                    quiz {
                        questions {
                            questionTitle
                            options
                            correctAnswerIndex
                        }
                    }
                }
            }
        }
    }
`)
