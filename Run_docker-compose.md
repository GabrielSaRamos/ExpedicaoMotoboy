# Documentação de Deploy e Gerenciamento da Aplicação

Este documento descreve os passos para realizar o deploy, iniciar, parar e acessar a aplicação `reactapp` em um servidor remoto utilizando SSH e Docker Compose.

### 1. Upload dos Arquivos da Aplicação para o Servidor

Para transferir os arquivos da sua aplicação do seu diretório local para o servidor remoto, utilize o comando `scp` (Secure Copy Protocol).

*   **Comando:**
    ```bash
    scp -r C:\Users\seuUsuario\Documents\reactapp seuUsuario@10.50.1.252:/home/seuUsuario/Documentos/
    ```
*   **Descrição:**
    *   `scp`: Comando para cópia segura.
    *   `-r`: Opção para copiar diretórios recursivamente.
    *   `C:\Users\seuUsuario\Documents\reactapp`: Caminho completo para o diretório da sua aplicação no seu computador local. Substitua `seuUsuario` e o caminho conforme necessário.
    *   `seuUsuario@10.50.1.252`: Seu nome de usuário no servidor remoto e o endereço IP do servidor. Substitua pelos seus dados.
    *   `:/home/seuUsuario/Documentos/`: Caminho no servidor remoto onde os arquivos serão copiados. O `:` após o endereço do servidor é crucial. Substitua `seuUsuario` e o caminho conforme necessário.

### 2. Acesso ao Servidor via SSH

Após o upload dos arquivos, conecte-se ao servidor remoto utilizando SSH (Secure Shell).

*   **Comando:**
    ```bash
    ssh seuUsuario@10.50.1.252
    ```
*   **Descrição:**
    *   `ssh`: Comando para iniciar uma sessão SSH.
    *   `seuUsuario@10.50.1.252`: Seu nome de usuário no servidor remoto e o endereço IP do servidor.

### 3. Iniciar a Aplicação com Docker Compose

Uma vez conectado ao servidor, navegue até o diretório da aplicação e utilize os comandos do Docker Compose para construir e iniciar os containers.

*   **Navegar até o diretório da aplicação:**
    ```bash
    cd Documentos
    cd reactapp
    ```
    *   *Nota: Ajuste os comandos `cd` conforme o caminho exato onde você copiou a aplicação no servidor (definido no passo 1).*

*   **Construir a imagem da aplicação (se necessário ou após alterações):**
    ```bash
    sudo docker compose build reactapp
    ```
    *   *Nota: Substitua `reactapp` pelo nome exato do serviço definido no seu arquivo `docker-compose.yml`.*

*   **Iniciar a aplicação:**
    *   Para iniciar e ver os logs no terminal:
        ```bash
        sudo docker compose up
        ```
    *   Para iniciar em modo "detached" (em segundo plano, sem logs no terminal):
        ```bash
        sudo docker compose up -d
        ```

### 4. Parar a Aplicação

Para parar todos os containers definidos no seu arquivo `docker-compose.yml` e remover as redes criadas:

*   **Comando:**
    ```bash
    sudo docker compose down
    ```

### 5. Acessar a Aplicação

Após iniciar a aplicação com `sudo docker compose up`, ela estará acessível no navegador através do endereço IP do servidor e da porta configurada.

*   **Endereço de Acesso:**
    `http://10.50.1.252:3001`
    *   *Nota: Certifique-se de que a porta `3001` (ou a porta que você configurou no seu `docker-compose.yml` para o serviço `reactapp`) está corretamente mapeada e que não há firewalls bloqueando o acesso a esta porta no servidor.*