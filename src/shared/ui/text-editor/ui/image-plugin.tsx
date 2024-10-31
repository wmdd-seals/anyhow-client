import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, type ReactNode } from 'react'
import { $createImageNode, ImageNode, type ImageParams } from './image-node'
import {
    $createParagraphNode,
    $insertNodes,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_EDITOR,
    createCommand,
    type LexicalCommand
} from 'lexical'
import { $wrapNodeInElement } from '@lexical/utils'

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImageParams> = createCommand(
    'INSERT_IMAGE_COMMAND'
)

export function ImagePlugin(): ReactNode {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        if (!editor.hasNodes([ImageNode])) {
            throw new Error('ImagesPlugin: ImageNode not registered on editor')
        }

        return editor.registerCommand<ImageParams>(
            INSERT_IMAGE_COMMAND,
            payload => {
                const imageNode = $createImageNode(payload)
                $insertNodes([imageNode])

                if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                    $wrapNodeInElement(
                        imageNode,
                        $createParagraphNode
                    ).selectEnd()
                }

                return true
            },
            COMMAND_PRIORITY_EDITOR
        )
    }, [editor])

    return null
}
