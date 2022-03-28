/**
 * normalr
 * normalize data for more efficient access
 * @author toddsby
 */
const normalr = (items, label='items', id='id') => {
  let hash = {};
  let order = [];
  for(let i = 0; i < items.length; i++) {
    let _id = items[i][id];
    order.push(_id);
    hash[_id] = {...items[i]};
  }
  let _label = label + 'Ids';
  return {
      [label]: hash,
      [_label]: order
  };
};

export {
  normalr
};
