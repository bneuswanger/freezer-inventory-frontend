import ReactDom from 'react-dom'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/items/itemSlice'
import { FaTrash } from 'react-icons/fa'
import { GiMushroomCloud } from 'react-icons/gi'
import { AiOutlineStop } from 'react-icons/ai'

function DeleteModal({ open, onCancel, item }) {
  const dispatch = useDispatch()

  if (!open) return null
  return ReactDom.createPortal(
    <>
      <div
        className='overlay'
        onClick={onCancel}
      />
      <div className='modal delete-modal'>
        <h1>You're about to delete "{item.description}"??</h1>
        <h1>You cannot undo this!</h1>
        <GiMushroomCloud className='mushroom-cloud-icon' />
        <div className='delete-modal-button-wrapper'>
          <button
            type='button'
            onClick={() => dispatch(deleteItem(item._id))}
            className='btn btn-block'>
            <FaTrash /> Delete
          </button>
          <button
            type='button'
            onClick={onCancel}
            className='btn btn-block'>
            <AiOutlineStop /> Cancel
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
export default DeleteModal
