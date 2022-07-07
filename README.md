# DesafioTradeMaster
Criar um sistema voltado para uma loja de itens para entrenimentos

Essa API também está disponível online no servidor do [Heroku](https://desafiotrademaster.herokuapp.com/api-docs/)


# Como baixar o projeto?
  1 - Clicar na opção code em verde dessa tela, fica localizada no canto superior direito, na opção copiar o link exibido.
  
  2 - Em algum diretório do seu computador abrir o CMD executar o comando git clone URL_COPIADA
  
# Como Iniciar seu projeto
  1 - Entrar na pasta onde realizado o clone do projeto
  
## Executar o comando npm install
  1 - Ira instalar todas as dependencias do seu projeto.
     
## Instalação do MySQL Workbranch  
1 - Seguir o tutorial de intalação do MySQL  [Clique aqui](https://dicasdeprogramacao.com.br/como-instalar-o-mysql-no-windows/)

## Configurar arquivo .env
1 - No mesmo diretório onde localizado os arquivos packge.json criar um arquivo .env\
2 - Nesse arquivo informar os dados de conexão local do seu banco de dados.
### Exemplos:
  DB_HOST = "MEU_SERVIDOR"\
  DB_USER = "MEU_USARIO_DE_BANCO"\
  DB_PASS = "MINHA_SENHA_DE_ACESSO_AO_BANCO"\
  DB_SCHEMA = "MEU_BANCO_DE_DADOS"
  
## Criar as tabelas do banco de dados
   No terminal do VSCode ou CMD de sua preferência executar o comando.
   
   ### npm run migrations
    será criado as tabelas e realizado o input necessário na tabela.
         
## Rodar a aplicação local
  ### npm run dev
Sua aplicação estará disponível no caminho [http://localhost:3003](http://localhost:3003)

## Swagger
O swagger estará disponível no caminho [http://localhost:3003/api-docs](http://localhost:3003/api-docs)\
documentação dos endpoints disponível
  
## Transpilasr seu projeto Typescript para NodeJs
  Executar o comando: 
  ### tsc
  
## Como realizar o test unitário
  Executara o comando:
  ### npm run test
  
  
