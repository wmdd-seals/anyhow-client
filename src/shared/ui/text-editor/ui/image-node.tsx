/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    DecoratorNode,
    type DOMConversionMap,
    type DOMConversionOutput,
    type DOMExportOutput,
    type EditorConfig,
    type LexicalEditor,
    type LexicalNode,
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

    public getAltText(): string {
        return this.imageParams.altText
    }

    public getSrc(): string {
        return this.imageParams.src
    }

    public static override importJSON(
        serializedNode: SerializedImageNode
    ): ImageNode {
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

        return <img src={src} alt={altText} className="rounded-xl mt-16 mb-6" />
    }

    public exportDOM(): DOMExportOutput {
        const element = document.createElement('img')
        element.setAttribute('src', this.imageParams.src)
        element.setAttribute('alt', this.imageParams.altText)
        return { element }
    }

    public static importDOM(): DOMConversionMap | null {
        return {
            img: (_node: Node) => ({
                conversion: $convertImageElement,
                priority: 0
            })
        }
    }
}

export function $createImageNode(imageParams: ImageParams): ImageNode {
    return new ImageNode(imageParams)
}

function $convertImageElement(domNode: Node): null | DOMConversionOutput {
    const img = domNode as HTMLImageElement

    const { alt: altText, src } = img
    const node = $createImageNode({ altText, src })
    return { node }
}

export function $isImageNode(
    node: LexicalNode | null | undefined
): node is ImageNode {
    return node instanceof ImageNode
}
