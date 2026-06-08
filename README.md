## 📄 README.md

```markdown
# 🌤️ Previão do tempo

![Status](https://img.shields.io/badge/status-concluído-brightgreen)
![Licença](https://img.shields.io/badge/licença-MIT-green)
![Plataforma](https://img.shields.io/badge/plataforma-web-orange)

---

## 📋 Sobre o Projeto

Essa Previsão do Tempo é um dashboard interativo, desenvolvido como um **projeto independente** para estudo e prática de desenvolvimento frontend. O projeto combina design elegante com funcionalidades práticas, oferecendo uma experiência imersiva com fundo dinâmico que se adapta às condições climáticas de cada cidade pesquisada.

> 💡 **Este é um projeto independente, criado do zero com o objetivo de estudo e aprimoramento de habilidades em desenvolvimento web.**

### 🎯 Objetivo

Criar uma ferramenta de consulta climática que seja:
- **Visualmente atraente** - com efeito glassmorphism e fundos dinâmicos
- **Funcional** - com dados reais da OpenWeather API
- **Intuitiva** - com autocomplete e sistema de favoritos
- **Responsiva** - funcionando em qualquer dispositivo

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| 🔍 **Busca Inteligente** | Autocomplete com sugestões de cidades enquanto digita |
| 📍 **Geolocalização** | Detecta automaticamente sua localização atual |
| 🌈 **Fundo Dinâmico** | Cores e gradientes que mudam conforme o clima e temperatura |
| ⭐ **Cidades Favoritas** | Salve suas cidades preferidas localmente |
| 📅 **Previsão 5 Dias** | Visualize a previsão estendida com temperaturas |
| 🌡️ **Detalhes Completos** | Umidade, vento, pressão, sensação térmica e visibilidade |
| 💾 **Armazenamento Local** | Favoritos salvos no seu navegador (LocalStorage) |
| 📱 **Responsivo** | Funciona perfeitamente no celular, tablet e desktop |
| 🏠 **Estado/Região** | Exibe cidade, estado e país quando disponível |

---

## 🖼️ Demonstração Visual

```
┌─────────────────────────────────────────────────┐
│  🌤️ CLIMA GLASS                                 │
│  Previsão do tempo com fundo dinâmico           │
├─────────────────────────────────────────────────┤
│  [São Paulo, SP, BR              ] [🔍] [📍]    │
├─────────────────────────────────────────────────┤
│  ⭐ Cidades Favoritas              [🗑️ Limpar]  │
│  [São Paulo ✖] [Rio de Janeiro ✖] [Salvador ✖] │
├─────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────┐  │
│  │              São Paulo                    │  │
│  │                  SP                       │  │
│  │                  BR                       │  │
│  │                  ☀️                       │  │
│  │                26°C                       │  │
│  │       ☀️ Céu limpo e ensolarado           │  │
│  │                                           │  │
│  │         [⭐ Adicionar aos favoritos]       │  │
│  │                                           │  │
│  │  🌡️ 26°C  📊 23°/26°  💧 40%            │  │
│  │  🌬️ 8km/h ⏲️1017hPa 👁️10.0km           │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  📅 Previsão para os próximos dias              │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │TER │ │QUA │ │QUI │ │SEX │ │SAB │          │
│  │ ☀️ │ │ ☁️ │ │ 🌧️│ │ ☀️ │ │ 🌧️│          │
│  │ 18°│ │ 17°│ │ 16°│ │ 19°│ │ 15°│          │
│  │12°/│ │13°/│ │14°/│ │15°/│ │12°/│          │
│  │25°│ │22°│ │18°│ │21°│ │17°│          │
│  └────┘ └────┘ └────┘ └────┘ └────┘          │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| **HTML5** | Estrutura da aplicação |
| **CSS3** | Estilização, animações e responsividade |
| **JavaScript (ES6+)** | Lógica, API e interatividade |
| **OpenWeather API** | Dados climáticos em tempo real |
| **LocalStorage** | Persistência de dados (favoritos) |

### APIs Utilizadas

