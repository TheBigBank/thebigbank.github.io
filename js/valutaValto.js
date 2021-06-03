const valuta_egy = document.getElementById("mirol");
const valuta_ketto = document.getElementById("mire");

const mennyiseg_egy = document.getElementById("from");
const mennyiseg_ketto = document.getElementById("to");

const rateEl = document.getElementById('rate');
const csere = document.getElementById("swapbtn");

function kiszamol() {
    const currency_one = valuta_egy.value
    const currency_two = valuta_ketto.value

    fetch('http://data.fixer.io/api/latest?access_key=b9a68923a64fd78e9ea274e40b3eea6a&format=1/' + currency_one)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById("euro").innerText = (data.rates.EUR * data.rates.HUF).toFixed(2);
            document.getElementById("usdd").innerText = ((data.rates.EUR * data.rates.HUF) / (data.rates.EUR * data.rates.USD)).toFixed(2);
            const rate = data.rates[currency_one];
            //rateEl.innerText = "1" + currency_two + "=" + rate + currency_one;
            if (data.rates[currency_one] > data.rates[currency_two]) {
                mennyiseg_ketto.value = ((data.rates[currency_one] * data.rates.EUR) / (data.rates.EUR * data.rates[currency_two]) * mennyiseg_egy.value).toFixed(2);
            } else {
                mennyiseg_ketto.value = ((data.rates[currency_one] * data.rates.EUR) * (data.rates.EUR * data.rates[currency_two]) * mennyiseg_egy.value).toFixed(2);
            }

        });

}

valuta_egy.addEventListener('change', kiszamol());
valuta_ketto.addEventListener('change', kiszamol());
mennyiseg_egy.addEventListener('keyup', kiszamol());
mennyiseg_ketto.addEventListener('keyup', kiszamol());
csere.addEventListener('click', () => {
    const temp = valuta_egy.value;
    valuta_egy.value = valuta_ketto.value;
    valuta_ketto.value = temp;

    const temp2 = mennyiseg_egy.value;
    mennyiseg_egy.value = mennyiseg_ketto.value;
    mennyiseg_ketto.value = temp2;
})

kiszamol();