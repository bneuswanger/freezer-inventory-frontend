import ReactDom from 'react-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateItem } from '../features/items/itemSlice'
import { FaSave } from 'react-icons/fa'
import { AiOutlineStop } from 'react-icons/ai'

function EditModal({ open, onSave, onCancel, item }) {
  const dispatch = useDispatch()

  const [editedItem, setEditedItem] = useState({
    ...item,
  })

  const onSubmit = (e) => {
    const id = editedItem._id
    e.preventDefault()
    dispatch(updateItem({ id: id, data: editedItem }))
    onSave()
  }

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name === 'quantity' || e.target.name === 'mealsperquantity' || e.target.name === 'year') {
      value = parseInt(e.target.value)
    } else {
      value = e.target.value.toLowerCase()
    }
    setEditedItem({
      ...editedItem,
      [e.target.name]: value,
    })
  }

  if (!open) return null
  return ReactDom.createPortal(
    <>
      <div
        className='overlay'
        onClick={onCancel}
      />
      <div className='modal'>
        <h1 className='edit-form_header'>Edit "{item.description}"</h1>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='description'>Item Description</label>
              <input
                type='text'
                name='description'
                id='description'
                value={editedItem.description}
                onChange={handleChange}
                required
              />
              <label htmlFor='quantity'>Quantity</label>
              <input
                type='number'
                name='quantity'
                id='quantity'
                value={editedItem.quantity}
                onChange={handleChange}
                required
              />
              <label htmlFor='mealsperquantity'>Meals Per Quantity</label>
              <input
                type='number'
                name='mealsperquantity'
                id='mealsperquantity'
                value={editedItem.mealsperquantity}
                onChange={handleChange}
                required
              />
              <label htmlFor='category'>Category</label>
              <select
                name='category'
                id='category'
                value={editedItem.category}
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
                value={editedItem.location}
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
                value={editedItem.year}
                onChange={handleChange}
                required
              />
              <label htmlFor='notes'>Notes</label>
              <input
                type='text'
                name='notes'
                id='notes'
                value={editedItem.notes}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <button
                className='btn btn-block'
                type='submit'>
                <FaSave /> Save Item
              </button>
              <button
                type='button'
                onClick={onCancel}
                className='btn btn-block'>
                <AiOutlineStop /> Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </>,
    document.getElementById('portal')
  )
}
export default EditModal
