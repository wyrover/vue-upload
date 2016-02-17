<script>

    var Split = require('split.js');

    export default {
        data: function() {
            return {
                code: 'var foo = "bar";'
            }
        },
        props: ['elements','direction'],
        ready: function(){
            Split(['#one', '#two'], {
                sizes: [50, 50],
                minSize: 200
            });
        },
        methods: {
            init: function(){}
        }
    }
</script>

<style scoped>
    .gutter {
        background-color: #eee;
        background-repeat: no-repeat;
        background-position: 50%;
    }
    .gutter.gutter-horizontal {
        background-image: url('grips/vertical.png');
        cursor: ew-resize;
    }
    .gutter.gutter-vertical {
        background-image: url('grips/horizontal.png');
        cursor: ns-resize;
    }
</style>
