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
    $convertFromMarkdownString
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

type TextEditorProps = EditableTextEditorProps | ReadonlyTextEditorProps

type EditableTextEditorProps = {
    editable: true
    initialValue?: string
    onChange: (state: string) => void
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
                // root: 'grid gap-y-3',
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
                LinkNode
            ],
            editable,
            editorState(): void {
                if (editable) {
                    const { initialValue } = props

                    if (initialValue !== undefined) {
                        $convertFromMarkdownString(initialValue)
                    }
                } else {
                    const { value } = props

                    $convertFromMarkdownString(value)
                    return
                }
            }
        }
    }, [])

    return (
        <LexicalComposer initialConfig={config}>
            <div
                className={cn('flex flex-col ', {
                    'border-2 border-gray-300 rounded-lg focus-within:border-blue-700':
                        editable
                })}
            >
                {editable && (
                    <ToolbarPlugin
                        className="border-b border-gray-300"
                        setIsLinkEditMode={console.log}
                    />
                )}
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="focus:border-none focus:outline-none min-h-96" />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <LinkPlugin />
                <ListPlugin />
                {/* <ImagePlugin /> */}

                {editable && (
                    <>
                        <HistoryPlugin />
                        <OnChangePlugin
                            onChange={(_, editor): void => {
                                editor.read(() => {
                                    const state = $convertToMarkdownString()
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
