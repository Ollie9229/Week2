import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    //資料
    data() {
        return {
            //api相關
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'ollie',

            //存放資料
            products: [],

            //暫存展開產品資料
            tempProduct: {},
        }
    },
    //方法
    methods: {
        //檢查權限
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    //成功就取得資料
                    this.getData();
                })
                .catch((err) => {
                    //失敗就回到登入頁
                    alert(err.response.data.message)
                    window.location = 'index.html';
                })
        },
        //取得資料
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
                .then((res) => {
                    //把資料庫的產品存到 data 的空陣列中
                    this.products = res.data.products;
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        },
        //展開產品資料
        openProduct(item) {
            //把 v-for 取得的 item 帶入 data 真的空物件
            this.tempProduct = item;
        }
    },
    
    //檢查權限
    mounted() {
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        //檢查權限
        this.checkAdmin();

    },
}).mount('#app');