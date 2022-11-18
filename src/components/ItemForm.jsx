import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createItem } from '../features/items/itemSlice'
import { FaSave, FaCloudDownloadAlt } from 'react-icons/fa'
import { ImFolderUpload } from 'react-icons/im'
import LibraryModal from './LibraryModal'

function ItemForm() {
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
  const [previewSource, setPreviewSource] = useState('')
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

  const handleSelect = (e) => {
    setLibraryModalOpen(false)
    setPreviewSource(e.target.src)
    setPublicId(e.target.dataset.public_id)
  }

  const handleCancel = () => {
    setLibraryModalOpen(false)
  }

  const getImageLibrary = async () => {
    setSelectedFileName('')
    setFileSize('')
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setImageLibrary(data)
      setLibraryModalOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const clearForm = () => {
    descriptionInputRef.current.value = null
    quantityInputRef.current.value = null
    mealsperquantityInputRef.current.value = null
    categoryInputRef.current.value = null
    locationInputRef.current.value = null
    yearInputRef.current.value = null
    notesInputRef.current.value = null
    setPreviewSource('')
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
      image_data: previewSource,
      public_id: publicId,
    }
    dispatch(createItem(item))
    clearForm()
  }

  return (
    <>
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
              defaultValue='202'
              required
            />
            <label htmlFor='notes'>Notes</label>
            <input
              ref={notesInputRef}
              type='text'
              name='notes'
              id='notes'
            />
            <label htmlFor='image'>Image</label>
            <div className='image-input-wrapper'>
              <label
                htmlFor='image'
                className='file-upload-field'>
                <div className='file-upload-btn-content'>
                  <ImFolderUpload />
                  <p>Select from Computer</p>
                </div>
              </label>
              <input
                onChange={handleFileInputChange}
                type='file'
                name='image'
                id='image'
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
            {previewSource && (
              <>
                <p>You have selected:</p>
                {selectedFileName && (
                  <p style={{ color: 'var(--color-aero' }}>
                    {selectedFileName} - {fileSize}
                  </p>
                )}
                <img
                  src={previewSource}
                  alt='chosen'
                  className='form-add-image'
                />
                <p style={{ marginBottom: '25px', marginTop: '5px' }}>Image will be saved as a square.</p>
              </>
            )}
          </div>
          <div className='form-group'>
            <button
              className='btn btn-block'
              type='submit'>
              <FaSave />
              Add Item
            </button>
          </div>
        </form>
      </section>
      <LibraryModal
        images={imageLibrary}
        open={libraryModalOpen}
        onCancel={handleCancel}
        onSelect={handleSelect}
      />
    </>
  )
}
export default ItemForm
