export const adjustDateRange = (
    from: number,
    to: number,
    daysDiff: number
): [number, number] => {
    const newFrom = new Date(from)
    const newTo = new Date(to)
    newFrom.setDate(newFrom.getDate() + daysDiff)
    newTo.setDate(newTo.getDate() + daysDiff)
    return [newFrom.getTime(), newTo.getTime()]
}