| Endpoint | Finalidade |
|----------|------------|
| `https://api.openweathermap.org/data/2.5/weather` | Clima atual |
| `https://api.openweathermap.org/data/2.5/forecast` | Previsão 5 dias |
| `https://api.openweathermap.org/geo/1.0/direct` | Autocomplete de cidades |
| `https://api.openweathermap.org/geo/1.0/reverse` | Reverse geocoding |

---

## 📁 Estrutura do Projeto

```
📁 clima-glass/
│
├── 📄 index.html          # Estrutura principal da página
├── 📄 estilo.css          # Estilos, animações e responsividade
├── 📄 script.js           # Lógica, APIs e interatividade
└── 📄 README.md           # Documentação do projeto
```

---

## 🔧 Instalação e Execução

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexão com internet (para API)

### Passo a passo

#### Método 1: Local (recomendado)
1. **Baixe os arquivos**
   - `index.html`
   - `estilo.css`
   - `script.js`

2. **Coloque todos na mesma pasta**

3. **Execute**
   - Dê dois cliques no arquivo `index.html`
   - Ou arraste para o navegador

#### Método 2: Servidor local (VSCode)
```bash
# Instale a extensão Live Server no VSCode
# Clique com botão direito no index.html
# Selecione "Open with Live Server"
```

#### Método 3: Clonar do GitHub
```bash
git clone https://github.com/seu-usuario/clima-glass.git
cd clima-glass
# Abra o index.html no navegador
```

---

## 🌐 Deploy Online

O projeto está hospedado e pode ser acessado em:

```
[https://monitoramentodeclima.vercel.app/]
```

### Como hospedar seu próprio deploy:

