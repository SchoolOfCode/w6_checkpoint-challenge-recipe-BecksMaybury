const YOUR_APP_ID = "8840ad65"
const YOUR_APP_KEY = "d1dcc8017a2e89c63e8563b289086fdc"
// const requestUrl = `https://api.edamam.com/search?qkale&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
// const requestUrl = `https://api.edamam.com/search?q  foodToSearch.value &app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
// request needs q = string (query text)
// const requestUrl = `https://api.edamam.com/search?qkale&app_id=8840ad65&app_key=d1dcc8017a2e89c63e8563b289086fdc`

console.log("recipe hunting");

let foodToSearch = null;
let button = document.querySelector('#recipe-button');
let input = document.querySelector('#food-input');
button.addEventListener('click', createRecipeList);

// async function handleRecipeClick() {
  // let recipe = await fetchRecipe(foodToSearch);
  // let recipe = await createRecipeList();
  // let linkLabel = item.recipe.label;
  // console.log(recipe.label);
  // let recipeLink = document.querySelector('#recipe-label');
  // recipeLink.innerHTML = linkLabel;
  // let linkURL = recipe.url;
  // console.log(recipe.url+"URL here");
  // console.log("hello");
  // recipeLink.setAttribute('href', linkURL);
// }
// async function returnSearchClick(){
// }

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

//--- write your code below ---

async function fetchRecipe(food) {
  let response = await fetch(`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
  let result = await response.json();
  let recipeList = await result.hits;
  // console.log(recipeList);
  return recipeList;
  //--- write your code above ---
}

let ulRecipeList = document.querySelector('#recipe-list');

async function createRecipeList() {
    let items = await fetchRecipe(foodToSearch);
    console.log(items);
    for (let i=0; i<items.length; i++){
      console.log(items[i].recipe.label);
      // create recipe section
      let liSection = document.createElement("section");
      liSection.classList.add("item-section");
      // create image
      let liItemImage = document.createElement("img");
      liItemImage.src = items[i].recipe.image;
      // create recipe details section
      let liSubSection = document.createElement("section");
      liSubSection.classList.add("item-details")
      // create recipe title
      let liItem = document.createElement("li");
      liItem.innerText = items[i].recipe.label;
      liItem.classList.add("item-header");
      liItem.id = i;
      console.log("list item added");
      // create show ingredients link
      let liItemIngredientsLink = document.createElement("a");
      liItemIngredientsLink.innerText = "show ingredients list";
      liItemIngredientsLink.classList.add ("inner-link");
      // create ingredients info
      let liItemIngredients = document.createElement("p");
      liItemIngredients.innerText = items[i].recipe.ingredientLines.toString();
      liItemIngredients.classList.add("hide-ingredients");
      // create show health labels link
      let liItemHealthInfoLink = document.createElement("a");
      liItemHealthInfoLink.innerText = "show health info";
      liItemHealthInfoLink.classList.add ("inner-link");
      liItemHealthInfoLink.href = "showItems()";
      // ISSUE HERE liItemHealthInfoLink.addEventListener('click', showItems);
      // create health labels info
      let liItemHealthInfo = document.createElement("p");
      liItemHealthInfo.innerText = `${Math.floor(items[i].recipe.calories)} calories; ${items[i].recipe.healthLabels.toString()}`;
      liItemHealthInfo.classList.add("hide-health-info");
      console.log(liItemHealthInfo);
      // create link to recipe
      let liItemLink = document.createElement("a");
      liItemLink.innerText = "click for full recipe";
      liItemLink.classList.add("outside-link");
      liItemLink.href=items[i].recipe.url;
      // add to DOM
      ulRecipeList.appendChild(liSection);
      liSection.appendChild(liItemImage);
      liSection.appendChild(liSubSection);
      liSubSection.appendChild(liItem);
      liSubSection.appendChild(liItemIngredientsLink);
      liSubSection.appendChild(liItemIngredients);
      liSubSection.appendChild(liItemHealthInfoLink);
      liSubSection.appendChild(liItemHealthInfo);
      liSubSection.appendChild(liItemLink);
    }
  }
  // ISSUE HERE
  // function showItems(){
  // liItemHealthInfo.classList.remove;
  // liItemHealthInfoLink.innerText = "hide health info"
  // }