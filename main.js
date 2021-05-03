const YOUR_APP_ID = "8840ad65"
const YOUR_APP_KEY = "d1dcc8017a2e89c63e8563b289086fdc"
// const requestUrl = `https://api.edamam.com/search?qkale&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
// const requestUrl = `https://api.edamam.com/search?q  foodToSearch.value &app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
// request needs q = string (query text)
// const requestUrl = `https://api.edamam.com/search?qkale&app_id=8840ad65&app_key=d1dcc8017a2e89c63e8563b289086fdc`

console.log("recipe hunting");

let foodToSearch = null;

function handleRecipeClick() {
  fetchRecipe(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

async function fetchRecipe(food) {
  //--- write your code below ---
    let response = await fetch(`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
    let result = await response.json();
    console.log(result);
    return result;
  //--- write your code above ---
}
