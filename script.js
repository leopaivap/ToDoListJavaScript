 // Crie uma instância da fila
 let minhaLista = new LinkedList();
//--------------------------------------------------------------------------------------------
 // Função para adicionar um elemento 
 function adicionarElemento() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();
    const indice = document.getElementById("txtIndice").value.trim();
    
    if (descricao === "" || prioridade === "" || indice === "") {
      alert("Preencha todos os campos antes de adicionar à fila!");
      return;
    }

    const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
    minhaLista.addAtIndex(indice, novaTarefa)
    limpaCampos();
    mostrarLista();
 }
//--------------------------------------------------------------------------------------------
// Função para adicionar um elemento ordenado
  function adicionarOrdenado() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

    if (descricao === "" || prioridade === "") {
      alert("Preencha todos os campos antes de adicionar à fila!");
      return;
    }
     
    const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
    let indice = 0;
    let novaPrioridade = parseInt(novaTarefa.prioridade);
    let retorno = false;
    if(minhaLista.isEmpty()){
      retorno = minhaLista.addFirst(novaTarefa);
      limpaCampos();
    }  
    else if(novaPrioridade >= minhaLista.last().prioridade ){
      retorno = minhaLista.addLast(novaTarefa);
      limpaCampos();
    }
    else if(novaPrioridade < minhaLista.first().prioridade  ){
      retorno = minhaLista.addFirst(novaTarefa);
      limpaCampos();
    } 
    else{
      minhaLista.forEach((item) => {
        if(novaPrioridade >= item.prioridade)
          indice++;
      });
      minhaLista.addAtIndex(indice, novaTarefa);

    limpaCampos();
      // implementar a insercao ordenada de acordo com a prioridade
    }
    mostrarLista();
   
 }
//--------------------------------------------------------------------------------------------
 function mostraPrimeiro(){
    if(!minhaLista.isEmpty())
      alert("Primeiro da Fila: \n" + minhaLista.first());
    else
      alert("Lista Vazia!");
 }
//--------------------------------------------------------------------------------------------
 // Função para remover o primeiro elemento da fila
 function removerElemento() {
    if(minhaLista.isEmpty()) 
      alert("Lista vazia!");
    else{  
      retorno = minhaLista.deleteFirst();
      mostrarMensagemRemocao(retorno);
      mostrarLista();
      // remover e mostrar mensagem de remocao
    }
 }
//--------------------------------------------------------------------------------------------
function removeAtIndex(){
 
}
//--------------------------------------------------------------------------------------------
function limpaCampos(){
  txtnovaTarefa.value = "";
  txtnovaPrioridade.value = "";
  txtIndice.value = "";
}
//--------------------------------------------------------------------------------------------
function maisTempo() {
  if(minhaLista.isEmpty()){
    alert("Lista vazia!");
    return;
  }

  let maiorHoraAtual = 0, segundoAtual = 0;
  const novaTarefa = new Tarefa(null, null, null, null);

  minhaLista.forEach(item => {
    const diferencaHoras = calcularDiferencaHoras(item.hora, obterHoraAtual());
    const [hora, minuto, segundo] = diferencaHoras.split(':').map(Number);
    console.log(`${hora}:${minuto}:${segundo}`); //debug
    
    const diferencaDias = calcularDiferencaDias(item.data, obterDataAtual());
    segundoAtual = (diferencaDias * 86400 + (hora * 3600) + (minuto * 60) + segundo);

    if (segundoAtual > maiorHoraAtual) {
      maiorHoraAtual = segundoAtual;
      novaTarefa.descricao = item.descricao;
      novaTarefa.prioridade = item.prioridade;
      novaTarefa.hora = item.hora;
      novaTarefa.data = item.data;
    }
  });
  let tempo = calcularDiferencaHoras(novaTarefa.hora, obterHoraAtual());
  const [hora, minuto, segundo] = tempo.split(':').map(Number);
  //alert(`Tarefa mais antiga:\n${novaTarefa}\n\nTempo esperado:\n ${calcularDiferencaDias(novaTarefa.data, obterDataAtual())} dias, ${hora} horas, ${minuto} minutos e ${segundo} segundos`);
  
  const mensagem = document.getElementById("mensagem-remocao");
  mensagem.innerHTML = `Tarefa mais antiga:<br>${novaTarefa}<br>Tempo esperado: ${calcularDiferencaDias(novaTarefa.data, obterDataAtual())} dias, ${hora} horas, ${minuto} minutos e ${segundo} segundos`;
  mensagem.style.display = "block";
}

//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada) {
    const mensagem = document.getElementById("mensagem-remocao");
    // apresentar a mensagem de remoção com dias e horas
    let diferencaHoras = (calcularDiferencaHoras(tarefaRealizada.hora, obterHoraAtual()));
    const [hora, minuto, segundo] = diferencaHoras.split(':').map(Number);
    mensagem.innerHTML ="Tarefa "+ tarefaRealizada.descricao + ", realizada em: " + calcularDiferencaDias(tarefaRealizada.data, obterDataAtual()) + " dias, " + hora + " horas, " + minuto + " minutos e " + segundo + " segundos";
    mensagem.style.display = "block";

  }
//-------------------------------------------------------------------------------------------- 
// Função para atualizar a exibição da fila
 function mostrarLista() {
   const listaElemento = document.getElementById("list_listadeTarefas");
   const listaTarefa = document.getElementById("lblmostraTarefas");
   if (minhaLista.isEmpty()) {
      listaTarefa.innerHTML = "Lista vazia!";
      listaElemento.innerHTML = "";
   } else {
       listaTarefa.innerHTML = "Tarefas Pendentes:";
        listaElemento.innerHTML = "";
        minhaLista.forEach((item) => {
          const li = document.createElement("li");
          li.innerText = item.toString();
          listaElemento.appendChild(li);
        }); // for each percorre cada elemento da lista encadeada
   }
 }
//--------------------------------------------------------------------------------------------
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaDias(dataInicial, dataFinal) {
  // Converte as datas em milissegundos
  const msPorDia = 24 * 60 * 60 * 1000; // Quantidade de milissegundos em um dia
  const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
  const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
  // Cria objetos Date com as datas fornecidas
  const dataIni = new Date(anoIni, mesIni - 1, diaIni); // Subtrai 1 do mês porque o mês inicia do zero
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaMs = dataFim - dataIni;
  // Converte a diferença de milissegundos para dias e arredonda para baixo
  const diferencaDias = Math.floor(diferencaMs / msPorDia);
  return diferencaDias;
}
//--------------------------------------------------------------------------------------------
