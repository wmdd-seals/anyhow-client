import { graphql } from '@gqlgen'

export const UPLOAD_GUIDE_COVER = graphql(`
    mutation UploadGuideCover($input: FileInfo!) {
        res: uploadCoverImage(input: $input) {
            id
        }
    }
`)
