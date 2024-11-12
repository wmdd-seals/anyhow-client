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
                'ah-font-primary': '#1D1544',
                'ah-bg-purple': '#1D1544',
                any: {
                    green: {
                        50: '#F2FBF2',
                        100: '#E8F8E8',
                        200: '#CEF0CD',
                        300: '#B0E9AF',
                        400: '#8CE18B',
                        500: '#5AD859',
                        600: '#32D430',
                        700: '#27A725',
                        800: '#259D23',
                        900: '#1E801D',
                        950: '#155A14'
                    },
                    purple: {
                        50: '#F2F2F3',
                        100: '#E7E7E9',
                        200: '#CCCCD0',
                        300: '#ADADB4',
                        400: '#878692',
                        500: '#1E1647',
                        600: '#1D1544',
                        700: '#1A133D',
                        800: '#161034',
                        900: '#120D2B',
                        950: '#0D091E'
                    },
                    gray: {
                        50: '#F3F3F3',
                        100: '#E9E9E9',
                        200: '#D0D1D2',
                        300: '#B4B5B7',
                        400: '#939597',
                        500: '#4A4F54',
                        600: '#474B50',
                        700: '#3F4348',
                        800: '#373A3E',
                        900: '#2D3033',
                        950: '#202224'
                    }
                }
            },
            clipPath: {
                'top-right': 'polygon(0 0, 90% 0, 100% 100%, 0 100%)',
                'top-left': 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
                'bottom-left': 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
                'bottom-right': 'polygon(0 0, 100% 0, 100% 90%, 0 100%)'
            }
        }
    },
    plugins: []
} satisfies Config
