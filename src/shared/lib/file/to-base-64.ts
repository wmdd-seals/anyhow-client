export function toBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (): void => resolve(reader.result as string)
        reader.onerror = reject
    })
}
