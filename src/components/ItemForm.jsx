import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createItem } from '../features/items/itemSlice'
import { FaSave } from 'react-icons/fa'

function ItemForm() {
  const descriptionInputRef = useRef()
  const quantityInputRef = useRef()
  const mealsperquantityInputRef = useRef()
  const categoryInputRef = useRef()
  const locationInputRef = useRef()
  const yearInputRef = useRef()
  const notesInputRef = useRef()
  const dispatch = useDispatch()

  const clearForm = () => {
    descriptionInputRef.current.value = null
    quantityInputRef.current.value = null
    mealsperquantityInputRef.current.value = null
    categoryInputRef.current.value = null
    locationInputRef.current.value = null
    yearInputRef.current.value = null
    notesInputRef.current.value = null
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const item = {
      description: descriptionInputRef.current.value.toLowerCase(),
      quantity: parseInt(quantityInputRef.current.value),
      mealsperquantity: parseInt(mealsperquantityInputRef.current.value),
      category: categoryInputRef.current.value,
      location: locationInputRef.current.value,
      year: parseInt(yearInputRef.current.value),
      notes: notesInputRef.current.value,
    }
    dispatch(createItem(item))
    clearForm()
  }

  return (
    <section className='form form-add-new'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='description'>Item Description</label>

          <input
            ref={descriptionInputRef}
            type='text'
            name='description'
            id='description'
            required
          />
          <label htmlFor='quantity'>Quantity</label>
          <input
            ref={quantityInputRef}
            type='number'
            name='quantity'
            id='quantity'
            required
          />
          <label htmlFor='mealsperquantity'>Meals Per Quantity</label>
          <input
            ref={mealsperquantityInputRef}
            type='number'
            name='mealsperquantity'
            id='mealsperquantity'
            required
          />
          <label htmlFor='category'>Category</label>
          <select
            ref={categoryInputRef}
            name='category'
            id='category'
            required>
            <option value=''></option>
            <option value='meat'>Meat</option>
            <option value='vegetable'>Vegetable</option>
            <option value='fruit'>Fruit</option>
            <option value='mushroom'>Mushroom</option>
            <option value='other'>Other</option>
          </select>
          <label htmlFor='location'>Freezer Location</label>
          <select
            ref={locationInputRef}
            name='location'
            id='location'
            required>
            <option value=''></option>
            <option value='boathouse'>Boathouse</option>
            <option value='downstairs'>Downstairs</option>
          </select>
          <label htmlFor='year'>Year of Harvest (XXXX)</label>
          <input
            ref={yearInputRef}
            type='text'
            minLength={4}
            maxLength={4}
            name='year'
            id='year'
            required
          />
          <label htmlFor='notes'>Notes</label>
          <input
            ref={notesInputRef}
            type='text'
            name='notes'
            id='notes'
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
