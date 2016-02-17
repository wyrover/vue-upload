export default {

    created() {
        // stub
    },
    methods: {
        setPageHash(hash) {
            window.location.hash = hash
        },
        slugify(value) {
            return value.toLowerCase()
                .replace(/[^\w ]+/g,'')
                .replace(/ +/g,'-');
        }
    }
}
