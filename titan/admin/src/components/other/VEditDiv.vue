<template>
    <div class="edit-div"
         id="a1"
         v-html="innerText"
         :contenteditable="canEdit"
         @focus="isLocked = true"
         @blur="isLocked = false"
         @input="changeText">
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false
            }
        },
        mounted:function(){

        },
        watch: {
            'value'(){
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
                this.$emit('input', this.$el.innerHTML);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .edit-div {
        width: 100%;
        height: 100%;
        overflow: auto;
        word-break: break-all;
        outline: none;
        user-select: text;
        white-space: pre-wrap;
        text-align: left;
        &[contenteditable=true]{
            user-modify: read-write-plaintext-only;
            &:empty:before {
                content: attr(placeholder);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ccc;
            }
        }
    }
</style>