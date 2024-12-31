const form = document.querySelector('#search-form > form');

const input: HTMLInputElement | null = document.querySelector('#search-bar');

const sectionTempoInfos = document.querySelector('#tempo-info')

form?.addEventListener('submit', async (event) =>{
    event.preventDefault();

    if(!input || !sectionTempoInfos) return;

    const localizacao = input.value;

    if (localizacao.length < 3) {
        alert('O local precisa ter pelo menos 3 letras');
        return;
    }

    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=8642853073d3d08674b040a8820f7beb&lang=pt_br&units=metric`);

        const dados = await response.json();
    
    const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
    };

    sectionTempoInfos.innerHTML = `
        <div class="tempo-data">
                    <h2>${infos.local}</h2>
                    <span>${infos.temperatura}</span>
                </div>

                <img src="${infos.icone}">
    
    `
} catch (err) {
    console.log('Deu ruim fml', err);
    
} 
})

