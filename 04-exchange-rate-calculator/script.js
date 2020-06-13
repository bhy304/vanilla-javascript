const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amount__one = document.getElementById('amount-one');
const amount__two = document.getElementById('amount-two');
const rate__el = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
    const currency__one = currencyEl_one.value;
    const currency__two = currencyEl_two.value;

    // https://open.exchangerate-api.com/v6/latest
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency__one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency__two];
            rate__el.innerText = `1 ${currency__one} = ${rate} ${currency__two}`;

            amount__two.value = (amount__one.value * rate).toFixed(2);
        });
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amount__one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amount__two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();