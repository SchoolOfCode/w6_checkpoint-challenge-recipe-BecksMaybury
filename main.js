const YOUR_APP_ID = "8840ad65"
const YOUR_APP_KEY = "d1dcc8017a2e89c63e8563b289086fdc"

let foodToSearch = null;
let button = document.querySelector('#recipe-button');
let input = document.querySelector('#food-input');
button.addEventListener('click', createRecipeListing);
let vegetarianFilter = document.querySelector('#vegetarian');
vegetarianFilter.addEventListener ('change', addVegetarianFilter);

function addVegetarianFilter () {
  let vegetarian = null;
if (vegetarianFilter.checked === true){
  vegetarian = '&health=vegetarian';
}
console.log(vegetarian);
return vegetarian;
}

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
  const vegetarian = document.getElementById("vegetarian").checked
  const vegan = document.getElementById("vegan").checked
  const peanutFree = document.getElementById("peanut-free").checked
  const lowSugar = document.getElementById("low-sugar").checked
  const glutenFree = document.getElementById("gluten-free").checked
  let healthLabelFilter = "";
  if (vegetarian || vegan || peanutFree || lowSugar || glutenFree) {
    // healthLabelFilter = "&health=";
    if (vegetarian) {
      healthLabelFilter += "&health=vegetarian";
      }
    if (vegan) {
      healthLabelFilter += "&health=vegan";
      }
    if (peanutFree) {
      healthLabelFilter += "&health=peanut-free";
      }
    if (lowSugar) {
      healthLabelFilter += "&health=sugar-conscious";
      }
    if (glutenFree) {
      healthLabelFilter += "&health=gluten-free";
      }
    console.log(healthLabelFilter);
  }
  let response = await fetch(`https://api.edamam.com/search?q=${food}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&to=9&time=1%2B${healthLabelFilter}`);
  let result = await response.json();
  let recipeList = await result.hits;
  // console.log(recipeList);
  return recipeList;
  //--- write your code above ---
}

let ulRecipeList = document.querySelector('#recipe-list');

async function createRecipeListing() {
    ulRecipeList.innerHTML="";
    let items = await fetchRecipe(foodToSearch);
    console.log(items);
    for (let i=0; i<items.length; i++){
      // create recipe section
      let liSection = document.createElement("section");
      liSection.classList.add("item-section");
      // create image
      let liItemImage = document.createElement("img");
      liItemImage.src = items[i].recipe.image;
      // create source info
      let liItemSource = document.createElement("p");
      liItemSource.innerHTML = "By " + items[i].recipe.source;
      // create recipe details section
      let liSubSection = document.createElement("section");
      liSubSection.classList.add("item-details")
      // create recipe title
      let liItem = document.createElement("li");
      liItem.innerText = items[i].recipe.label;
      liItem.classList.add("item-header");
      liItem.id = i;
      // create servings info
      let liItemServings = document.createElement("span");
      liItemServings.innerText = "Serves: " + Math.floor(items[i].recipe.yield);
      // create calories info
      let liItemTotalCalories = (items[i].recipe.calories/items[i].recipe.yield);
      let liItemCalories = document.createElement("span");
      liItemCalories.innerText = "Calories per serving: "+ Math.floor(liItemTotalCalories);
      // create time info
      let liItemTime = document.createElement("span");
      liItemTime.innerText = "Time (mins): " + items[i].recipe.totalTime;
      // create show ingredients link
        // let liItemIngredientsLink = document.createElement("a");
        // liItemIngredientsLink.innerText = "show ingredients list";
        // liItemIngredientsLink.classList.add ("inner-link");
      // create ingredients info
        // let liItemIngredients = document.createElement("p");
        // liItemIngredients.innerText = items[i].recipe.ingredientLines.toString();
      //  liItemIngredients.classList.add("hide-ingredients");
      // create show health labels link
        // let liItemHealthInfoLink = document.createElement("a");
        // liItemHealthInfoLink.innerText = "show health info";
        // liItemHealthInfoLink.classList.add ("inner-link");
        // liItemHealthInfoLink.href = "showItems()";
        // ISSUE HERE 
        // liItemHealthInfoLink.addEventListener('click', showItems);
        // create cuisine type info
        // liItemCuisineTypeInfo.classList.add("hide-health-info");
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
      liSubSection.appendChild(liItemServings);
      liSubSection.appendChild(liItemCalories);
      liSubSection.appendChild(liItemTime);
      // liSubSection.appendChild(liItemIngredientsLink);
      // liSubSection.appendChild(liItemIngredients);
      // liSubSection.appendChild(liItemHealthInfoLink);
      if(items[i].recipe.cuisineType!= undefined) {
        let liItemCuisineTypeInfo = document.createElement("span");
        liItemCuisineTypeInfo.innerText = "Cuisine type: " + items[i].recipe.cuisineType;
        liSubSection.appendChild(liItemCuisineTypeInfo);
        console.log("blah");
      }
      liSubSection.appendChild(liItemLink);
      liSubSection.appendChild(liItemSource);
    }
  }