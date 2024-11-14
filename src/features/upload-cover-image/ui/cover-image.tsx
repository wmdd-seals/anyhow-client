import { Button } from '@shared/ui'
import { type ReactNode, useRef, useState, useCallback } from 'react'
import { Edit } from 'react-feather'
import { UPLOAD_GUIDE_COVER } from '../api/upload-guide-cover'
import { REMOVE_GUIDE_COVER } from '../api/remove-guide-cover'
import { useMutation } from '@apollo/client'
import { toBase64 } from '@shared/lib/file'

type CoverImageProp = {
    id: string
}

export function CoverImage(props: CoverImageProp): ReactNode {
    const { id } = props
    const [hasCoverImage, setHasCoverImage] = useState(true)
    const coverImageRef = useRef<HTMLImageElement>(null)

    const [uploadCoverMutation] = useMutation(UPLOAD_GUIDE_COVER)
    const [removeCoverMutation] = useMutation(REMOVE_GUIDE_COVER, {
        variables: { id }
    })

    const selectCoverAndUpload = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.multiple = false

        input.addEventListener('change', async () => {
            const cover = input.files?.[0]
            if (!cover) return

            await uploadCoverMutation({
                variables: {
                    input: {
                        name: cover.name,
                        guideId: id,
                        mimeType: cover.type,
                        base64Data: await toBase64(cover)
                    }
                }
            })

            coverImageRef.current!.src = getGuideImageUrl(id)
            setHasCoverImage(true)
        })

        input.click()
    }, [])

    const removeCover = useCallback(() => {
        void removeCoverMutation()

        coverImageRef.current!.src = `/guide-cover-thumbnail.jpg`
        setHasCoverImage(false)
    }, [])
    return (
        <div className="relative">
            <img
                ref={coverImageRef}
                src={getGuideImageUrl(id)}
                onError={(e): void => {
                    // if not loaded for any reason, use thumbnail
                    e.currentTarget.src = `/guide-cover-thumbnail.jpg`
                    setHasCoverImage(false)
                }}
                alt="Guide Cover Thumbnail"
                className="max-w-[1300px] w-full max-sm:h-[480px] max-h-[520px] object-cover object-center mx-auto rounded-3xl"
            />

            <div className="absolute left-1/2 -translate-x-1/2 bottom-14 flex items-center gap-2">
                <Button kind="inverse" onClick={selectCoverAndUpload}>
                    Add Cover Image <Edit className="size-4" />
                </Button>
                {hasCoverImage && <Button onClick={removeCover}>Delete</Button>}
            </div>
        </div>
    )
}

function getGuideImageUrl(id: string): string {
    return (
        import.meta.env.VITE_API_URL +
        import.meta.env.VITE_IMAGES_ENDPOINT +
        `/${id}`
    )
}
