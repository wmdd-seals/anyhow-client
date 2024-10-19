import { describe, expect, it } from 'vitest'
import { adjustDateRange } from './adjust-date-range'

describe('adjustDateRange', () => {
    it('should adjust the date range correctly', () => {
        const from = new Date('2022-01-01').getTime()
        const to = new Date('2022-01-31').getTime()
        const daysDiff = 7
        const result = adjustDateRange(from, to, daysDiff)
        expect(result.from).toBe(new Date('2022-01-08').getTime())
        expect(result.to).toBe(new Date('2022-02-07').getTime())
    })

    it('should handle negative daysDiff correctly', () => {
        const from = new Date('2022-01-01').getTime()
        const to = new Date('2022-01-31').getTime()
        const daysDiff = -7
        const result = adjustDateRange(from, to, daysDiff)
        expect(result.from).toBe(new Date('2021-12-25').getTime())
        expect(result.to).toBe(new Date('2022-01-24').getTime())
    })

    it('should handle zero daysDiff correctly', () => {
        const from = new Date('2022-01-01').getTime()
        const to = new Date('2022-01-31').getTime()
        const daysDiff = 0
        const result = adjustDateRange(from, to, daysDiff)
        expect(result.from).toBe(from)
        expect(result.to).toBe(to)
    })
})
