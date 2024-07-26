## Como rodar o projeto

### Pré-requisitos
- Docker
- Node 18.x

### Como rodar

1. Clone o projeto
2. Entre na pasta do projeto e rode o comando
```
docker-compose up -d
```
3. Rode as seeds do banco de dados
```
npm run seed
```
4. Acesse a aplicação web em `http://localhost:3000`

### Como funciona o fluxo de cálculo de rotas

#### Função getRoutes
1. Consultas ao Banco de Dados:
    - A função é assíncrona e faz duas consultas ao banco de dados:
      - A primeira consulta busca as coordenadas (latitude e longitude) dos clientes.
      - A segunda consulta busca as coordenadas da empresa.
    - O comando SQL utilizado converte as coordenadas armazenadas em um formato específico de banco de dados (provavelmente PostGIS) para latitude e longitude.
2. Processamento de Coordenadas:
    - Armazena as coordenadas da empresa em um objeto <strong>companyCoords</strong>.
    - Cria um array <strong>coordinates</strong> que contém as coordenadas dos clientes. A coordenada da empresa é adicionada no início desse array.
3. Solução do TSP:
    - A função tspSolver é chamada para calcular a rota que passa por todos os pontos, começando e terminando na empresa.
4. Retorno da Rota:
    - A rota calculada é retornada.
5. Tratamento de Erros:
    - Erros são capturados e logados, e então lançados novamente.

#### Função calculateDistance
1. Essa função auxilia no cálculo da distância euclidiana entre dois pontos, coord1 e coord2, que são arrays de números representando [latitude, longitude]. A fórmula utilizada é a tradicional para calcular distâncias em um plano cartesiano.

#### Função tspSolver
1. Inicialização:
    - Define o número de pontos (n), um array <strong>visited</strong> para marcar os pontos já visitados, e um array <strong>route</strong> para armazenar a rota.
    - Inicia a rota a partir do ponto de índice 0 (a empresa) e marca esse ponto como visitado.
2. Construção da Rota:
    - Enquanto todos os pontos não forem visitados, busca o ponto mais próximo (não visitado) do ponto atual.
    - Adiciona esse ponto à rota e o marca como visitado.
    - Atualiza o ponto atual para o ponto recém-visitado.
3. Fechamento do Ciclo:
    - Adiciona o ponto inicial (empresa) ao final da rota para fechar o ciclo.
4. Retorno:
    - A rota completa é retornada.

### Algoritmo de cálculo de rotas

```	ts
public async getRoutes(): Promise<any> {
    try {
      const clients = await database.raw(`
        SELECT 
          ST_X(coordinates::geometry) AS latitude,
          ST_Y(coordinates::geometry) AS longitude
        FROM clients
      `);
      const company = await database.raw(`
        SELECT 
          ST_X(coordinates::geometry) AS latitude,
          ST_Y(coordinates::geometry) AS longitude
        FROM company
      `);
      const companyCoords = {
        latitude: company.rows[0].latitude,
        longitude: company.rows[0].longitude
      };

      const coordinates = clients.rows.map((c: ClientsEntity) => [c.latitude, c.longitude]);
      coordinates.unshift([companyCoords.latitude, companyCoords.longitude]);

      const route = this.tspSolver(coordinates);

      return route;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private calculateDistance(coord1: number[], coord2: number[]): number {
    const dx = coord1[0] - coord2[0];
    const dy = coord1[1] - coord2[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  private tspSolver(points: number[][]): number[][] {
    const n = points.length;
    const visited = new Array(n).fill(false);
    // eslint-disable-next-line prefer-const
    let route: number[][] = [];
    let currentIndex = 0;
  
    route.push(points[currentIndex]);
    visited[currentIndex] = true;
  
    while (route.length < n) {
      let nearestDistance = Infinity;
      let nearestIndex = -1;
  
      for (let i = 0; i < n; i++) {
        if (!visited[i]) {
          const distance = this.calculateDistance(points[currentIndex], points[i]);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = i;
          }
        }
      }
  
      route.push(points[nearestIndex]);
      visited[nearestIndex] = true;
      currentIndex = nearestIndex;
    }
  
    // Volta para o ponto inicial
    route.push(points[0]);
  
    return route;
  }
```