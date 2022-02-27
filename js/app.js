//spinner
const spinner = (progress) => {
  document.getElementById("spinner").style.display = progress;
}
//load data
const loadCocktail = async () =>{
    //get input field
    const input = document.getElementById("searchField");
    const inputValue = input.value;
    const msg = document.getElementById("error_msg");
    // msg.style.textAlign = "center";
    //error handling
    if(inputValue === "" || !isNaN(inputValue)){
        input.value = "";
        msg.innerHTML = " ! Please enter a juicy name"
    }
  else{
        //clear input value
        input.value = "";
        msg.innerHTML = "";
        //load data
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => displayCocktail(data.drinks))
        spinner("block")
  }
}
//display Cocktail
const displayCocktail = (cocktails) =>{
    const display = document.getElementById("display_cocktail");
    const msg = document.getElementById("error_msg");
    display.textContent = "";
    if(cocktails === null){
        msg.innerHTML = " ! Please enter a valid name"
    }
else{
    //   console.log(cocktails)
cocktails.forEach(item => {
    msg.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("cocktails");
    div.innerHTML = `
    <img src="${item.strDrinkThumb}">
    <h3>Title : ${item.strCategory}</h3>
    <h3> Id : ${item.idDrink}</h3>
    <p>Alcoholic: ${item.strAlcoholic}</p>
    <p>Alcoholic: ${item.strInstructions.slice(0, 50)}</p>
   <button onclick="productDetails('${item.idDrink}')">Details</button>
    `
    display.appendChild(div);
});
spinner("none")
}
}

// loadSingleProduct
const productDetails = (single) =>{
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${single}`;
  fetch(url)
  .then(res =>res.json())
  .then(data =>displaySingleProduct(data.drinks[0]))
}

//display single product
const displaySingleProduct = (details) =>{
    const singleDisplay = document.getElementById("single_details");
    singleDisplay.textContent = "";
    const div = document.createElement("div");
    div.classList.add("productDetails");
    div.innerHTML = `
    <img src="${details.strDrinkThumb}">
    <h3>Title : ${details.strCategory}</h3>
    <h3> Id : ${details.idDrink}</h3>
    <p>Alcoholic: ${details.strAlcoholic}</p> 
    <p>Alcoholic: ${details.strInstructions.slice(0, 150)}</p>
    `
    singleDisplay.appendChild(div);
}