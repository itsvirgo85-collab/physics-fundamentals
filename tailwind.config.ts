import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#10233f', blue:'#2463eb', cyan:'#20b8d5' } } }, plugins: [] } satisfies Config;
