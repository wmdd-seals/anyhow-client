import { graphql } from '@gqlgen'

export const UPLOAD_GUIDE_IMAGE = graphql(`
    mutation UploadGuideImage($input: FileInfo!) {
        res: uploadImage(input: $input) {
            id
        }
    }
`)
