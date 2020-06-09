// () => {} -> é uma função anonima
// (res) => { return res.json()} || res => res.json() -> Todos os dois são uma função anonima que recebem um parametro e o retorna com um JSON

function populateUFs() 
{
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then( states => {

        for (const state of states)
        {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

function getCities(event) {
    
    const citySelect = document.querySelector("[name=city]")  // select [name=city]
    const stateInput = document.querySelector("[name=state]") // input [name=state]

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    const indexofSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexofSelectedState].text

    citySelect.innerHTML = "<option value>Selecione a cidade</option>" // limpa as opções da cidade antes de trocas o estado
    citySelect.disabled = true // trava o select da cidade

    fetch(url)
    .then(res => res.json() )
    .then( cities => {
        
        for (const city of cities)
        {
            citySelect.innerHTML += `<option value="${city.nome
            }">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
    
}

populateUFs() 

document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities )


// Itens de coleta
// pegar todos os li's
const itenstoCollect = document.querySelectorAll(".itens-grid li")

for (const item of itenstoCollect)
{
    item.addEventListener("click", handleSelectedItem)
}

let selectedItens = []

const coollectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event) {

    const itemLi = event.target

    // adicionar ou reomover uma classe com js

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID: ', itemId)

    // Verificar se existem items selecionados, se sim pegar os itens selecionados, se ja estiver selecionado retirar

    const alreadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    // console.log(alreadySelected != -1)

    if (alreadySelected >= 0)
    {
        // Tirar da seleção
        const filteredItens = selectedItens.filter(item => {
            const itemisDifferent = item != itemId
            return itemisDifferent
        })
        
        selectedItens = filteredItens
    } else
    { // A dicionar à seleção
        selectedItens.push(itemId)
    }

    // console.log('SelectedItens: ', selectedItens)

    //Atualizar o input hidden
    coollectedItems.value = selectedItens

}