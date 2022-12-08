import ReactDom from 'react-dom'
import { AiOutlineStop } from 'react-icons/ai'

function LibraryModal({ open, onSelect, onCancel, images, desc }) {
  if (!open) return null
  return ReactDom.createPortal(
    <>
      <div
        className='overlay'
        onClick={onCancel}
      />
      <div className='modal library-modal'>
        <h1>Select an image for "{desc}" by clicking on it</h1>
        <button
          type='button'
          onClick={onCancel}
          className='btn btn-block'>
          <AiOutlineStop /> Cancel
        </button>
        <section className='library-images-wrapper'>
          {images.map((image) => (
            <img
              src={image.url}
              key={image.public_id}
              data-public_id={image.public_id}
              className='library-image'
              onClick={onSelect}
              alt=''
            />
          ))}
        </section>
      </div>
    </>,
    document.getElementById('portal')
  )
}
export default LibraryModal
