import  { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../services/types/data';

interface IIngredientCardConstructor{
    ingredient: IIngredient;
    onDeleteIngredient: (key: string, _id: string ) => void;
    id: string;
    moveCard: (droppedId: string, originalIndex: number) => void;
    findCard: (id: string) => {
        index: number
    }
}

export const IngrediendCardConstructor = memo(function IngrediendCardConstructor({ingredient, onDeleteIngredient, id, moveCard, findCard}:IIngredientCardConstructor) {      
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
        hover( {id: draggedId}:{id: string} ) {
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