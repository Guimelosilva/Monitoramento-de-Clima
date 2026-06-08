const CHAVE_API = "82092931e35f7a893848e1f91ba86cc3";

// Cache para armazenar sugestões (evita muitas requisições)
let cacheSugestoes = {};
let debounceTimer;

async function buscarSugestoes(consulta) {
    if (!consulta || consulta.length < 2) {
        document.getElementById('sugestoesLista').classList.remove('mostrar');
        return;
    }
    
    // Verifica cache
    if (cacheSugestoes[consulta]) {
        exibirSugestoes(cacheSugestoes[consulta]);
        return;
    }
    
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(consulta)}&limit=8&appid=${CHAVE_API}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        
        cacheSugestoes[consulta] = dados;
        exibirSugestoes(dados);
        
    } catch (erro) {
        console.error('Erro ao buscar sugestões:', erro);
    }
}

// EXIBIR SUGESTÕES NA LISTA
function exibirSugestoes(cidades) {
    const listaDiv = document.getElementById('sugestoesLista');
    
    if (!cidades || cidades.length === 0) {
        listaDiv.innerHTML = '<div class="sem-resultados">🔍 Nenhuma cidade encontrada...</div>';
        listaDiv.classList.add('mostrar');
        return;
    }
    
    listaDiv.innerHTML = cidades.map(cidade => {
        const nome = cidade.name;
        const estado = cidade.state ? `${cidade.state}, ` : '';
        const pais = cidade.country;
        let nomeExibicao = nome;
        let detalheExibicao = `${estado}${pais}`;
        
        // siglas de países para nomes completos
        const paises = {
            'BR': 'Brasil', 'US': 'Estados Unidos', 'GB': 'Reino Unido',
            'PT': 'Portugal', 'FR': 'França', 'DE': 'Alemanha',
            'IT': 'Itália', 'ES': 'Espanha', 'JP': 'Japão',
            'CN': 'China', 'CA': 'Canadá', 'AU': 'Austrália',
            'AR': 'Argentina', 'MX': 'México', 'CL': 'Chile'
        };
        
        if (paises[pais]) {
            detalheExibicao = estado ? `${estado}${paises[pais]}` : paises[pais];
        }
        
        return `
            <div class="item-sugestao" onclick="selecionarCidade('${nome}', '${estado.replace(/'/g, "\\'")}', '${pais}')">
                <span class="nome-sugestao">${nome}</span>
                <span class="detalhe-sugestao">${detalheExibicao}</span>
            </div>
        `;
    }).join('');
    
    listaDiv.classList.add('mostrar');
}

// SELECIONAR CIDADE DA LISTA DE SUGESTÕES
function selecionarCidade(nome, estado, pais) {
    const entrada = document.getElementById('entradaCidade');
    entrada.value = nome;
    document.getElementById('sugestoesLista').classList.remove('mostrar');
    buscarClima();
}

// FECHAR SUGESTÕES AO CLICAR FORA
document.addEventListener('click', function(e) {
    const wrapper = document.querySelector('.autocomplete-wrapper');
    const sugestoes = document.getElementById('sugestoesLista');
    if (wrapper && !wrapper.contains(e.target)) {
        sugestoes.classList.remove('mostrar');
    }
});

// DEBOUNCE PARA EVITAR REQUISIÇÕES EXCESSIVAS
function configurarBuscaSugestoes() {
    const entrada = document.getElementById('entradaCidade');
    
    entrada.addEventListener('input', function(e) {
        clearTimeout(debounceTimer);
        const consulta = e.target.value;
        
        debounceTimer = setTimeout(() => {
            if (consulta.length >= 2) {
                buscarSugestoes(consulta);
            } else {
                document.getElementById('sugestoesLista').classList.remove('mostrar');
            }
        }, 500); // Aguarda 500ms após parar de digitar
    });
}

// GERENCIAMENTO DE FAVORITOS
let favoritos = [];

function carregarFavoritos() {
    const salvos = localStorage.getItem('cidadesFavoritas');
    favoritos = salvos ? JSON.parse(salvos) : [];
    atualizarListaFavoritos();
}

function salvarFavoritos() {
    localStorage.setItem('cidadesFavoritas', JSON.stringify(favoritos));
    atualizarListaFavoritos();
}

