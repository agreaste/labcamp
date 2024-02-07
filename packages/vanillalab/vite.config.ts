export default {
    transforms: [
        {
            test: ({ path }) => path.endsWith('.html'),
            transform({ code }) {
                return `export default ${JSON.stringify(code)}`
            }
        }
    ]
}