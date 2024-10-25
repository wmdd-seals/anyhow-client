import type { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                satoshi: ['Satoshi', 'sans-serif']
            }
        }
    },
    plugins: []
} satisfies Config
