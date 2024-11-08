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

type TextEditorProps = EditableTextEditorProps | ReadonlyTextEditorProps

type EditableTextEditorProps = {
    editable: true
    blockEditing?: boolean
    initialValue?: string
    onChange: (state: string) => void
    onImageUpload(image: File): Promise<string>
}

type ReadonlyTextEditorProps = {
    editable: false
    value: string
}

export function TextEditor(props: TextEditorProps): ReactNode {
    const { editable } = props

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
                className={cn('flex flex-col ', {
                    'border border-any-purple-400 rounded-lg focus-within:border-green-500':
                        editable
                })}
            >
                {editable && (
                    <ToolbarPlugin
                        blockEditing={props.blockEditing}
                        className="border-b border-any-purple-400 p-3"
                        onImageUpload={props.onImageUpload}
                    />
                )}
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="p-4 focus:border-none focus:outline-none min-h-96" />
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
