import { graphql } from '@gqlgen'

export const PUBLISH_GUIDE_MUTATION = graphql(`
    mutation PublishGuide($input: UpdateGuideInput!) {
        res: updateGuide(input: $input) {
            id
        }
    }
`)
