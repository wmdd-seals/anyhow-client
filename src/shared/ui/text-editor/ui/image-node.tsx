/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    DecoratorNode,
    type EditorConfig,
    type LexicalEditor,
    type NodeKey,
    type SerializedLexicalNode,
    type Spread
} from 'lexical'

const IMAGE_NODE_TYPE = 'image'

export type ImageAlignment = 'left' | 'center' | 'right'

export type ImageParams = {
    src: string
    altText: string
}

export type SerializedImageNode = Spread<
    {
        type: 'image'
        version: 1
    } & ImageParams,
    SerializedLexicalNode
>

export class ImageNode extends DecoratorNode<JSX.Element> {
    private readonly imageParams: ImageParams

    public constructor(imageParams: ImageParams, key?: NodeKey) {
        super(key)
        this.imageParams = imageParams
    }

    public static override importJSON(
        serializedNode: SerializedImageNode
    ): ImageNode {
        console.log('import', serializedNode)
        return $createImageNode(serializedNode)
    }

    public override exportJSON(): SerializedImageNode {
        return {
            ...this.imageParams,
            type: IMAGE_NODE_TYPE,
            version: 1
        }
    }

    public static override getType = (): typeof IMAGE_NODE_TYPE =>
        IMAGE_NODE_TYPE

    public static override clone = (node: ImageNode): ImageNode =>
        new ImageNode(node.imageParams, node.__key)

    public override createDOM(
        _config: EditorConfig,
        _editor: LexicalEditor
    ): HTMLElement {
        const span = document.createElement('span')
        span.classList.add('block')
        return span
    }

    public override updateDOM = (): false => false

    public override decorate(
        _editor: LexicalEditor,
        _config: EditorConfig
    ): JSX.Element {
        const { src, altText } = this.imageParams

        return <img src={src} alt={altText} />
    }
}

export function $createImageNode(imageParams: ImageParams): ImageNode {
    return new ImageNode(imageParams)
}
