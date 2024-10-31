export function getGuideProgress(body: string): number {
    return Math.min(
        ((body.replaceAll('\n', '').length * 0.95) / (1500 * 6)) * 100,
        100
    )
}
