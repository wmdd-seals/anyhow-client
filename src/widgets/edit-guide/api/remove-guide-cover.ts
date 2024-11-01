import { graphql } from '@gqlgen'

export const REMOVE_GUIDE_COVER = graphql(`
    mutation RemoveGuideCover($id: String!) {
        res: removeImage(id: $id)
    }
`)