function adicionarFavorito(cidade, estado, pais) {
    const nomeCompleto = estado ? `${cidade},${estado},${pais}` : `${cidade},${pais}`;
    if (!favoritos.includes(nomeCompleto)) {
        favoritos.push(nomeCompleto);
        salvarFavoritos();
        mostrarNotificacao(`⭐ ${cidade} adicionada aos favoritos!`);
        return true;
    }
    mostrarNotificacao(`⚠️ ${cidade} já está nos favoritos!`);
    return false;
}

function removerFavorito(cidadeCompleta) {
    favoritos = favoritos.filter(f => f !== cidadeCompleta);
    salvarFavoritos();
    const cidade = cidadeCompleta.split(',')[0];
    mostrarNotificacao(`🗑️ ${cidade} removida dos favoritos!`);
}

function ehFavorito(cidade, estado, pais) {
    const nomeCompleto = estado ? `${cidade},${estado},${pais}` : `${cidade},${pais}`;
    return favoritos.includes(nomeCompleto);
}

function atualizarListaFavoritos() {
    const listaDiv = document.getElementById('listaFavoritos');
    if (!listaDiv) return;
    
    if (favoritos.length === 0) {
        listaDiv.innerHTML = '<p class="sem-favoritos">Nenhuma cidade favorita ainda. Clique na ⭐ para adicionar!</p>';
        return;
    }
    
    listaDiv.innerHTML = favoritos.map(item => {
        const partes = item.split(',');
        const nome = partes[0];
        const estado = partes.length === 3 ? partes[1] : '';
        const pais = partes.length === 3 ? partes[2] : partes[1];
        const exibicao = estado ? `${nome} - ${estado} (${pais})` : `${nome} (${pais})`;
        
        return `
            <div class="item-favorito" onclick="buscarCidadeFavorita('${item}')">
                <span class="nome-favorito">${exibicao}</span>
                <button class="btn-remover-favorito" onclick="event.stopPropagation(); removerFavorito('${item}')">✖</button>
            </div>
        `;
    }).join('');
}

function buscarCidadeFavorita(item) {
    const cidade = item.split(',')[0];
    document.getElementById('entradaCidade').value = cidade;
    buscarClima();
}

function toggleFavorito(cidade, estado, pais) {
    if (ehFavorito(cidade, estado, pais)) {
        const nomeCompleto = estado ? `${cidade},${estado},${pais}` : `${cidade},${pais}`;
        removerFavorito(nomeCompleto);
    } else {
        adicionarFavorito(cidade, estado, pais);
    }
    buscarClima();
}

function limparTodosFavoritos() {
    if (confirm('Tem certeza que deseja remover TODAS as cidades favoritas?')) {
        favoritos = [];
        salvarFavoritos();
        mostrarNotificacao('🗑️ Todos os favoritos foram removidos!');
        buscarClima();
    }
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    setTimeout(() => notificacao.remove(), 2000);
}

// FUNÇÃO PARA BUSCAR ESTADO
async function buscarEstado(cidade, pais) {
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cidade)},${pais}&limit=1&appid=${CHAVE_API}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        
        if (dados && dados.length > 0 && dados[0].state) {
            return dados[0].state;
        }
        return null;
    } catch (erro) {
        return null;
    }
}

// CORES DE FUNDO POR CLIMA
function aplicarFundoDinamico(condicao, temperatura) {
    const fundoDiv = document.getElementById('fundoDinamico');
    if (!fundoDiv) return;
    
    let gradiente = '';
    switch(condicao) {
        case 'Clear':
            if (temperatura >= 30) gradiente = 'linear-gradient(135deg, #f12711, #f5af19, #ff6b35)';
            else if (temperatura >= 25) gradiente = 'linear-gradient(135deg, #2193b0, #6dd5ed, #4facfe)';
            else gradiente = 'linear-gradient(135deg, #4facfe, #00f2fe, #43e97b)';
            break;
        case 'Clouds':
            gradiente = 'linear-gradient(135deg, #4b6cb7, #182848, #2c3e50)';
            break;
        case 'Rain':
        case 'Drizzle':
            gradiente = 'linear-gradient(135deg, #2c3e50, #3498db, #2980b9)';
            break;
        case 'Thunderstorm':
            gradiente = 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)';
            break;
        case 'Snow':
            gradiente = 'linear-gradient(135deg, #e0eafc, #cfdef3, #b8c6db)';
            break;
        default:
            gradiente = 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)';
    }
    fundoDiv.style.background = gradiente;
}

