import { toBase64 } from './to-base-64'

describe('toBase64 shared helper', () => {
    it('converts blob to base64', async () => {
        const file = new File([], 'test-file')

        const base64 = await toBase64(file)

        expect(base64).toBeTypeOf('string')
        expect(base64).toMatch(/^data:.+base64.*/)
    })
})
