import ReactDom from 'react-dom'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateItem } from '../features/items/itemSlice'
import { FaSave } from 'react-icons/fa'
import { AiOutlineStop } from 'react-icons/ai'

function EditModal({ open, onSave, onCancel, item }) {
  const descriptionInputRef = useRef()
  const quantityInputRef = useRef()
  const mealsperquantityInputRef = useRef()
  const categoryInputRef = useRef()
  const locationInputRef = useRef()
  const yearInputRef = useRef()
  const notesInputRef = useRef()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    const editedItem = {
      ...item,
      description: descriptionInputRef.current.value.toLowerCase(),
      quantity: parseInt(quantityInputRef.current.value),
      mealsperquantity: parseInt(mealsperquantityInputRef.current.value),
      category: categoryInputRef.current.value,
      location: locationInputRef.current.value,
      year: parseInt(yearInputRef.current.value),
      notes: notesInputRef.current.value,
    }
    const id = item._id
    dispatch(updateItem({ id: id, data: editedItem }))
    onSave()
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
                ref={descriptionInputRef}
                type='text'
                name='description'
                id='description'
                defaultValue={item.description}
                required
              />
              <label htmlFor='quantity'>Quantity</label>
              <input
                ref={quantityInputRef}
                type='number'
                name='quantity'
                id='quantity'
                defaultValue={item.quantity}
                required
              />
              <label htmlFor='mealsperquantity'>Meals Per Quantity</label>
              <input
                ref={mealsperquantityInputRef}
                type='number'
                name='mealsperquantity'
                id='mealsperquantity'
                defaultValue={item.mealsperquantity}
                required
              />
              <label htmlFor='category'>Category</label>
              <select
                ref={categoryInputRef}
                name='category'
                id='category'
                defaultValue={item.category}
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
                ref={locationInputRef}
                name='location'
                id='location'
                defaultValue={item.location}
                required>
                <option value=''>---</option>
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
                defaultValue={item.year}
                required
              />
              <label htmlFor='notes'>Notes</label>
              <input
                ref={notesInputRef}
                type='text'
                name='notes'
                id='notes'
                defaultValue={item.notes}
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
