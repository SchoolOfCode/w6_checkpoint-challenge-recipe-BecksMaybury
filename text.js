const vegetarian = document.getElementById("vegetarian").checked
const vegan = document.getElementById("vegan").checked
const lowFat = document.getElementById("fat-free").checked
const lowSugar = document.getElementById("low-sugar").checked
const glutenFree = document.getElementById("gluten-free").checked
let healthLabelFilter = "";

if (vegetarian || vegan || fatFree || lowSugar || glutenFree) {
  healthLabelFilter = "&health=";
  if (vegetarian) {
    healthLabelFilter = healthLabelFilter + "vegetarian";
  }
  if (vegan) {
    healthLabelFilter = healthLabelFilter + "vegan";
  }
  if (lowFat) {
    healthLabelFilter = healthLabelFilter = "low-fat";
  }
  if (lowSugar) {
    healthLabelFilter = healthLabelFilter = "sugar-conscious";
  }
  if (glutenFree) {
    healthLabelFilter = healthLabelFilter + "gluten-free";
  }
  console.log(healthLabelFilter);
}

  ${healthLabelFilter}