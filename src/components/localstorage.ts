
export const loadStateFromLocalstorage = (itemTag:string) => {
    try {
      const burgerIngredientState = localStorage.getItem(itemTag)
  
      if (burgerIngredientState === null) {
        return undefined;
      }
      return JSON.parse(burgerIngredientState);
    } catch (err) {
      return err;
    }
  };
  
  export const saveStateInLocalstorage = (itemTag:string, data: any) => {
    try {
      const dataState = JSON.stringify(data);
      localStorage.setItem(`${itemTag}`, dataState)
    } catch (err) {
       console.log(err)
    }
  }