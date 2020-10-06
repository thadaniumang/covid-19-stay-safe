const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('#menu');
const activeNet = document.querySelector('#active .net');
const deathNet = document.querySelector('#death .net');
const testNet = document.querySelector('#test .net');
const recoveredNet = document.querySelector('#recovered .net');
const recoveredDaily = document.querySelector('#recovered .daily');
const activeDaily = document.querySelector('#active .daily');
const deathDaily = document.querySelector('#death .daily');
const testDaily = document.querySelector('#test .daily');
const positivity = document.querySelector('#netPos');
const date = document.querySelector('.date');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("change");
    if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
    }
    else{
        menu.classList.add('hidden');
    }
})

const setHTML = (data, tests) => {
    activeNet.innerHTML = parseInt(data.active).toLocaleString('en-in');
    recoveredNet.innerHTML =  parseInt(data.recovered).toLocaleString('en-in');
    deathNet.innerHTML = parseInt(data.deaths).toLocaleString('en-in');
    recoveredDaily.innerHTML +=  parseInt(data.deltarecovered).toLocaleString('en-in');
    deathDaily.innerHTML += parseInt(data.deltadeaths).toLocaleString('en-in');
    let activeToday = parseInt(data.deltaconfirmed) - parseInt(data.deltarecovered) - parseInt(data.deltadeaths);
    if(activeToday >= 0){
        activeDaily.querySelector('.arrow-down').style.display = 'none';
    }
    else{
        activeDaily.querySelector('.arrow-up').style.display = 'none';
        activeToday *= -1;
    }
    activeDaily.innerHTML += activeToday.toLocaleString('en-in');
    testNet.innerHTML = parseInt(tests.totalsamplestested).toLocaleString('en-in');
    testDaily.innerHTML += parseInt(tests.samplereportedtoday).toLocaleString('en-in');
    positivity.innerHTML = `Positivity Rate : ${tests.testpositivityrate} %` + positivity.innerHTML;
    date.innerHTML = `Data as of ${new Date().toLocaleString('en-in')}<br>Testing data as of ${tests.testedasof}`;
}

const covid19api = "https://api.covid19india.org/data.json";

fetch(covid19api).then(response => {
    return response.json();
}).then(json => {
    const data = json.statewise[0];
    const tests = json.tested[json.tested.length - 1];
    setHTML(data, tests);
})