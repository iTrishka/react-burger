import PropTypes from 'prop-types';

export const loadStateFromLocalstorage = (itemTag) => {
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
  
  export const saveStateInLocalstorage = (itemTag, data) => {
    try {
      const dataState = JSON.stringify(data);
      localStorage.setItem(`${itemTag}`, dataState)
    } catch (err) {
       console.log(err)
    }
  }

  loadStateFromLocalstorage.propTypes = {
    itemTag: PropTypes.string.isRequired
  }; 

  saveStateInLocalstorage.propTypes = {
    itemTag: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired
  }; 