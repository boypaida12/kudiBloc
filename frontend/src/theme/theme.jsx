import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: `'Nunito Variable', sans-serif;`,
        body: `'Nunito Variable', sans-serif;`,
    },
    styles: {
        global: {
            'body' :{
                bg: 'gray.100'
            }
        }
    }
})

export default theme;