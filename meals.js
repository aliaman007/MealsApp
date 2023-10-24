document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const mealList = document.getElementById('mealList');
    let favoriteMeals = [];
    if ("Notification" in window) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }
    // Fetch meals from the API
    async function searchMeals(query) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            return data.meals;
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    }

    // Update the meal list with search results
    async function updateMealList() {
        const query = searchInput.value;
        const meals = await searchMeals(query);

        if (!meals) {
            mealList.innerHTML = '<li>No meals found.</li>';
            return;
        }

        mealList.innerHTML = '';
        meals.forEach((meal) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <button data-id="${meal.idMeal}" class="favorite-btn">Favorite</button>
            `;
            mealList.appendChild(li);
        });

        // Add click event listeners to favorite buttons
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const mealId = button.getAttribute('data-id');
                console.log('in listner',mealId);
                const selectedMeal = meals.find((meal) => meal.idMeal === mealId);
                favoriteMeals.push(selectedMeal);
                console.log('in listner 2',favoriteMeals);
                localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
// Show a notification
if (Notification.permission === "granted") {
    const notification = new Notification("Meal Added to Favorites", {
        body: `You've added ${selectedMeal.strMeal} to your favorites!`,
        icon: selectedMeal.strMealThumb,
    });
}
            });
        });
    }

    // Handle input changes for real-time updates
    searchInput.addEventListener('input', updateMealList);

    // Initialize the meal list
    updateMealList();
});
