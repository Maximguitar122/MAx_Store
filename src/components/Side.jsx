import React from 'react';
import '../style/Side.css'
export default function Side({categories, oneSelectCategory}) {
  return (
    <aside className="side">
      <ul>
        {categories.map((category) => (
          <li key={category.id}   onClick={() => oneSelectCategory(category) }>
            {category.name}
          </li>

        )) }

      </ul>
      <div className="ad-box">
        <p>📣 Тут могла б бути ваша реклама</p>
      </div>
    </aside>
  );
}