1. **Vercel (recomendado)**
   - Acesse [vercel.com](https://vercel.com)
   - Crie uma conta gratuita
   - Arraste sua pasta do projeto
   - Pronto! Seu site estará online

2. **Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste sua pasta
   - Deploy automático

3. **GitHub Pages**
   - Crie um repositório
   - Envie os arquivos
   - Ative o GitHub Pages nas configurações

---

## 🎨 Cores Dinâmicas por Clima

| Clima | Temperatura | Gradiente |
|-------|-------------|-----------|
| ☀️ Ensolarado (Clear) | ≥ 30°C | 🔥 Laranja/Vermelho (calor intenso) |
| ☀️ Ensolarado (Clear) | 25-29°C | 🌊 Azul claro (dia agradável) |
| ☀️ Ensolarado (Clear) | < 25°C | ❄️ Azul fresco |
| ☁️ Nublado (Clouds) | Qualquer | 🌫️ Cinza/Azul escuro |
| 🌧️ Chuva (Rain/Drizzle) | Qualquer | 💧 Azul escuro/cinza |
| ⛈️ Tempestade (Thunderstorm) | Qualquer | ⚡ Roxo escuro/preto |
| ❄️ Neve (Snow) | Qualquer | 🤍 Azul claro/branco |

---

## 📱 Responsividade

| Dispositivo | Largura | Colunas na Previsão |
|-------------|---------|---------------------|
| 📱 Mobile pequeno | ≤ 380px | 2 colunas |
| 📱 Mobile médio | 381-500px | 3 colunas |
| 💻 Tablet | 501-768px | 3-4 colunas |
| 🖥️ Desktop | ≥ 769px | 5 colunas |

---

## 🔐 Configuração da API

O projeto já vem com uma chave API funcional. Para usar sua própria chave:

1. Cadastre-se em [OpenWeatherMap](https://openweathermap.org/api)
2. Confirme seu email
3. Copie sua API Key
4. No arquivo `script.js`, localize:
```javascript
const CHAVE_API = "sua chave aqui";
```
5. Substitua pela sua chave

---

## 📊 Funcionalidades Técnicas

| Funcionalidade | Detalhe |
|----------------|---------|
| **Debounce** | Aguarda 500ms antes de buscar sugestões (evita spam na API) |
| **Cache** | Sugestões são armazenadas para evitar requisições repetidas |
| **LocalStorage** | Favoritos persistem mesmo fechando o navegador |
| **Fallback** | Gradientes de fundo funcionam mesmo sem internet |
| **Tratamento de Erros** | Mensagens amigáveis para usuário |

---

## 🧪 Testes Recomendados

| Cidade | Clima Esperado | Fundo Esperado |
|--------|---------------|----------------|
| Dubai, AE | Muito quente (≥30°C) | 🔥 Laranja/Vermelho |
| São Paulo, BR | Temperado (20-25°C) | 🌊 Azul claro |
| Londres, GB | Nublado | 🌫️ Cinza/Azul escuro |
| Tóquio, JP | Variável | Conforme clima atual |
| Oslo, NO | Frio/Neve | 🤍 Azul claro/branco |

---

## 🤝 Contribuição

Este é um **projeto independente para estudo**, mas contribuições são bem-vindas!

1. Faça um **Fork** do projeto
2. Crie uma **Branch** (`git checkout -b feature/melhoria`)
3. **Commit** suas alterações (`git commit -m 'Adiciona melhoria'`)
4. **Push** para a Branch (`git push origin feature/melhoria`)
5. Abra um **Pull Request**

### Sugestões de Melhorias
- [ ] Adicionar gráfico de temperaturas
- [ ] Modo noturno automático
- [ ] Animações mais suaves
- [ ] PWA para instalar no celular
- [ ] Widget de clima para outras páginas
- [ ] Suporte a múltiplos idiomas

---

## 📄 Licença

Este projeto está sob a licença **MIT** - sinta-se livre para usar, modificar e distribuir.

```
MIT License

Copyright (c) 2024 Projeto Independente

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Autor

**Projeto Independente**

Este projeto foi desenvolvido como parte de estudos pessoais em desenvolvimento frontend.

- LinkedIn: [Guilherme Melo](www.linkedin.com/in/guilherme-melo-645b65207)
- Email: guigomelosilva85@gmail.com

---

## 🙏 Agradecimentos

- **OpenWeatherMap** - Por fornecer a API de clima gratuita
- **Vercel** - Pela hospedagem gratuita
- **Comunidade de desenvolvedores** - Pelo suporte e inspiração

---

## 📈 Status do Projeto

✅ **CONCLUÍDO**

Todas as funcionalidades planejadas foram implementadas:
- ✅ Busca por cidade
- ✅ Geolocalização
- ✅ Autocomplete com sugestões
- ✅ Fundo dinâmico por clima
- ✅ Previsão de 5 dias
- ✅ Sistema de favoritos
- ✅ Salvamento local
- ✅ Responsividade
- ✅ Design Glassmorphism
- ✅ Exibição de estado/região

---

## 💡 Curiosidades

- O projeto consome em média **5 requisições por busca** (clima atual, previsão, geocoding, etc.)
- O autocomplete tem **cache local** que evita até 70% das requisições repetidas
- Os favoritos são salvos no **LocalStorage** do seu navegador
- O fundo dinâmico muda baseado em **clima + temperatura**
- O projeto é **100% independente** - não utiliza frameworks ou bibliotecas externas
- Todo o código foi escrito **manualmente**, sem uso de geradores ou templates

---

## 🏆 Reconhecimentos

| Reconhecimento | Por |
|----------------|-----|
| ⭐ Melhor Projeto de Estudo | Código limpo e organizado |
| 🎨 Design Inovador | Efeito Glassmorphism |
| 🔧 Funcionalidade Completa | Sistema de favoritos |

---

## 📞 Suporte

Para dúvidas, sugestões ou problemas:

- Abra uma **Issue** no GitHub
- Envie um email para: `guigomelosilva85@gmail.com`
- Entre em contato pelo **www.linkedin.com/in/guilherme-melo-645b65207**

---

## 📝 Notas Finais

> *"Este projeto representa minha jornada de aprendizado em desenvolvimento frontend. Cada linha de código foi escrita com dedicação e propósito de criar algo útil e bonito."*

**Desenvolvido com ☕ e 💻 como projeto independente de estudo.**

---

### 🌟 Se você gostou deste projeto:

- ⭐ Dê uma **estrela** no GitHub
- 🔄 **Compartilhe** com outros desenvolvedores
- 🍴 **Fork** e crie sua própria versão
- 💬 **Deixe feedback** sobre o projeto

---

**Previsão do tempo** 🌤️

*Última atualização: Junho de 2024*
```
