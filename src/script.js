const checksRU = [
    { text: 'Russia', value: 'RU', model: '7910numb7' },
    { text: 'Kazakhstan', value: 'KZ', model: '77numb9' },
    { text: 'Belarus', value: 'BY', model: '37533numb7' },
    { text: 'Ukraine', value: 'UA', model: '380numb9' },
    { text: 'Kyrgyzstan', value: 'KG', model: '996numb9,10' },
    { text: 'Georgia', value: 'GE', model: '995numb8,10' },
    { text: 'Azerbaijan', value: 'AZ', model: '994numb9,10' },
    { text: 'Armenia', value: 'AM', model: '374numb8,9' }
];

const checksEU = [
    { text: 'Italy', value: 'IT' },
    { text: 'Spain', value: 'ES' },
    { text: 'Germany', value: 'DE' },
    { text: 'Poland', value: 'PL' },
    { text: 'Austria', value: 'AT' },
    { text: 'Bulgaria', value: 'BG' },
    { text: 'Romania', value: 'RO' },
    { text: 'Greece', value: 'GR' },
    { text: 'Hungary', value: 'HU' }
];

const checksASIA = [
    { text: 'Thailand', value: 'TH' },
    { text: 'Indonesia', value: 'ID' },
    { text: 'Viet Nam', value: 'VN' }
];


var reg = new Vue({
    el: '#app-region',
    data: {

        token: null,
        hash: null,
        quantity_leads: null,
        GEO: null,
        checkedGeo: [],

        errors: [],
        checksRU,
        checksEU,
        checksASIA,



    },

    methods: {
        checkForm:
            function (err) {

                this.errors = [];

                if (this.token && this.hash && this.quantity_leads && this.checkedGeo.length !== 0) {


                    let inquiry = {
                        token: reg.token,
                        hash: reg.hash,
                        quantity_leads: reg.quantity_leads,
                        geo: reg.checkedGeo,
                    };
                    test(inquiry);

                    /* response = fetch('/answer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(inquiry)
                    }); */

                    //let json = JSON.stringify(inquiry);
                    // console.log(inquiry);
                    return true;
                }


                if (!this.token) {
                    this.errors.push('Required to indicate TOKEN.');
                }
                if (!this.hash) {
                    this.errors.push('Required to indicateь HASH.');
                }
                if (!this.quantity_leads) {
                    this.errors.push('Required to indicate quantity leads.');
                }
                if (this.checkedGeo.length === 0) {
                    this.errors.push('Required to indicate Geo.');
                }



                err.preventDefault();

            }

    },

    computed: {
        selectedRU: function () {
            if (this.GEO === '1') {
                this.checkedGeo = [];
                return true;
            }
        },
        selectedEU: function () {
            if (this.GEO === '2') {
                this.checkedGeo = [];
                return true;
            }
        },
        selectedASIA: function () {
            if (this.GEO === '3') {
                this.checkedGeo = [];
                return true;
            }
        }
    }

})

function test(inquiry) {
    //console.log(inquiry);
    const geos = inquiry.geo;
    console.log(geos);
    const prenumber = checksRU.filter(({ value }) => geos.includes(value));
    console.log(prenumber);

    //geos.forEach(x => (x))
}

/* function array_diff(a, b) {
    a.filter(a => b.includes(x));
} */