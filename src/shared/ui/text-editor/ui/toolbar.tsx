import { $createCodeNode, $isCodeNode } from '@lexical/code'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
    $isListNode,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    ListNode
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
    $createHeadingNode,
    $createQuoteNode,
    $isHeadingNode,
    type HeadingTagType
} from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import {
    $findMatchingParent,
    $getNearestNodeOfType,
    $isEditorIsNestedEditor,
    mergeRegister
} from '@lexical/utils'
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_CRITICAL,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    type LexicalEditor,
    SELECTION_CHANGE_COMMAND
} from 'lexical'
import { type Dispatch, useCallback, useEffect, useState } from 'react'
import { $isAtNodeEnd } from '@lexical/selection'
import { ElementNode, type RangeSelection, TextNode } from 'lexical'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Icon } from '@shared/ui'
import cn from 'clsx'
import { INSERT_IMAGE_COMMAND } from './image-plugin'

function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
    const anchor = selection.anchor
    const focus = selection.focus
    const anchorNode = selection.anchor.getNode()
    const focusNode = selection.focus.getNode()
    if (anchorNode === focusNode) {
        return anchorNode
    }
    const isBackward = selection.isBackward()
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode
    } else {
        return $isAtNodeEnd(anchor) ? anchorNode : focusNode
    }
}

const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote'
}

// const ELEMENT_FORMAT_OPTIONS: {
//     [key in Exclude<ElementFormatType, ''>]: {
//         icon: string
//         name: string
//     }
// } = {
//     center: {
//         icon: 'center-align',
//         name: 'Center Align'
//     },
//     end: {
//         icon: 'right-align',
//         name: 'End Align'
//     },
//     justify: {
//         icon: 'justify-align',
//         name: 'Justify Align'
//     },
//     left: {
//         icon: 'left-align',
//         name: 'Left Align'
//     },
//     right: {
//         icon: 'right-align',
//         name: 'Right Align'
//     },
//     start: {
//         icon: 'left-align',
//         name: 'Start Align'
//     }
// }

function BlockFormatDropDown({
    editor,
    blockType
}: {
    blockType: keyof typeof blockTypeToBlockName
    editor: LexicalEditor
}): JSX.Element {
    const formatParagraph = (): void => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode())
            }
        })
    }

    const formatHeading = (headingSize: HeadingTagType): void => {
        if (blockType !== headingSize) {
            editor.update(() => {
                const selection = $getSelection()
                $setBlocksType(selection, () => $createHeadingNode(headingSize))
            })
        }
    }

    const formatBulletList = (): void => {
        if (blockType !== 'bullet') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        } else {
            formatParagraph()
        }
    }

    const formatNumberedList = (): void => {
        if (blockType !== 'number') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        } else {
            formatParagraph()
        }
    }

    const formatQuote = (): void => {
        if (blockType !== 'quote') {
            editor.update(() => {
                const selection = $getSelection()
                $setBlocksType(selection, () => $createQuoteNode())
            })
        }
    }

    const formatCode = (): void => {
        if (blockType !== 'code') {
            editor.update(() => {
                let selection = $getSelection()

                if (selection !== null) {
                    if (selection.isCollapsed()) {
                        $setBlocksType(selection, () => $createCodeNode())
                    } else {
                        const textContent = selection.getTextContent()
                        const codeNode = $createCodeNode()
                        selection.insertNodes([codeNode])
                        selection = $getSelection()
                        if ($isRangeSelection(selection)) {
                            selection.insertRawText(textContent)
                        }
                    }
                }
            })
        }
    }

    const isParagraph = blockType === 'paragraph'
    const isH1 = blockType === 'h1'
    const isH2 = blockType === 'h2'
    const isH3 = blockType === 'h3'
    const isBulletList = blockType === 'bullet'
    const isNumberList = blockType === 'number'
    const isQuote = blockType === 'quote'
    const isCode = blockType === 'code'

    return (
        <Menu>
            <MenuButton>Style</MenuButton>

            <MenuItems
                as="menu"
                anchor="bottom start"
                className={'bg-white border border-gray-300 rounded-xl p-1'}
            >
                <MenuItem
                    as={'li'}
                    className={isParagraph ? 'text-red-700' : 'text-gray-700'}
                    onClick={formatParagraph}
                >
                    Paragraph
                </MenuItem>
                <MenuItem
                    as={'li'}
                    className={isH1 ? 'text-red-700' : 'text-gray-700'}
                    onClick={() => formatHeading('h1')}
                >
                    Heading 1
                </MenuItem>
                <MenuItem
                    as={'li'}
                    className={isH2 ? 'text-red-700' : 'text-gray-700'}
                    onClick={() => formatHeading('h2')}
                >
                    Heading 2
                </MenuItem>
                <MenuItem
                    as={'li'}
                    className={isH3 ? 'text-red-700' : 'text-gray-700'}
                    onClick={() => formatHeading('h3')}
                >
                    Heading 3
                </MenuItem>
                <MenuItem
                    as={'li'}
                    className={isBulletList ? 'text-red-700' : 'text-gray-700'}
                    onClick={formatBulletList}
                >
                    Bullet List
                </MenuItem>
                <MenuItem
                    as={'li'}
                    className={isNumberList ? 'text-red-700' : 'text-gray-700'}
                    onClick={formatNumberedList}
                >
                    Numbered List
                </MenuItem>
                <MenuItem
                    as={'li'}
                    className={isQuote ? 'text-red-700' : 'text-gray-700'}
                    onClick={formatQuote}
                >
                    Quote
                </MenuItem>
                <MenuItem
                    as={'li'}
                    className={isCode ? 'text-red-700' : 'text-gray-700'}
                    onClick={formatCode}
                >
                    Code Block
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}

