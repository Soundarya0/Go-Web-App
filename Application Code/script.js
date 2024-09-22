const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Function to get recipes
const fetchRecipes = async (query) => {
    try {
        recipeContainer.innerHTML = "<h2> Fetching Recipes ... </h2>"
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }
        const response = await data.json();
        recipeContainer.innerHTML = " ";
        response.meals.forEach(meal => {
            // console.log(meal);
            // console.log(response.meals[1]);
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = ` 
                    <img src="${meal.strMealThumb}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish </p>
                    <p>Belongs to <span>${meal.strCategory}</span> Category </p>
            `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding EventListener to receive button
            button.addEventListener('click', () => {
                 openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        console.error('Error in Fetching Recipes ...', error);
        recipeContainer.innerHTML = "<h2> Error in Fetching Recipes ... </h2>"
    }
}

// Function Fectching Ingredents and measurements
const fetchIngredents = (meal) => {
    console.log(meal);
    let ingredentslist = "";
    for (let i = 1; i <= 20 ; i++){
        const ingredent = meal[`strIngredient${i}`];
        if(ingredent){
            const measure = meal [`strMeasure${i}`];
            ingredentslist += `<li>${measure} ${ingredent}</li>`
        }
        else {
            break;
        }
    }
    return ingredentslist;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredentslist">${fetchIngredents(meal)}</ul>
    <div>
        <h3>Instructions:</h3>
        <p class="recipeInstructions">${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display ="block";
}

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        // alert("Please enter a search term");
        recipeContainer.innerHTML = `<h2>Type the meal in the search Box ....</h2>`
        return;
    }
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
});




