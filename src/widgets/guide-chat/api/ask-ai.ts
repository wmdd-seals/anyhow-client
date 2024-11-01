import { graphql } from '@gqlgen'

export const ASK_AI_MUTATION = graphql(`
    mutation GuideChat($input: GuideChatRequest) {
        res: guideChat(input: $input) {
            content
            role
        }
    }
`)
