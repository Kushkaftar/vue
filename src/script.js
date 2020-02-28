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

        errorsValidation: [],
        checks: [],

        inquiry: {}


    },

    methods: {
        checkForm:
            function (err) {

                this.errorsValidation = [];

                if (this.token && this.hash && this.quantity_leads && this.checkedGeo.length !== 0) {

                    const prenumber = this.checks.filter(({ geo }) => reg.checkedGeo.includes(geo));

                    console.log(prenumber);

                    const countrys = prenumber.map(function (g) {
                        return (`geo: ${g.geo}`);
                    });


                    console.log(JSON.stringify(countrys));
                    inquiry = {
                        token: this.token,
                        hash: this.hash,
                        quantity_leads: +this.quantity_leads,
                        country: countrys,
                    };
                    console.log(JSON.stringify(inquiry));
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
                    this.errorsValidation.push('Required to indicate TOKEN.');
                }
                if (!this.hash) {
                    this.errorsValidation.push('Required to indicate HASH.');
                }
                if (!this.quantity_leads) {
                    this.errorsValidation.push('Required to indicate quantity leads.');
                }
                if (this.checkedGeo.length === 0) {
                    this.errorsValidation.push('Required to indicate Geo.');
                }



                err.preventDefault();

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

