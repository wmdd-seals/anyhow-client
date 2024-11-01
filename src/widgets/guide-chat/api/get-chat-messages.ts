import { graphql } from '@gqlgen'

export const GET_CHAT_MESSAGES = graphql(`
    query ChatMessages($guideId: String!) {
        res: chathistory(guideId: $guideId) {
            content
            role
        }
    }
`)
