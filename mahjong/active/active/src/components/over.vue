<template>
    <div class="start">
        <div class="mdownload">
            <div class="download-bg">
                <img src="../assets/img/download.png" alt="" class="mdownload-content"/>
                <a :href="url">
                    <img src="../assets/img/download-btn.png" alt="" class="mdownload-btn" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                url:'',
            }
        },
    }
</script>

