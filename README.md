# 🔍 Abitus 
### Sistema de Visualização de Pessoas Desaparecidas

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

> Este repositório contém a implementação front-end de uma aplicação para consulta e gestão de informações sobre pessoas desaparecidas, utilizando a API Abitus.

## 🔗 Links do Projeto
- 📂 **GitHub**: [https://github.com/goul4rt/abitus](https://github.com/goul4rt/abitus)
- 🌐 **Demo em Produção**: [https://ogoulart.dev/](https://ogoulart.dev/)

---

## Dados da inscrições
- Inscrição: 9604
- E-mail: aroldogooulart@gmail.com
- Posição: Front-end Senior

## 📋 Sumário
- [Visão Geral do Projeto](#-visão-geral-do-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Arquitetura e Escolhas Técnicas](#-arquitetura-e-escolhas-técnicas)
- [Funcionalidades Extras do Dashboard](#-funcionalidades-extras-do-dashboard)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Containerização e Deploy](#-containerização-e-deploy)
- [Como Executar](#-como-executar)
- [Considerações de Desenvolvimento Futuro](#-considerações-de-desenvolvimento-futuro)

---

## 🔭 Visão Geral do Projeto

O sistema Abitus foi projetado como uma Single Page Application (SPA) que permite aos usuários visualizar, pesquisar e contribuir com informações sobre pessoas desaparecidas. A aplicação visa facilitar o acesso do cidadão às informações oficiais sobre desaparecidos, além de proporcionar um canal para contribuição de dados relevantes.

## ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
|---------------|-----------|
| 📋 **Listagem de Desaparecidos** | Visualização paginada de pessoas desaparecidas ou localizadas |
| 🔍 **Busca Avançada** | Filtros por nome, características físicas, última localização e data |
| 👤 **Detalhamento de Casos** | Visualização detalhada de cada caso com destaque para o status |
| 📝 **Envio de Informações** | Interface para cidadãos reportarem avistamentos ou informações relevantes |
| 📊 **Dashboard Analítico** | Visualização de dados agregados para análise de tendências |

---

## 🛠 Arquitetura e Escolhas Técnicas

### Stack Tecnológica

<details open>
<summary><strong>Tecnologias Utilizadas</strong></summary>
<br>

- **Framework**: [Next.js 15](https://nextjs.org/) - Escolhido pela performance, SEO otimizado e renderização híbrida
- **Linguagem**: TypeScript - Proporciona type safety e melhor manutenibilidade
- **UI/Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) 
  - [shadcn/ui](https://ui.shadcn.com/) 
- **Gerenciamento de Estado**: 
  - [Zustand](https://github.com/pmndrs/zustand) - Estado global leve e intuitivo
  - [React Query](https://tanstack.com/query/latest) - Gerenciamento de estados server-side com cache otimizado
- **Formulários**: 
  - [React Hook Form](https://react-hook-form.com/) 
  - [Zod](https://zod.dev/) - Validação eficiente com schema typesafe
- **Visualização de Dados**: 
  - [Recharts](https://recharts.org/) - Gráficos responsivos 
  - [React Leaflet](https://react-leaflet.js.org/) - Mapeamento geográfico interativo
</details>

### Justificativas Técnicas

<details>
<summary><strong>Por que essas tecnologias?</strong></summary>
<br>

1. **Next.js**: Selecionado pela App Router API que facilita a implementação de Lazy Loading Routes e pelo suporte nativo a Server Components, melhorando o tempo de carregamento e a experiência do usuário.

2. **TypeScript**: Melhora a manutenibilidade e previne bugs em tempo de desenvolvimento, especialmente importante em aplicações que consomem APIs externas.

3. **Tailwind + shadcn/ui**: Esta combinação permite criar interfaces responsivas para diversos tamanhos de tela de forma rápida e consistente, sem sacrificar a customização. O design system do shadcn/ui proporciona componentes acessíveis e responsivos.

4. **React Query**: Escolhido para gerenciar chamadas à API de forma eficiente, com recursos de cache, revalidação e manipulação de erros, reduzindo a quantidade de código manual para gerenciamento desses estados.

5. **Zustand**: Estado global leve que evita o boilerplate excessivo encontrado em outras soluções, facilitando o compartilhamento de estado entre componentes sem a complexidade de providers aninhados.

6. **Arquitetura em Docker**: Garante consistência entre ambientes de desenvolvimento e produção, facilitando o deploy e a escalabilidade da aplicação.
</details>

---

## 📊 Funcionalidades Extras do Dashboard

O dashboard analítico foi implementado como um estudo de caso adicional ao escopo original do projeto, oferecendo uma visão mais aprofundada dos dados:

| Categoria | Funcionalidades |
|-----------|----------------|
| **📈 Visualização Estatística** | • Total de pessoas desaparecidas<br>• Percentual de pessoas localizadas<br>• Casos recentes vs. casos antigos<br>• Distribuição por faixa etária |
| **🗺️ Análise Geográfica** | • Concentração de desaparecimentos por regiões<br>• Visualização da densidade de casos por localização<br>• Identificação de áreas com maior incidência |
| **👥 Análise Demográfica** | • Distribuição por gênero dos desaparecidos<br>• Distribuição por faixa etária<br>• Correlação entre idade, gênero e status |
| **🆕 Casos Recentes** | • Visualização rápida das informações essenciais<br>• Acesso direto à página de detalhes<br>• Indicadores visuais de status |

---

## 📁 Estrutura do Projeto

A aplicação segue uma arquitetura modular:

```
📦 Abitus
 ┣ 📂 app/                  # App Router do Next.js
 ┃ ┣ 📂 dashboard/          # Dashboard analítico
 ┃ ┣ 📂 person/             # Páginas de detalhamento
 ┃ ┗ 📂 report/             # Sistema de envio de informações
 ┣ 📂 components/           # Componentes reutilizáveis
 ┃ ┣ 📂 ui/                 # Componentes básicos de UI
 ┃ ┣ 📂 dashboard/          # Componentes específicos do dashboard
 ┃ ┗ 📂 person/             # Componentes específicos de pessoas
 ┣ 📂 hooks/                # Hooks customizados
 ┣ 📂 contexts/             # Contextos React
 ┣ 📂 lib/                  # Utilitários e configurações
 ┣ 📂 services/             # Camada de serviços para APIs
 ┗ 📂 styles/               # Estilos globais
```

---

## 🐳 Containerização e Deploy

A aplicação está configurada para execução em contêineres Docker, com duas configurações disponíveis:

### Produção

Utiliza o modo `standalone` do Next.js para otimização de recursos:

```bash
# Construir e iniciar contêineres
docker-compose build
docker-compose up -d
```

#### 🚀 Benefícios da Configuração

- ✅ Minimiza o tamanho da imagem através de builds multi-estágio
- ✅ Configura permissões de segurança adequadas através de usuário não-root
- ✅ Otimiza o processo de build com caching de dependências

### Performance e Otimizações

- ⚡ **Lazy Loading**: Implementado em todas as rotas e componentes pesados
- 🔍 **SEO**: Metadados dinâmicos e schema.org JSON-LD para melhor indexação
- ♿ **Acessibilidade**: Componentes seguem práticas WCAG para acessibilidade
- 🚀 **Performance**: Otimização de imagens e recursos estáticos

---

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados

### Instalação e Execução

```bash
# Clonar o repositório
git clone https://github.com/goul4rt/abitus.git
cd abitus

# Iniciar em modo de produção
docker compose up -d

# Acessar a aplicação
# http://localhost:3000
```

---

## 🔮 Considerações de Desenvolvimento Futuro

- 🧪 Implementação de testes unitários e de integração
- 🔔 Integração com serviços de notificação para alertas de novos casos
- 📈 Expansão do dashboard com análise preditiva
- 📱 Implementação de PWA para acesso offline e notificações push

---

<p align="center">
  <sub>Desenvolvido com ❤️ para auxiliar na busca e localização de pessoas desaparecidas no Brasil</sub>
</p>
