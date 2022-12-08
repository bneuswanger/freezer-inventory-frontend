import ReactDom from 'react-dom'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateItem } from '../features/items/itemSlice'
import { FaSave, FaCloudDownloadAlt } from 'react-icons/fa'
import { AiOutlineStop } from 'react-icons/ai'
import { ImFolderUpload } from 'react-icons/im'
import LibraryModal from './LibraryModal'

function EditModal({ open, onSave, onCancel, item }) {
  let API_URL
  process.env.NODE_ENV === 'production' ? (API_URL = 'https://freezer-inventory.cyclic.app/images/') : (API_URL = '/images/')

  const descriptionInputRef = useRef()
  const quantityInputRef = useRef()
  const mealsperquantityInputRef = useRef()
  const categoryInputRef = useRef()
  const locationInputRef = useRef()
  const yearInputRef = useRef()
  const notesInputRef = useRef()
  const dispatch = useDispatch()

  const [selectedFileName, setSelectedFileName] = useState('')
  const [previewSource, setPreviewSource] = useState(item.url)
  const [fileSize, setFileSize] = useState('')
  const [imageLibrary, setImageLibrary] = useState([])
  const [libraryModalOpen, setLibraryModalOpen] = useState(false)
  const [publicId, setPublicId] = useState('')

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
    setSelectedFileName(file.name)
    setFileSize(`${(file.size / 1000).toFixed(1)} kB`)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
  const handleSelect = (e) => {
    setLibraryModalOpen(false)
    setPreviewSource(e.target.src)
    setPublicId(e.target.dataset.public_id)
  }

  const handleCancel = () => {
    setLibraryModalOpen(false)
  }

  const getImageLibrary = async () => {
    try {
      setSelectedFileName('')
      setFileSize('')
      const res = await fetch(API_URL)
      const data = await res.json()
      setImageLibrary(data)
      setLibraryModalOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const editedItem = {
      ...item,
      description: descriptionInputRef.current.value.toLowerCase().trim(),
      quantity: parseInt(quantityInputRef.current.value),
      mealsperquantity: parseInt(mealsperquantityInputRef.current.value),
      category: categoryInputRef.current.value,
      location: locationInputRef.current.value,
      year: parseInt(yearInputRef.current.value),
      notes: notesInputRef.current.value.trim(),
      image_data: previewSource,
      public_id: publicId,
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
        <h1 className='edit-form_header'>Editing "{item.description}"</h1>
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
                <option
                  value=''
                  disabled>
                  -------Meats-------
                </option>
                <option value='fish'>Fish</option>
                <option value='chicken'>Chicken</option>
                <option value='venison'>Venison</option>
                <option
                  value=''
                  disabled>
                  -------Veggies-------
                </option>
                <option value='beans'>Beans</option>
                <option value='corn'>Corn</option>
                <option value='kale'>Kale</option>
                <option value='other vegetable'>Other Vegetable</option>
                <option
                  value=''
                  disabled>
                  -------Everything Else-------
                </option>
                <option value='mushroom'>Mushroom</option>
                <option value='fruit'>Fruit</option>
                <option value='miscellaneous'>Miscellaneous</option>
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
              <label htmlFor='edit-image'>Change Image</label>
              <div className='image-input-wrapper'>
                <label
                  htmlFor='edit-image'
                  className='file-upload-field'>
                  <div className='file-upload-btn-content'>
                    <ImFolderUpload />
                    <p>Select from Device</p>
                  </div>
                </label>
                <input
                  onChange={handleFileInputChange}
                  type='file'
                  name='edit-image'
                  id='edit-image'
                  accept='image/*'
                />
                <h1>or</h1>
                <button
                  onClick={getImageLibrary}
                  type='button'
                  className='file-upload-field'>
                  <div className='file-upload-btn-content'>
                    <FaCloudDownloadAlt />
                    <p>Browse Library</p>
                  </div>
                </button>
              </div>
              <div className='edit-form-image-preview-wrapper'>
                {previewSource && (
                  <>
                    <p>This image will be saved as a square.</p>
                    {selectedFileName && (
                      <p style={{ color: 'var(--color-aero' }}>
                        {selectedFileName} - {fileSize}
                      </p>
                    )}
                    <img
                      src={previewSource}
                      alt='chosen'
                      className='edit-form-add-image'
                    />
                  </>
                )}
              </div>
            </div>

            <div className='form-group'>
              <div className='edit-buttons-wrapper'>
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
            </div>
          </form>
        </section>
      </div>
      <LibraryModal
        images={imageLibrary}
        open={libraryModalOpen}
        onCancel={handleCancel}
        onSelect={handleSelect}
        desc={item.description}
      />
    </>,
    document.getElementById('portal')
  )
}
export default EditModal
