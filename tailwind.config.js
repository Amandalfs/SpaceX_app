/** @type {import('tailwindcss').Config} */
export default {
darkMode: ["class"],
content: [
"./index.html",
'./src/**/*.{ts,tsx,js,jsx}',
],
theme: {
extend: {
	fontFamily: {
        sans: ['Poppins', 'sans-serif'],
    },
	colors: {
		black: '#000000',
		orange: {
			'50': '#CF6900',
			'100': '#F57C00'
		},
		blue: '#1267FC',
		white: '#f4f5ff',
		gray: {
			'50': '#D9D9D9',
			'100': '#6C757D',
			'150': '#343A40'
		},
		success: {
			'50': '#1FD636',
			'100': '#3F943E'
		},
		failure: {
			'50': '#8B2A2D',
			'100': '#8D0606'
		},
		backgroundPrimary: {
			DEFAULT: '#ede9fe',
		},
		backgroundSecondary: {	
			DEFAULT: '#ddd6fe',
		},
		primary: {
			DEFAULT: '#4c1d95',
		},
		background: 'hsl(var(--background))',
		foreground: 'hsl(var(--foreground))',
		card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		},
		popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		},
		primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		},
		secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		},
		muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		},
		accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		},
		destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		},
		border: 'hsl(var(--border))',
		input: 'hsl(var(--input))',
		ring: 'hsl(var(--ring))',
		chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))'
		}
	},
	borderRadius: {
		lg: 'var(--radius)',
		md: 'calc(var(--radius) - 2px)',
		sm: 'calc(var(--radius) - 4px)'
	}
}
},
plugins: [require("tailwindcss-animate")],
}

