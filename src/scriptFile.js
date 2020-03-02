var reg = new Vue({
    el: '#app-file',
    data: {
        errorsValidation: [],
        errorsAxios: false,

        file: '',

        responseApi: [],
        responseApiTable: false,

    },

    methods: {
        submitFile:
            function (err) {
                this.errorsValidation = [];

                console.log(this.file.name);
                if (this.validFile(this.file.name)) {
                    console.log(111);

                    let formData = new FormData();

                    formData.append('file', this.file);

                    axios
                        .post('http://localhost:8080/upload',
                            formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                        .then(response => {
                            console.log(response)
                            this.errorsAxios = false;
                            this.responseApiTable = true;
                            this.responseApi = response.data;
                        })
                        .catch(error => {
                            this.errorsAxios = true;
                            this.errorsValidation.push(error);
                        });
                } else {
                    console.log(222);
                }

                if (!this.file) {
                    this.errorsValidation.push('Файл не выбран');
                }



                err.preventDefault();
            },

        handleFileUpload:
            function () {
                this.file = this.$refs.file.files[0];
            },

        validFile:
            function (file) {

                if (this.file) {
                    extension = file.split('.')

                    if (extension.length === 2 && extension[1] === 'csv') {
                        return true;
                    } else {
                        this.errorsValidation.push('Надо совать csv');
                    }
                }
            }
    }

})