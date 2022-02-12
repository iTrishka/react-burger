export const loadStateFromLocalstorage = (item) => {
    try {
      const burgerIngredientState = localStorage.getItem(item)
  
      if (burgerIngredientState === null) {
        return undefined;
      }
      return JSON.parse(burgerIngredientState);
    } catch (err) {
      return err;
    }
  };
  
  export const saveStateInLocalstorage = (item, ingredients) => {
    try {
      const burgerIngredientState = JSON.stringify(ingredients);
      localStorage.setItem(`${item}`, burgerIngredientState)
    } catch (err) {
       console.log(err)
    }
  }