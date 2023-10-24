document.addEventListener('DOMContentLoaded', () => {
    const favoriteMealsList = document.getElementById('favoriteMealsList');

    // Function to get favorite meals from local storage
    function getFavoriteMeals() {
        const favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
        return favoriteMeals;
    }

    // Function to display favorite meals
    function displayFavoriteMeals() {
        const favoriteMeals = getFavoriteMeals();

        if (favoriteMeals.length === 0) {
            favoriteMealsList.innerHTML = '<li>No favorite meals added.</li>';
            return;
        }

        favoriteMealsList.innerHTML = '';
        favoriteMeals.forEach((meal) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <button data-id="${meal.idMeal}" class="remove-btn">Remove</button>
            `;
            favoriteMealsList.appendChild(li);
        });

        // Add click event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const mealId = button.getAttribute('data-id');
                const updatedFavoriteMeals = getFavoriteMeals().filter((meal) => meal.idMeal !== mealId);
                localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavoriteMeals));
                displayFavoriteMeals();
            });
        });
    }

    // Initialize the favorite meals list
    displayFavoriteMeals();
});
