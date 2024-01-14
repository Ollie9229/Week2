import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    //資料
    data(){
        return {
            user:{
                username:'',
                password:'',
            },
        }
    },
    //方法
    methods:{
        //登入功能
        login(){
            const api = 'https://ec-course-api.hexschool.io/v2/admin/signin'
            //post 欄位資料
            axios.post(api, this.user)
            .then((res)=>{
                //解構賦值
                // console.log(res)
                const { token, expired } = res.data;
                //取得cookie
                document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;

                //成功跳轉頁面
                window.location = 'products.html';
            })
            .catch((err)=>{
                //報錯
                console.dir(err);
            });
        },
    },
}).mount('#app');