// ÍCONES E DESCRIÇÕES
const iconesClima = {
    'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️',
    'Drizzle': '🌦️', 'Thunderstorm': '⛈️', 'Snow': '❄️',
    'Mist': '🌫️', 'Fog': '🌫️'
};

const descricoesClima = {
    'Clear': '☀️ Céu limpo e ensolarado', 'Clouds': '☁️ Céu nublado',
    'Rain': '🌧️ Chuvoso', 'Drizzle': '🌦️ Garoa fina',
    'Thunderstorm': '⛈️ Tempestade com raios', 'Snow': '❄️ Neve',
    'Mist': '🌫️ Neblina', 'Fog': '🌫️ Nevoeiro'
};

// BUSCAR CLIMA
let estadoAtual = null;

async function buscarClima() {
    const entrada = document.getElementById('entradaCidade');
    const resultadoDiv = document.getElementById('resultado');
    const previsaoDiv = document.getElementById('previsao');
    
    if (!entrada || !resultadoDiv) return;
    
    const cidade = entrada.value;
    if (!cidade.trim()) {
        resultadoDiv.innerHTML = '<div class="erro">⚠️ Digite o nome de uma cidade!</div>';
        return;
    }
    
    resultadoDiv.innerHTML = `<div class="carregamento"><div class="spinner"></div><p>🌍 Buscando clima de ${cidade}...</p></div>`;
    previsaoDiv.style.display = 'none';
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&units=metric&lang=pt_br&appid=${CHAVE_API}`;
        const resposta = await fetch(url);
        
        if (!resposta.ok) throw new Error(`Cidade "${cidade}" não encontrada!`);
        
        const dados = await resposta.json();
        const condicao = dados.weather[0].main;
        const temperatura = Math.round(dados.main.temp);
        
        const cidadeNome = dados.name;
        const pais = dados.sys.country;
        estadoAtual = await buscarEstado(cidadeNome, pais);
        
        aplicarFundoDinamico(condicao, temperatura);
        
        const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cidade)}&units=metric&lang=pt_br&appid=${CHAVE_API}`;
        const respPrevisao = await fetch(urlPrevisao);
        const dadosPrevisao = await respPrevisao.json();
        
        exibirClima(dados, condicao, temperatura, estadoAtual);
        exibirPrevisao(dadosPrevisao);
        
        // Fecha sugestões
        document.getElementById('sugestoesLista').classList.remove('mostrar');
        
    } catch (erro) {
        resultadoDiv.innerHTML = `<div class="erro">❌ ${erro.message}</div>`;
    }
}

function exibirClima(dados, condicao, temperatura, estado) {
    const resultadoDiv = document.getElementById('resultado');
    const cidadeNome = dados.name;
    const pais = dados.sys.country;
    const isFav = ehFavorito(cidadeNome, estado, pais);
    
    let localizacaoHtml = '';
    if (estado) {
        localizacaoHtml = `
            <div class="nome-cidade">${cidadeNome}</div>
            <div class="estado">${estado}</div>
            <div class="pais">${pais}</div>
        `;
    } else {
        localizacaoHtml = `
            <div class="nome-cidade">${cidadeNome}</div>
            <div class="pais">${pais}</div>
        `;
    }
    
    resultadoDiv.innerHTML = `
        <div class="cartao-clima">
            ${localizacaoHtml}
            <div class="icone-clima">${iconesClima[condicao] || '🌡️'}</div>
            <div class="temperatura">${temperatura}<span>°C</span></div>
            <div class="descricao">${descricoesClima[condicao] || dados.weather[0].description}</div>
            
            <button class="botao-favoritar ${isFav ? 'ativo' : ''}" onclick="toggleFavorito('${cidadeNome}', '${estado || ''}', '${pais}')">
                ${isFav ? '⭐ Favoritado' : '☆ Adicionar aos favoritos'}
            </button>
            
            <div class="grade-detalhes">
                <div class="cartao-detalhe"><div class="rotulo-detalhe">🌡️ Sensação</div><div class="valor-detalhe">${Math.round(dados.main.feels_like)}°C</div></div>
                <div class="cartao-detalhe"><div class="rotulo-detalhe">📊 Min/Máx</div><div class="valor-detalhe">${Math.round(dados.main.temp_min)}° / ${Math.round(dados.main.temp_max)}°</div></div>
                <div class="cartao-detalhe"><div class="rotulo-detalhe">💧 Umidade</div><div class="valor-detalhe">${dados.main.humidity}%</div></div>
                <div class="cartao-detalhe"><div class="rotulo-detalhe">🌬️ Vento</div><div class="valor-detalhe">${Math.round(dados.wind.speed * 3.6)} km/h</div></div>
                <div class="cartao-detalhe"><div class="rotulo-detalhe">⏲️ Pressão</div><div class="valor-detalhe">${dados.main.pressure} hPa</div></div>
                <div class="cartao-detalhe"><div class="rotulo-detalhe">👁️ Visibilidade</div><div class="valor-detalhe">${(dados.visibility / 1000).toFixed(1)} km</div></div>
            </div>
        </div>
    `;
}

