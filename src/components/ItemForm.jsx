import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createItem } from '../features/items/itemSlice'
import { FaSave } from 'react-icons/fa'

function ItemForm() {
  const [item, setItem] = useState({
    description: '',
    quantity: 0,
    mealsperquantity: 0,
    category: '',
    location: '',
    year: 20,
    notes: '',
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name === 'quantity' || e.target.name === 'mealsperquantity' || e.target.name === 'year') {
      value = parseInt(e.target.value)
    } else {
      value = e.target.value.toLowerCase()
    }
    setItem({
      ...item,
      [e.target.name]: value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createItem(item))
    setItem({
      description: '',
      quantity: 0,
      mealsperquantity: 0,
      category: '',
      location: '',
      year: 20,
      notes: '',
    })
  }

  return (
    <section className='form form-add-new'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='description'>Item Description</label>

          <input
            type='text'
            name='description'
            id='description'
            value={item.description}
            onChange={handleChange}
            required
          />
          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            name='quantity'
            id='quantity'
            value={item.quantity}
            onChange={handleChange}
            required
          />
          <label htmlFor='mealsperquantity'>Meals Per Quantity</label>
          <input
            type='number'
            name='mealsperquantity'
            id='mealsperquantity'
            value={item.mealsperquantity}
            onChange={handleChange}
            required
          />
          <label htmlFor='category'>Category</label>
          <select
            name='category'
            id='category'
            value={item.category}
            onChange={handleChange}
            required>
            <option value=''>---</option>
            <option value='meat'>Meat</option>
            <option value='vegetable'>Vegetable</option>
            <option value='fruit'>Fruit</option>
            <option value='mushroom'>Mushroom</option>
            <option value='other'>Other</option>
          </select>
          <label htmlFor='location'>Freezer Location</label>
          <select
            name='location'
            id='location'
            value={item.location}
            onChange={handleChange}
            required>
            <option value=''>---</option>
            <option value='boathouse'>Boathouse</option>
            <option value='downstairs'>Downstairs</option>
          </select>
          <label htmlFor='year'>Year of Harvest (XXXX)</label>
          <input
            type='text'
            minLength={4}
            maxLength={4}
            name='year'
            id='year'
            value={item.year}
            onChange={handleChange}
            required
          />
          <label htmlFor='notes'>Notes</label>
          <input
            type='text'
            name='notes'
            id='notes'
            value={item.notes}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <button
            className='btn btn-block'
            type='submit'>
            <FaSave />
            Save
          </button>
        </div>
      </form>
    </section>
  )
}
export default ItemForm
