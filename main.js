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
      let liItem = document.createElement("li");
      liItem.innerText = items[i].recipe.label;
      liItem.classList.add("item-header");
      liItem.id = i;
      console.log("list item added");
      let liItemLink = document.createElement("a");
      liItemLink.innerText = "click for full recipe";
      liItemLink.classList.add("outside-link");
      liItemLink.href=items[i].recipe.url;
      let liItemImage = document.createElement("img");
      liItemImage.src = items[i].recipe.image;
      ulRecipeList.appendChild(liItem);
      liItem.appendChild(liItemImage);
      liItem.appendChild(liItemLink);
    }
  }
  
  