import { graphql } from '@gqlgen'

export const UPDATE_GUIDE_MUTATION = graphql(`
    mutation UpdateGuide($input: UpdateGuideInput!) {
        res: updateGuide(input: $input) {
            id
        }
    }
`)
