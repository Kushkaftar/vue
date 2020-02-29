const url = 'http://localhost:8080/api';


const checksRU = [
    { text: 'Russia', geo: 'RU' },
    { text: 'Kazakhstan', geo: 'KZ' },
    { text: 'Belarus', geo: 'BY' },
    { text: 'Ukraine', geo: 'UA' },
    { text: 'Kyrgyzstan', geo: 'KG' },
    { text: 'Georgia', geo: 'GE' },
    { text: 'Azerbaijan', geo: 'AZ' },
    { text: 'Armenia', geo: 'AM' }
];

const checksEU = [
    { text: 'Italy', geo: 'IT' },
    { text: 'Spain', geo: 'ES' },
    { text: 'Germany', geo: 'DE' },
    { text: 'Poland', geo: 'PL' },
    { text: 'Austria', geo: 'AT' },
    { text: 'Bulgaria', geo: 'BG' },
    { text: 'Romania', geo: 'RO' },
    { text: 'Greece', geo: 'GR' },
    { text: 'Hungary', geo: 'HU' }
];

const checksASIA = [
    { text: 'Thailand', geo: 'TH' },
    { text: 'Indonesia', geo: 'ID' },
    { text: 'Viet Nam', geo: 'VN' }
];


var reg = new Vue({
    el: '#app-region',
    data: {

        token: null,
        hash: null,
        quantity_leads: null,
        GEO: null,
        checkedGeo: [],

        responseApiTable: false,
        responseApi: [],

        loadingAxios: true,
        errorsAxios: false,

        errQLValid: null,
        errorsValidation: [],
        checks: [],

        inquiry: {}


    },

    methods: {
        checkForm:
            function (err) {

                this.errorsValidation = [];

                if (this.token && this.hash && this.validQA(this.quantity_leads) && this.checkedGeo.length !== 0) {
                    //const prenumber = this.checks.filter(({ geo }) => reg.checkedGeo.includes(geo));

                    const countrys = this.checkedGeo.map(v => ({ geo: v }));

                    inquiry = {
                        token: this.token,
                        hash: this.hash,
                        quantity_leads: +this.quantity_leads,
                        country: countrys,
                    };

                    axios({
                        method: 'post',
                        url: url,
                        data: inquiry
                    })
                        .then(response => {
                            this.errorsAxios = false;
                            this.responseApiTable = true;
                            this.responseApi = response.data;
                            console.log(this.responseApi);
                        })
                        .catch(error => {
                            this.errorsAxios = true;
                            console.log(error);
                        })
                        .finally(() => (this.loadingAxios = false));

                    return true;
                }


                if (!this.token) {
                    this.errorsValidation.push('Введите TOKEN.');
                }
                if (!this.hash) {
                    this.errorsValidation.push('Введите HASH.');
                }
                if (!this.quantity_leads) {
                    this.errorsValidation.push('Введите quantity leads.');
                }
                if (this.checkedGeo.length === 0) {
                    this.errorsValidation.push('Выберите Geo.');
                }
                err.preventDefault();

            },

        validQA: function (quantity_leads) {
            if (quantity_leads > 0 && quantity_leads < 6) {
                return true;
            } else {
                this.errorsValidation.push('amount 1-5');
            }
        }

    },

    computed: {
        selected: function () {
            switch (this.GEO) {
                case '1':
                    this.checks = checksRU
                    this.checkedGeo = [];
                    return true;

                case '2':
                    this.checks = checksEU
                    this.checkedGeo = [];
                    return true;

                case '3':
                    this.checks = checksASIA
                    this.checkedGeo = [];
                    return true;
            }
        },
    },



})

