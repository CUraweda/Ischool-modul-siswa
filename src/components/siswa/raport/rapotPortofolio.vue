<template>
    <div style="height: 100%;" >
        <iframe height="100%" width="100%" :src="pdfUrl"></iframe>
    </div>
</template>

<script>
import pdfFile from '../../../assets/contoh.pdf';
export default {
    data() {
        return {
            pdfUrl: pdfFile // ganti dengan path ke file PDF Anda
        };
    },
};
</script>

