export const ptBr = {
  HomePage: {
    title: "Albion Event Bot",
    description: "Um bot para ajudar você a dividir loot e consultar preços do mercado em Albion Online.",
    subtitle: "Divida o loot de forma justa e rápida com seus amigos!",
    addToDiscord: "Adicionar ao Discord",
    makeDonation: "Fazer uma doação",
    aboutBot: "Sobre o Bot",
    splitLoot: "Loot Split",
    splitLootDescription:
      "Crie eventos, acompanhe a participação dos jogadores e simule a divisão de loot com base no tempo de participação de cada um — tudo de forma rápida e justa.",
    marketPrice: "Market Price",
    marketPriceDescription:
      "Consulte os preços de qualquer item do jogo direto no Discord, com suporte a todos os servidores.",
    balanceManagement: "Gerenciamento de saldos",
    balanceManagementDescription:
      "Controle os valores devidos a cada jogador após o evento, registre depósitos, saques e mantenha o saldo da guilda sempre organizado.",
    multilingual: "Multilíngue",
    multilingualDescription:
      "O bot fala a sua língua! Suporte a múltiplos idiomas para facilitar o uso por jogadores do mundo todo.",
  },
  ContributionPage: {
    titleInitial: "💜 Ajude o",
    titleMid: "a se manter",
    description:
      " Esse bot é totalmente gratuito e foi criado para facilitar a vida da comunidade — mas, como qualquer serviço online, ele gera custos mensais com servidores, banco de dados, monitoramento e manutenção. Se você gosta do bot, usa com frequência ou simplesmente quer apoiar esse projeto, considere contribuir com qualquer valor.",
    contributionString: "Sua ajuda permite:",
    contribuitionList: {
      item1: "Manter o bot online 24/7",
      item2: "Garantir estabilidade e atualizações frequentes",
      item3: "Adicionar novas funcionalidades",
      item4: "Cobrir custos de infraestrutura e suporte",
    },
    pixText: "Contribua via PIX",
    paypalText: "Contribua via PayPal",
    finalText: "Toda contribuição, por menor que seja, faz uma grande diferença. 💜",
  },
  docsLayout: {
    title: "Primeiros Passos",
    instalationText: "Instalação Bot",
    setupText: "Setup",
    channelsText: "Canais",
    howToUseText: "Como usar",
    createEventText: "Criar evento",
    participateEventText: "Participar Evento",
    startEventText: "Iniciar Evento",
    cancelEventText: "Cancelar Evento",
    finishEventText: "Finalizar Evento",
    marketPriceSection: "Market Price",
    marketPriceText: "Consultar preços do Mercado",
    commandsSection: "Comandos",
    commandsEventText: "Eventos",
    commandsManagementBalanceText: "Gerenciar Saldos",
    commandsTransactionsText: "Transações",
    commandsAlterLanguageText: "Alterar Idioma",
  },
  docsInstalation: {
    title: "📥 Instalação do Bot",
    description:
      "Para adicionar o bot ao seu servidor do Discord, siga os passos abaixo. O processo é rápido e seguro.",
    steps: {
      step1: "Clique no link de convite:",
      step1Link: "Convidar o Bot",
      step2: "Escolha o servidor onde deseja instalar o bot.",
      step3: "Aceite as permissões solicitadas pelo bot.",
      step4Initial: "Clique em",
      step4Strong: "Autorizar",
    },
    warning: {
      title: "⚠️ Atenção:",
      textInital: "Certifique-se de estar conectado com uma conta que tenha permissões de",
      textStrong: "Administrador",
      textFinal: "no servidor. Caso contrário, o bot não poderá ser adicionado corretamente",
    },
  },
  docsChannels: {
    title: "📢 Canais",
    descriptionInitial: "O bot cria automaticamente os canais e categorias necessários após o comando",
    descriptionFinal: ". Abaixo estão os canais e suas funções.",
    subTitle: "Canais de Texto e Voz",
    categoryText: "Categorias",
    channels: [
      {
        name: "📍・criar-evento",
        desc: "Canal onde aparece o embed de criação de evento e também onde o botão para iniciar um novo evento é exibido para interação.",
      },
      {
        name: "🎮・participar-evento",
        desc: "Onde o bot publica os eventos criados e os botões para administração do evento(participar, iniciar, excluir, finalizar).",
      },
      {
        name: "💰・financeiro",
        desc: "Transações da guild e notificações do bot aparecem aqui.",
      },
      {
        name: "📊・verificar-saldo",
        desc: "Canal para membros consultarem saldos individuais e da guild.",
      },
      {
        name: "📄・logs",
        desc: "Erros, avisos e tentativas inválidas são mostradas aqui.",
      },
      {
        name: "🎙️・aguardando conteúdo",
        desc: "Sala de voz onde os jogadores aguardam eventos ou conversam.",
      },
    ],
    ChannelCard1Title: "📂 Eventos Iniciados",
    ChannelCard1Desc: "Categoria onde o bot cria as salas de voz para eventos em andamento.",
    ChannelCard2Title: "📦 Eventos Finalizados",
    ChannelCard2Desc: "Categoria onde as salas de eventos são movidas após o encerramento.",
  },
  docsBalanceChannel: {
    title: "💰 Gerenciar Saldo",
    description:
      "Comandos para consultar e administrar o saldo de membros e da guild. Alguns comandos são restritos administradores.",
    commands: {
      command1: {
        name: "/meu-saldo",
        description: "Consulta seu saldo pessoal atual.",
      },
      command2: {
        name: "/saldos",
        description: "Exibe o saldo de todos os membros da guild.",
      },
      command3: {
        name: "/saldo-membro",
        description: "Consulta o saldo de um membro específico.",
      },
      command4: {
        name: "/saldo-guild",
        description: "Verifica o saldo total da guild.",
      },
    },
  },
  docsEventChannel: {
    title: "🌟 Comandos de Eventos",
    description:
      "Estes comandos são utilizados para gerenciar eventos e a participação dos membros. Alguns comandos são restritos a administradores e responsáveis por operações críticas.",
    commands: {
      command1: {
        name: "/vendedor",
        description: "Adiciona um vendedor ao evento atual.",
      },
      command2: {
        name: "/simular-evento",
        description: "Simula a divisão de lucros do evento entre os participantes.",
      },
      command3: {
        name: "/atualizar-participacao",
        description: "Altera a porcentagem de participação de um jogador.",
      },
      command4: {
        name: "/atualizar-taxa-vendedor",
        description: "Ajusta a taxa paga aos vendedores.",
      },
      command5: {
        name: "/atualizar-taxa-guild",
        description: "Ajusta a taxa paga à guild.",
      },
      command6: {
        name: "/depositar-evento",
        description: "Deposita os valores do evento no saldo dos participantes.",
      },
      command7: {
        name: "/arquivar-evento",
        description: "Arquiva o evento e envia um resumo no canal financeiro.",
      },
    },
  },
  docsTransactionChannel: {
    title: "💳 Transações Financeiras",
    descriptionInitial: "Comandos para movimentação de saldo, tanto pessoal quanto da guild. Comandos marcados como",
    descriptionFinal: " são restritos.",
    commands: {
      command1: {
        name: "/depositar-guild",
        description: "Adiciona saldo ao caixa da guild.",
      },
      command2: {
        name: "/depositar-membro",
        description: "Adiciona saldo à conta de um membro.",
      },
      command3: {
        name: "/sacar-guild",
        description: "Retira saldo do caixa da guild.",
      },
      command4: {
        name: "/pagar-membro",
        description: "Paga um membro utilizando saldo da guild.",
      },
      command5: {
        name: "/confiscar-saldo",
        description: "Remove saldo de um membro e transfere para a guild.",
      },
      command6: {
        name: "/transferir-saldo",
        description: "Transfere saldo da sua conta para outro membro.",
      },
    },
  },
  docsLanguage: {
    title: "🌐 Mudar Idioma",
    subTitle: "Idioma Geral do Servidor",
    descriptionInitial: "Para mudar o idioma principal do bot em todo o servidor, utilize o comando",
    descriptionFinal: "Esse comando define o idioma das mensagens globais.",
    requirementsStrong: "Requisito:",
    requirementsText: "apenas usuários com permissão de",
    requirementsTextFinal: "podem utilizar este comando.",
    userLanguageTitle: "Idioma do Mercado (Usuário)",
    userLanguageDescriptionInitial:
      "Para mudar o idioma apenas das mensagens relacionadas ao sistema de preços do mercado, use",
    userLanguageDescriptionFinal: ". Essa mudança é pessoal e só afeta o usuário que executa o comando.",
    userLanguageRequirementsStrong: "Disponível para:",
    userLanguageRequirementsText: "todos os membros do servidor.",
  },
  docsMarketPage: {
    title: "💰 Consultar Preços de Mercado",
    descriptionInitial: "O bot permite consultar os preços dos itens do mercado usando o comando",
    descriptionCode: "/preco",
    descriptionFinal: ". Esse comando busca os valores em tempo real com base nos filtros aplicados.",
    optionalFields: {
      itemStrong: "Item:",
      itemDesc: "Nome do item que deseja pesquisar.",
      tierStrong: "Tier (opcional):",
      tierDesc: "Você pode especificar o nível do item (ex: T4, T6...).",
      cityStrong: "Cidade (opcional):",
      cityDesc: "Escolha a cidade onde deseja consultar o preço.",
      serverStrong: "Servidor (opcional):",
      serverDesc: "Selecione o servidor para resultados da sua região.",
    },
    tipsInitial: "Para visualizar os campos opcionais ao digitar o comando, pressione",
    tipsMid: "após escrever",
    tipsFinal: ". Isso abrirá todos os campos disponíveis para preenchimento.",
    example: {
      text: "Exemplo:",
      code: "/preco casaco de mercenário",
    },
    changeLanguageTitle: "🌐 Alterar idioma do mercado",
    changeLanguageDescriptionInitial: "Use o comando",
    changeLanguageDescriptionFinal:
      "para alterar o idioma da resposta do mercado individualmente. Esse comando afeta somente o idioma da consulta de preços e pode ser usado por qualquer usuário.",
  },
  docsSetup: {
    title: "✨ Setup Eventos",
    descriptionInitial: "Para configurar o bot de eventos, use o comando",
    descriptionMid: "e escolha o seu idioma. Ele criará automaticamente os",
    channelsText: "canais",
    descriptionFinal:
      "e permissões necessários para o funcionamento dos eventos. Atualmente o bot tem suporte para os seguintes idiomas: ",
    ptText: "Português",
    and: "e",
    enText: "Inglês",
    sulTitleInital: "⚙️ O que o ",
    sulTitleMid: " faz?",
    listItems: {
      item1: "Cria canais de texto organizados para a operação do bot.",
      item2: "Define permissões padrão para os canais criados.",
      item3: "Cria automaticamente um cargo especial para gerenciar eventos.",
    },
    createdRoleTitle: "🎖️ Cargo Criado",
    createdRoleDesc: "O comando",
    createdRoleDescMid: "criará o seguinte cargo no seu servidor:",
    roleName: "Albion Event Bot Manager",
    roleDesc: "Usuários com esse cargo terão acesso total às funções de gerenciamento de eventos.",
    importantTitle: "⚠️ Importante:",
    importantDesc:
      "Não modifique manualmente os canais e cargos criados pelo setup, para evitar conflitos com os comandos do bot.",
  },
  docsCreateEvent: {
    title: "⚔️ Criar Evento",
    descriptionInitial: "Para iniciar um evento, acesse o canal",
    descriptionInitalStrong: "#criar-evento",
    descriptionMid: "que foi automaticamente criado pelo bot durante o",
    descriptionMid2: ". Nesse canal, haverá um",
    descriptionFinal: "com as informações do evento e um botão para criá-lo.",
    embedTitle: "📦 Criar Evento — Albion Event Bot V1.0",
    embedDescription: "Reaja com o emoji ⚔️ para criar um evento",
    embedFields: {
      guildTax: "🧾 Taxa da guild:",
      sellerTax: "💸 Taxa do vendedor:",
      expiration: "⌛ Expiração do bot:",
      expirationValue: "tempo indeterminado",
    },
    guildTaxStrong: "Taxa da Guild",
    and: "e",
    sellerTaxStrong: "Taxa do Vendedor",
    taxDescription: "são valores que serão distribuídos depois da finalização do evento.",
    the: "A",
    guildTaxDesc: "é depositada diretamente no saldo da guild.",
    sellerTaxDesc: "é adicionada ao saldo do próprio vendedor do evento.",
    commandsTitle: "Essas taxas podem ser ajustadas pelos comandos:",
    updateGuildFeeCommand: "/atualizar-taxa-guild",
    updateSellerFeeCommand: "/atualizar-taxa-vendedor",
    expirationDescInitital: "A expiração do bot atualmente é",
    expirationDescStrong: "tempo indeterminado",
    expirationDescFinal: ", pois o bot é completamente gratuito.",
    eventDescriptionInitial: "Para criar o",
    eventDescriptionStrong: "evento",
    eventDescriptionFinal: ", basta clicar no botão",
    eventButton: "⚔️ Criar Evento",
    createdEventDescriptionInitial: " O evento será criado automaticamente no canal",
    createdEventDescriptionStrong: "#participar-evento",
    createdEventDescriptionFinal: ", onde irá conter as seguintes funcionalidades:",
    links: {
      ParticipateEvent: "Participar Evento",
      StartEvent: "Iniciar Evento",
      CancelEvent: "Cancelar Evento",
      FinishEvent: "Finalizar Evento",
    },
  },
  docsCancelEvent: {
    title: "🛑 Cancelar Evento",
    descriptionInitial: "Caso o evento precise ser encerrado por algum motivo,ele pode ser",
    descriptionStrong: "cancelado",
    descriptionFinal: "a qualquer momento.",
    cancelDescriptionInitial: "Para cancelar o evento, basta reagir ao emoji",
    cancelDescriptionFinal: "no embed que foi gerado no canal do evento.",
    cancelImageAlt: "Participar do Evento",
    warning: {
      text1inital: "📌 Somente o criador do evento ou membros com o cargo",
      text1Strong: "Albion Event Bot Manager",
      text1Final: "podem cancelar o evento.",
      text2: "🔄 Todos os participantes serão automaticamente movidos para o canal de voz",
      text2Strong: "#aguardando-conteúdo",
      text3: "🗑️ A sala de voz e a sala de texto do evento serão excluídas imediatamente após o cancelamento.",
      text4:
        "Essa ação é irreversível, então tenha certeza antes de cancelar o evento. Nenhum dado será registrado ou arquivado após o cancelamento.",
    },
  },
  docsFinishEvent: {
    title: "⏸ Finalizar Evento",
    descriptionInitial:
      " Após o evento ter sido iniciado, o emoji ⏸ ficará disponível no embed do canal do evento. Apenas o criador do evento ou usuários com o cargo",
    descriptionFinal: "poderão finalizar o evento.",
    finishText: "Para finalizar, basta reagir ao emoji ⏸. Isso encerrará oficialmente o evento.",
    warning: {
      text1: "📌 Somente o criador do evento ou membros com o cargo",
      text1Final: "podem finalizar o evento.",
      text2: "🎯 Todos os participantes serão automaticamente movidos para o canal de voz",
      text2Strong: "#aguardando-conteúdo",
      text3: "📁 Um novo canal de texto será criado com o nome do evento, dentro da categoria",
      text3Strong: "Eventos Finalizados",
      text4: "📊 Nesse canal, será exibido um embed com instruções e ferramentas para",
      text4Strong: "simular a divisão dos lucros",
      text4Final: "entre os participantes.",
    },
    finishDescription:
      "Esse processo garante que os dados do evento fiquem registrados e disponíveis para consulta e finalização dos pagamentos.",
  },
  docsParticipateEvent: {
    title: "🚀 Participar do Evento",
    descriptionInitial: "Após o evento ser criado, ele será exibido no canal",
    descriptionStrong: "#participar-evento",
    descriptionMid: "com um",
    descriptionFinal: "contedo as informações do evento atual.",
    participateText: "Para entrar na lista de participantes, basta",
    participateTextStrong: "clicar na reação 🚀",
    participateTextFinal: "logo abaixo do embed.",
    participateImageAlt: "Participar do Evento",
    participateWarning: {
      text1: "✅ O seu nome será adicionado automaticamente à lista de participantes do evento.",
      text2: "📝 Você poderá ver sua participação no embed em tempo real.",
    },
    voiceChannelWarning: {
      text: "⚠️ Atenção: É obrigatório estar conectado em um canal de voz para participar do evento.",
      textFinal:
        "Caso você não esteja em um canal de voz, o bot não permitirá sua entrada no evento. O canal de voz ajuda o bot a organizar e validar a presença dos participantes de forma eficiente.",
    },
    leaveEventWarning: {
      text: "Para sair do evento basta apenas sair do canal de voz do evento, você será removido automaticamente da lista de participantes.",
    },
  },
  docsStartEvent: {
    title: "🏁 Começar o Evento",
    descriptionInitial: "Após todos os participantes entrarem no evento, é hora de",
    descriptionStrong: "iniciar o evento",
    descriptionFinal: ". Esse passo começa oficialmente a contagem de tempo para cada jogador.",
    startText: "Para começar o evento, basta",
    startTextStrong: "reagir ao emoji 🏁",
    startTextFinal: "no embed que foi gerado no canal",
    startTextFinalStrong: "#participar-evento",
    startImageAlt: "Participar do Evento",
    warning: {
      text1: "📌 Somente o criador do evento ou membros com o cargo",
      text1Final: "podem iniciar o evento.",
      text2: "⏱️ Após iniciar, o tempo dos participantes começa a ser contado automaticamente.",
    },
    startFinalDescription:
      "Lembrando que o participante pode sair do evento a qualquer momento e voltar quando quiser — o tempo de participação é contabilizado apenas enquanto ele estiver ativo no evento.",
  },
  navBar: {
    home: "Home",
    docs: "Documentação",
    dashboard: "Painel",
    support: "Suporte",
    contribution: "Fazer Doação",
    terms: "Termos de Serviço",
    privacy: "Política de Privacidade",
  },
  footer: {
    rights: "© 2025 Albion Event Bot. Todos os direitos reservados.",
    madeWithLove: "Feito com ❤️ pela equipe de desenvolvimento.",
    thanksMessage: "Obrigado por usar o Albion Event Bot! Sua jornada em Albion Online fica mais fácil conosco.",
  },
  SEO: {
    home: {
      title: "Albion Event Bot - Loot Split & Market Price",
      description:
        "Bot gratuito para Albion Online com funções de Loot Split automático, verificação de preços do mercado e alertas de eventos. Otimize seu jogo com facilidade!",
      keywords: [
        "Albion Online bot",
        "Bot para Albion",
        "Loot Split Albion",
        "Mercado Albion Online",
        "Bot Discord Albion",
        "Albion Online ferramentas",
        "Albion Event Bot",
        "Albion Market Price",
      ],
    },
  },
  privacyPolicy: {
    title: "Política de Privacidade",
    infoCollectedTitle: "Informações Coletadas",
    infoCollectedText:
      "Para oferecer uma experiência personalizada, coletamos apenas dados essenciais, como o ID do servidor Discord, idioma preferido e a seleção do servidor do jogo (West ou East). Essas informações são usadas exclusivamente para otimizar o funcionamento do bot.",

    dataUseTitle: "Uso dos Dados",
    dataUseText:
      "O bot não acessa mensagens privadas nem age em nome dos usuários. Seu uso é restrito às funcionalidades autorizadas, e qualquer atividade mal-intencionada ou uso indevido é proibido e passível de bloqueio.",

    storageTitle: "Armazenamento e Segurança",
    storageText:
      "Os dados coletados são mantidos de forma segura e utilizados exclusivamente para garantir o funcionamento do bot e a prestação dos serviços oferecidos, como consulta de preços e controle de eventos.",

    userRightsTitle: "Direitos do Usuário",
    userRightsText:
      "Você tem o direito de solicitar a remoção dos seus dados a qualquer momento. Os dados serão mantidos enquanto o bot estiver ativo no servidor, garantindo sempre a segurança e privacidade das informações.",

    updatesTitle: "Atualizações na Política",
    updatesText:
      "Caso haja qualquer mudança nesta política, informaremos com antecedência por meio do nosso site e solicitaremos seu consentimento para continuar utilizando nossos serviços.",

    disclaimerTitle: "Isenção de Responsabilidade",
    disclaimerText:
      "Este bot utiliza dados da API pública Albion-data-project, mas não é afiliado ou endossado pelo Albion Online ou seus desenvolvedores.",
  },
  terms: {
    title: "Termos de Serviço",
    permissionsTitle: "Autorização de Permissões",
    permissionsContent:
      "Ao integrar o Albion Event Bot ao seu servidor Discord, você está permitindo o uso de permissões como: leitura e envio de mensagens, moderação de conteúdo, inserção de links e arquivos, acesso ao histórico de conversas, uso de emojis externos e comandos de interação.",

    restrictionsTitle: "Limitações de Uso",
    restrictionsContent:
      "O bot não tem acesso a mensagens diretas nem realiza ações em nome dos usuários. Qualquer tentativa de utilização para práticas abusivas, automatizações não autorizadas ou atividades que infrinjam as regras da plataforma não será tolerada.",

    acceptanceTitle: "Concordância com os Termos",
    acceptanceContent:
      "Ao utilizar o Albion Event Bot, você reconhece e aceita estas condições de uso. Caso não esteja de acordo, recomendamos não utilizar o bot em seu servidor.",

    contactTitle: "Fale Conosco",
    contactContent:
      "Se você tiver dúvidas, sugestões ou precisar de suporte, entre em contato através do e-mail celomice@gmail.com ou pelo Discord em #celoaraujo.",
  },
};
