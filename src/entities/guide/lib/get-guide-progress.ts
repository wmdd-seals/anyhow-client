export function getGuideProgress(body: string): number {
    return Math.min((body.length / (1500 * 6)) * 100, 100)
}