export function ToolbarPlugin(props: {
    setIsLinkEditMode: Dispatch<boolean>
    className?: string
}): JSX.Element {
    const { className, setIsLinkEditMode } = props

    const [editor] = useLexicalComposerContext()
    const [activeEditor, setActiveEditor] = useState(editor)
    const [blockType, setBlockType] =
        useState<keyof typeof blockTypeToBlockName>('paragraph')
    // const [elementFormat, setElementFormat] =
    //     useState<ElementFormatType>('left')
    const [isLink, setIsLink] = useState(false)
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)
    const [isCode, setIsCode] = useState(false)
    const [isEditable, setIsEditable] = useState(() => editor.isEditable())
    const [isImageCaption, setIsImageCaption] = useState(false)

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            if (
                activeEditor !== editor &&
                $isEditorIsNestedEditor(activeEditor)
            ) {
                const rootElement = activeEditor.getRootElement()
                setIsImageCaption(
                    !!rootElement?.parentElement?.classList.contains(
                        'image-caption-container'
                    )
                )
            } else {
                setIsImageCaption(false)
            }

            const anchorNode = selection.anchor.getNode()
            let element =
                anchorNode.getKey() === 'root'
                    ? anchorNode
                    : $findMatchingParent(anchorNode, e => {
                          const parent = e.getParent()
                          return parent !== null && $isRootOrShadowRoot(parent)
                      })

            if (element === null) {
                element = anchorNode.getTopLevelElementOrThrow()
            }

            const elementKey = element.getKey()
            const elementDOM = activeEditor.getElementByKey(elementKey)

            // Update links
            const node = getSelectedNode(selection)
            const parent = node.getParent()
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true)
            } else {
                setIsLink(false)
            }

            if (elementDOM !== null) {
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType<ListNode>(
                        anchorNode,
                        ListNode
                    )
                    const type = parentList
                        ? parentList.getListType()
                        : element.getListType()
                    setBlockType(type)
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType()

                    if (type in blockTypeToBlockName) {
                        setBlockType(type as keyof typeof blockTypeToBlockName)
                    }

                    if ($isCodeNode(element)) {
                        return
                    }
                }
            }
            // Handle buttons
            // let matchingParent
            // if ($isLinkNode(parent)) {
            // If node is a link, we need to fetch the parent paragraph node to set format
            // matchingParent = $findMatchingParent(
            //     node,
            //     parentNode =>
            //         $isElementNode(parentNode) && !parentNode.isInline()
            // )
            // }

            // If matchingParent is a valid node, pass it's format type
            // setElementFormat(
            //     $isElementNode(matchingParent)
            //         ? matchingParent.getFormatType()
            //         : $isElementNode(node)
            //           ? node.getFormatType()
            //           : parent?.getFormatType() || 'left'
            // )
        }

        if (
            $isRangeSelection(selection) /* || $isTableSelection(selection) */
        ) {
            // Update text format
            setIsBold(selection.hasFormat('bold'))
            setIsItalic(selection.hasFormat('italic'))
            setIsUnderline(selection.hasFormat('underline'))
            setIsCode(selection.hasFormat('code'))
        }
    }, [activeEditor, editor])

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (_payload, newEditor) => {
                setActiveEditor(newEditor)
                $updateToolbar()
                return false
            },
            COMMAND_PRIORITY_CRITICAL
        )
    }, [editor, $updateToolbar])

    useEffect(() => {
        activeEditor.getEditorState().read(() => {
            $updateToolbar()
        })
    }, [activeEditor, $updateToolbar])

    useEffect(() => {
        return mergeRegister(
            editor.registerEditableListener(editable => {
                setIsEditable(editable)
            }),
            activeEditor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    $updateToolbar()
                })
            })
        )
    }, [$updateToolbar, activeEditor, editor])

    const insertLink = useCallback(() => {
        if (!isLink) {
            setIsLinkEditMode(true)
            activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
        } else {
            setIsLinkEditMode(false)
            activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
        }
    }, [activeEditor, isLink, setIsLinkEditMode])

    const selectImage = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.multiple = false

        input.addEventListener('change', async () => {
            const image = input.files?.[0]
            if (!image) return

            console.log(image)
            const src = URL.createObjectURL(image)
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                src,
                altText: 'Guide Image'
            })
        })

        input.click()
    }, [])

    const canViewerSeeInsertCodeButton = !isImageCaption
    // const formatOption = ELEMENT_FORMAT_OPTIONS[elementFormat || 'left']

    return (
        <div className={cn('flex items-center justify-between', className)}>
            {/* {blockType in blockTypeToBlockName && activeEditor === editor && ( */}
            {/*     <> */}
            <BlockFormatDropDown blockType={blockType} editor={activeEditor} />
            {/*     </> */}
            {/* )} */}
            <div className="flex items-center gap-1">
                <button
                    disabled={!isEditable}
                    onClick={() => {
                        activeEditor.dispatchCommand(
                            FORMAT_TEXT_COMMAND,
                            'bold'
                        )
                    }}
                    className={isBold ? 'text-red-700' : 'text-gray-700'}
                    title={'Bold'}
                    type="button"
                >
                    <Icon.Bold />
                </button>
                <button
                    disabled={!isEditable}
                    onClick={() => {
                        activeEditor.dispatchCommand(
                            FORMAT_TEXT_COMMAND,
                            'italic'
                        )
                    }}
                    className={isItalic ? 'text-red-700' : 'text-gray-700'}
                    title={'Italic'}
                    type="button"
                >
                    <Icon.Italic />
                </button>
                <button
                    disabled={!isEditable}
                    onClick={() => {
                        activeEditor.dispatchCommand(
                            FORMAT_TEXT_COMMAND,
                            'underline'
                        )
                    }}
                    className={isUnderline ? 'text-red-700' : 'text-gray-700'}
                    title={'Underline'}
                    type="button"
                >
                    <Icon.Underline />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
                    }}
                >
                    <Icon.AlignLeft />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
                    }}
                >
                    <Icon.AlignRight />
                </button>
                <button
                    onClick={() => {
                        editor.dispatchCommand(
                            FORMAT_ELEMENT_COMMAND,
                            'justify'
                        )
                    }}
                >
                    <Icon.AlignJustify />
                </button>
                <button onClick={selectImage}>
                    <Icon.Image />
                </button>
                {canViewerSeeInsertCodeButton && (
                    <button
                        disabled={!isEditable}
                        onClick={() => {
                            activeEditor.dispatchCommand(
                                FORMAT_TEXT_COMMAND,
                                'code'
                            )
                        }}
                        className={
                            'toolbar-item spaced ' + (isCode ? 'active' : '')
                        }
                        title="Insert code block"
                        type="button"
                        aria-label="Insert code block"
                    >
                        <i className="format code" />
                    </button>
                )}
                <button
                    disabled={!isEditable}
                    onClick={insertLink}
                    className={
                        'toolbar-item spaced ' + (isLink ? 'active' : '')
                    }
                    aria-label="Insert link"
                    title="Insert link"
                    type="button"
                >
                    <i className="format link" />
                </button>
            </div>
        </div>
    )
}
