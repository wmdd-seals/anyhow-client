import { Button, type ButtonKind } from '@shared/ui'
import type { ReactNode } from 'react'
import { useCreateGuide } from '../api/use-create-guide'
import { useNavigate } from 'react-router-dom'

const DEFAULT_TEMPLATE = `## Getting started

Introducing your guide


## Quick tips

Share short, actionable advice


## Final thoughts

Wrapping up the content`

type CreateGuideButtonProps = {
    className?: string
    kind?: ButtonKind
    children?: ReactNode
}

export function CreateGuideButton({
    className,
    kind,
    children = 'Create Guide'
}: CreateGuideButtonProps): ReactNode {
    const { create } = useCreateGuide()
    const navigate = useNavigate()

    return (
        <Button
            className={className}
            kind={kind}
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
            {children}
        </Button>
    )
}
