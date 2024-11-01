import { Button } from '@shared/ui'
import type { ReactNode } from 'react'
import { useCreateGuide } from '../api/use-create-guide'
import { useNavigate } from 'react-router-dom'

const DEFAULT_TEMPLATE = `## Getting started

Introducing your guide


## Quick tips

Share short, actionable advice


## Final thoughts

Wrapping up the content`

export function CreateGuideButton(): ReactNode {
    const { create } = useCreateGuide()
    const navigate = useNavigate()

    return (
        <Button
            onClick={async (): Promise<void> => {
                const id = await create({
                    body: DEFAULT_TEMPLATE,
                    title: 'Sample guide',
                    tags: [],
                    description: ''
                })

                if (!id) return

                navigate(`/${id}/edit`)
            }}
        >
            Create Guide
        </Button>
    )
}
