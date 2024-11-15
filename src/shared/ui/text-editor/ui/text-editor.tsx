import {
    LexicalComposer,
    type InitialConfigType
} from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import {
    $convertToMarkdownString,
    $convertFromMarkdownString,
    TRANSFORMERS
} from '@lexical/markdown'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { OverflowNode } from '@lexical/overflow'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { ToolbarPlugin } from './toolbar'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import cn from 'clsx'
import { ImageNode } from './image-node'
import { IMAGE_TRANSFORMER, ImagePlugin } from './image-plugin'

const MARKDOWN_TRANSFORMERS = [IMAGE_TRANSFORMER, ...TRANSFORMERS]

type TextEditorProps = { className?: string } & (
    | EditableTextEditorProps
    | ReadonlyTextEditorProps
)

type EditableTextEditorProps = {
    editable: true
    initialValue?: string
    maxLength?: number
    onChange: (state: string) => void
    onImageUpload(image: File): Promise<string>
}

type ReadonlyTextEditorProps = {
    editable: false
    value: string
}

export function TextEditor(props: TextEditorProps): ReactNode {
    const { editable, className } = props

    const config: InitialConfigType = useMemo(() => {
        return {
            namespace: `guide-${editable}`,
            onError: console.error,
            theme: {
                root: 'flex flex-col gap-2',
                text: {
                    bold: 'bold',
                    italic: 'italic',
                    underline: 'underline'
                },
                quote: `pl-5 border-l-1 border-gray-300`,
                paragraph: 'text-14',
                list: {
                    ul: 'pl-5 list-disc',
                    ol: 'pl-5 list-decimal',
                    listitem: ''
                },
                link: 'text-blue-700 underline font-size-inherit',
                heading: {
                    h1: 'font-bold text-3xl',
                    h2: 'font-bold text-2xl',
                    h3: 'font-bold text-xl'
                    //   h4: '',
                    //   h5: '',
                    //   h6: ''
                }
            },
            nodes: [
                HeadingNode,
                QuoteNode,
                ListNode,
                ListItemNode,
                AutoLinkNode,
                LinkNode,
                OverflowNode,
                ImageNode
            ],
            editable,
            editorState(): void {
                if (editable) {
                    const { initialValue } = props

                    if (initialValue !== undefined) {
                        $convertFromMarkdownString(
                            initialValue,
                            MARKDOWN_TRANSFORMERS
                        )
                    }
                } else {
                    const { value } = props

                    $convertFromMarkdownString(value, MARKDOWN_TRANSFORMERS)
                    return
                }
            }
        }
    }, [])

    return (
        <LexicalComposer initialConfig={config}>
            <div
                className={cn(
                    'flex flex-col ',
                    {
                        'border border-any-purple-400 rounded-lg focus-within:border-green-500':
                            editable
                    },
                    className
                )}
            >
                {editable && (
                    <>
                        <ToolbarPlugin
                            className="border-b border-any-purple-400 p-3"
                            onImageUpload={props.onImageUpload}
                        />
                        {props.maxLength && (
                            <MaxLengthPlugin maxLength={props.maxLength} />
                        )}
                    </>
                )}
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className={cn(
                                'p-4 focus:border-none focus:outline-none',
                                editable &&
                                    'min-h-96 max-h-[50rem] overflow-auto'
                            )}
                        />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <LinkPlugin />
                <ListPlugin />
                <ImagePlugin />

                {editable && (
                    <>
                        <HistoryPlugin />
                        <OnChangePlugin
                            onChange={(_, editor): void => {
                                editor.read(() => {
                                    const state = $convertToMarkdownString(
                                        MARKDOWN_TRANSFORMERS
                                    )
                                    props.onChange(state)
                                })
                            }}
                            ignoreSelectionChange
                        />
                    </>
                )}
            </div>
        </LexicalComposer>
    )
}

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $trimTextContentFromAnchor } from '@lexical/selection'
import { $getSelection, $isRangeSelection, RootNode } from 'lexical'
import { useEffect } from 'react'

export function MaxLengthPlugin({ maxLength }: { maxLength: number }): null {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        return editor.registerNodeTransform(RootNode, (rootNode: RootNode) => {
            const selection = $getSelection()
            if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
                return
            }
            const prevTextContent = editor
                .getEditorState()
                .read(() => rootNode.getTextContent())
            const textContent = rootNode.getTextContent()
            if (prevTextContent !== textContent) {
                const textLength = textContent.length
                const delCount = textLength - maxLength
                const anchor = selection.anchor

                if (delCount > 0) {
                    $trimTextContentFromAnchor(editor, anchor, delCount)
                }
            }
        })
    }, [editor, maxLength])

    return null
}
