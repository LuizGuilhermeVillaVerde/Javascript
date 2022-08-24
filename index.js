
//Define as margens do gráfico
const margin = {
  top: 30,
  right: 30,
  bottom: 70,
  left: 60
};
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;



//Anexo do SVG ao corpo do objeto

const svg = d3.select("#grafico")
  .append("svg")  //Grafico vetorial
    .attr("width", width + margin.left + margin.right) //Largura das margens
    .attr("height", height + margin.top + margin.bottom) //altura
    .append("g") // Grupo do gráfico para movimentações
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //Faz a transladação



    
  svg.append("text")  //label vertical
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -33)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Saldo de gols")


  
// Puxando json com os dados previamente alocados (analise dos dados)

d3.json("data.json", (data) => { //Carregada dados



  
  //Definindo e adicionando configurações do eixo X



  const x = d3.scaleBand() //Define o tamanho da barra, a distância entre elas
              .range([ 0, width ])
              .domain(data.map((({ ano }) => {   // Mapeamento do dado que está vindo, e retorna o ano
                                return ano; 
               })))
              .padding(0.2);   //largura das barras 

  
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")  //Transladação do eixo Y, jogando para baixo
    .call(d3.axisBottom(x))  //Criar o eixo x
    .selectAll("text")  //Adiciona texto no eixo
    


  //Definindo e adicionando eixo y

  const y = d3.scaleLinear()
    .domain([0, 80])
    .range([ height,0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  
  // Configurando o gráfico de barras, com retângulos
  svg.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", ({ ano }) => {
        return x(ano);
      })
      .attr("width", x.bandwidth()) //Retorna o valor de cada faixa que foi definido no scaleband
      .attr("height", () => { 
        return height - y(0); 
      })
      .attr("y", () => { 
        return y(0); 
      })
      .attr("fill", "#0B96D1");

  //Pequena animação
  svg.selectAll("rect")
    .transition() // Transição 
    .duration(800)
    .attr("y", ({ saldo }) => { 
      return y(saldo); 
    })
    .attr("height", ({ saldo }) => { 
      return height - y(saldo); 
    })
    .delay( (d,i ) => { 
      return i*300;
    })
})
