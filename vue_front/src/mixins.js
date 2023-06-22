export default {
    methods: {
        $base64(file) {
            return new Promise(resolve=> {
                var a = new FileReader();
                a.onload = e => resolve(e.target.result);
                a.readAsDataURL(file);
            });
        },
    }
}