import { useSelector } from 'react-redux';

    


// const testdnd = () => {
//     const { bun, main } = useSelector(state => state.constructorList);

//     const findCard = useCallback((id) => {
//         const card = main.filter((c) => `${c.id}` === id)[0];
//         return {
//             card,
//             index: main.indexOf(card),
//         };
//     }, [cards]);
//     const moveCard = useCallback((id, atIndex) => {
//         const { card, index } = findCard(id);
//         setCards(update(main, {
//             $splice: [
//                 [index, 1],
//                 [atIndex, 0, card],
//             ],
//         }));
//     }, [findCard, main, setCards]);
//     const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
//     return (<div ref={drop} style={style}>
// 			{main.map((card) => (<Card key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard}/>))}
// 		</div>);



// }
