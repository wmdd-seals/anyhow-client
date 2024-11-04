import type { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                satoshi: ['Satoshi', 'sans-serif']
            },
            colors: {
                'ah-green-primary': '#5AD859',
                'ah-font-primary': '#1D1544'
            }
        }
    },
    plugins: []
} satisfies Config
