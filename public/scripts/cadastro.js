//CADASTRO UF

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(
    (res) =>
      res
        .json() //Forma reduzida, várias outras opções que podem ser escritas
        .then((states) => {
          for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
          }
        })
  );
}

populateUFs(); //executar

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]'); // Buscar cidade
  const stateInput = document.querySelector('input[name=state');

  const ufValue = event.target.value; // mostra valor do estado

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text; //busca o estado pelo número e retorna o nome dele na back

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = '<option value=>Selecione a Cidade</option>'; //deixa o campo cidade limpo para o campo estado
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false; // habilita o campo desabilitado no html
    });
}

document.querySelector('select[name=uf]').addEventListener('change', getCities);

//ITENS DE COLETA

const itemsToCollect = document.querySelectorAll('.items-grid li'); //pegar todos os li's
// add o ouvidor de eventos (click)
for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}
//atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector('input[name=items]');
// quais são os itens selecionados
let selectedItems = []; //coleção de dados, array dos itens

function handleSelectedItem(event) {
  const itemLi = event.target;
  // adicionar ou remover uma classe com toggle: se já houver, remove. se não houver, adiciona.
  itemLi.classList.toggle('selected');

  const itemId = itemLi.dataset.id;

  //verificar se existem itens selecionados
  // SE SIM: pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex(function (item) {
    const itemFound = item == itemId;
    return itemFound;
  });
  // se já estiver selecionado, tirar da seleção
  if (alreadySelected >= 0) {
    //se >= 0 = true
    //tirar da seleção
    const filteredItems = selectedItems.filter(function (item) {
      //quando o retorno for false vai ser removido do array
      const itemIsDifferent = item != itemId; //false
      return itemIsDifferent;
    });

    selectedItems = filteredItems; //dando um novo valor a let

    //SE NÃO: se nao tiver itens selecionados, adicionar à seleção
  } else {
    selectedItems.push(itemId);
  }
  //const collectedItems = document.querySelector("input[name=items]") -  comando pra atualizar o campo escondido com os itens selecionados, joguei lá pra cima
  collectedItems.value = selectedItems; //atualizar sempre
}
