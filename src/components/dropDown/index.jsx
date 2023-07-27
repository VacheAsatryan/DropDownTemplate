import React, { useEffect, useState } from 'react';
import './style.scss';

const SelectableItems = () => {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (itemId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId]
    }));
  };

  const handleDelete = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };
      delete updatedCheckedItems[itemId];
      return updatedCheckedItems;
    });
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectedItems = filteredData.filter((item) => checkedItems[item.id]);

  return (
    <>
      <div className="selectedItems">
        <span>Names</span>
        <div className='checkedItems'>
          {selectedItems.map((item) => (
            <div key={item.id} className='checkedItem'>
              {item.name}
              <button className='deleteBtn' onClick={() => handleDelete(item.id)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <div className='dropDown'>
        <input
          type="text"
          className='search'
          placeholder='поиск'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {filteredData.map((el) => (
          <div className="item" key={el.id}>
            <div className='itemData'>
              <span>{el.id}</span>
              <p>{el.name}</p>
            </div>
            <input
              type="checkbox"
              className='check'
              checked={checkedItems[el.id] || false}
              onChange={() => handleItemClick(el.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectableItems;
