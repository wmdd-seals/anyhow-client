import { graphql } from '@gqlgen'

// Generate a quiz by AI
export const GENERATE_QUIZ_MUTATION = graphql(`
    mutation GenerateQuiz($input: GenerateQuizInput!) {
        res: generateQuiz(input: $input) {
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
`)
