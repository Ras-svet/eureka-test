import React from 'react';

function TableData(props) {
  // Фильтрация данных и добавление пустых строк
  const houseData = props.houseData || [];
  const rows = [...houseData];

  // Добавление пустых строк до достижения 5 строк
  while (rows.length < 5) {
    rows.push({ entrance: '', apparts: [' '] });
  }

  return (
    <div className="table__container">
      <table className="table__data">
      <thead>
        <tr>
          <th>Номер подъезда</th>
          <th>Номер квартиры</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((data, index) => (
          <tr key={index}>
            <td>{data.entrance}</td>
            <td>{data.apparts.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default TableData;