function exibirPrevisao(dados) {
    const previsaoDiv = document.getElementById('previsao');
    const listaPrevisao = document.getElementById('listaPrevisao');
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const previsaoDiaria = {};
    
    dados.list.forEach(item => {
        const data = new Date(item.dt_txt);
        const diaStr = data.toLocaleDateString();
        if (!previsaoDiaria[diaStr]) {
            previsaoDiaria[diaStr] = { temps: [], icones: [], data: data };
        }
        previsaoDiaria[diaStr].temps.push(item.main.temp);
        previsaoDiaria[diaStr].icones.push(item.weather[0].main);
    });
    
    const proximos = Object.entries(previsaoDiaria).slice(1, 6);
    
    if (proximos.length === 0) {
        listaPrevisao.innerHTML = '<p style="color:white">Previsão não disponível</p>';
        previsaoDiv.style.display = 'block';
        return;
    }
    
    listaPrevisao.innerHTML = proximos.map(([dia, info]) => {
        const tempMedia = info.temps.reduce((a,b) => a+b,0)/info.temps.length;
        const icone = iconesClima[info.icones[0]] || '🌡️';
        const tempMin = Math.round(Math.min(...info.temps));
        const tempMax = Math.round(Math.max(...info.temps));
        return `
            <div class="item-previsao">
                <div class="dia-previsao">${dias[info.data.getDay()]}</div>
                <div class="icone-previsao">${icone}</div>
                <div class="temperatura-previsao">${Math.round(tempMedia)}°</div>
                <div class="temperatura-min-previsao">${tempMin}° / ${tempMax}°</div>
            </div>
        `;
    }).join('');
    
    previsaoDiv.style.display = 'block';
}

function usarMinhaLocalizacao() {
    const resultadoDiv = document.getElementById('resultado');
    if (!navigator.geolocation) {
        resultadoDiv.innerHTML = '<div class="erro">❌ Geolocalização não suportada!</div>';
        return;
    }
    
    resultadoDiv.innerHTML = `<div class="carregamento"><div class="spinner"></div><p>📍 Obtendo localização...</p></div>`;
    
    navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&limit=1&appid=${CHAVE_API}`;
            const resposta = await fetch(url);
            const dados = await resposta.json();
            
            if (dados && dados.length > 0) {
                document.getElementById('entradaCidade').value = dados[0].name;
                await buscarClima();
            } else {
                throw new Error('Localização não encontrada');
            }
        } catch(e) {
            resultadoDiv.innerHTML = '<div class="erro">❌ Erro na localização</div>';
        }
    }, () => {
        resultadoDiv.innerHTML = '<div class="erro">❌ Permissão negada</div>';
    });
}

// INICIALIZAR
document.addEventListener('DOMContentLoaded', () => {
    carregarFavoritos();
    configurarBuscaSugestoes();
    
    document.getElementById('botaoBuscar')?.addEventListener('click', buscarClima);
    document.getElementById('botaoLocalizacao')?.addEventListener('click', usarMinhaLocalizacao);
    document.getElementById('botaoLimparFavoritos')?.addEventListener('click', limparTodosFavoritos);
    
    buscarClima();
});
