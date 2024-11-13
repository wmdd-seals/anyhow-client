export async function copyToClipboard(text: string): Promise<string | false> {
    try {
        await navigator.clipboard.writeText(text)
    } catch {
        return false
    }

    return text
}
