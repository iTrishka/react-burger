import  { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { constructorItemPropTypes } from '../../utils/constants';



export const IngrediendCardConstructor = memo(function IngrediendCardConstructor({ingredient, onDeleteIngredient, id, moveCard, findCard}) {      
    const originalIndex = findCard(id).index; 

    const [{ isDragging }, dragSort] = useDrag(() => ({
        type: "sorting",
        item: { id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const { id: droppedId, originalIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveCard(droppedId, originalIndex);
            }
        },
    }), [id, originalIndex, moveCard]);


    const [, dropSort] = useDrop(() => ({
        accept: "sorting",
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findCard(id);
                moveCard(draggedId, overIndex);
                }
        },
    }), [findCard, moveCard]);
    
    const opacity = isDragging ? 0 : 1;
    
    return(
        <li ref={(node) =>{dragSort(dropSort(node))}} style={{ cursor: "move", opacity }} className="mr-4"  >
             <DragIcon type="primary"/>
             <ConstructorElement
             isLocked={false}
             text={`${ingredient.name}`}
             price={ingredient.price}
             thumbnail={ingredient.image}
             handleClose={() => onDeleteIngredient(ingredient.key, ingredient._id )}
             />
         </li>
     )    
})


IngrediendCardConstructor.propTypes = {
    ingredient: PropTypes.shape({constructorItemPropTypes}),
    onDeleteIngredient: PropTypes.func,
    id: PropTypes.string,
    moveCard: PropTypes.func,
    findCard: PropTypes.func,
  }; 