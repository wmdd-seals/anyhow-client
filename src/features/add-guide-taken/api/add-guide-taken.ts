import { graphql } from '@gqlgen'

export const ADD_GUIDE_TAKEN_MUTATION = graphql(`
    mutation AddGuideTaken($input: GuideTakenCreationInput!) {
        addGuideTaken(input: $input) {
            id
        }
    }
`)
