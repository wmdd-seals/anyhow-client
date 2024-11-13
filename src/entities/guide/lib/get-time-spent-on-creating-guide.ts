export function getTimeSpentOnCreatingGuide(progress: number): number {
    // reference: https://www.quora.com/How-long-on-average-does-it-take-you-to-write-an-article
    const MAX_HOURS_FOR_CREATING_GUIDE = 5
    return Number((progress / 100).toFixed(2)) * MAX_HOURS_FOR_CREATING_GUIDE
}
