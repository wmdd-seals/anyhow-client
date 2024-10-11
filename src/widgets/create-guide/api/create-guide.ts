import { graphql } from '@gqlgen'

export const CREATE_GUIDE_MUTATION = graphql(`
    mutation CreateGuide($input: GuideCreationInput!) {
        res: createGuide(input: $input) {
            id
            title
            description
            body
        }
    }
`)
