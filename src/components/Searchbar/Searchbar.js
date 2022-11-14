import { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Searchbar/Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [imageString, setImageString] = useState('');

  const handleImageChange = event => {
    setImageString(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageString.trim() === '') {
      alert('Заполните поле поиска');
    }

    onSubmit(imageString);
    setImageString('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleImageChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
