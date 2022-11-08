import { useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

function ItemDisplay({ item }) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const openEditModal = () => {
    setEditModalOpen(true)
  }
  const openDeleteModal = () => {
    setDeleteModalOpen(true)
  }

  const handleSave = () => {
    setEditModalOpen(false)
  }

  const handleCancel = () => {
    setEditModalOpen(false)
    setDeleteModalOpen(false)
  }

  const chooseImage = () => {
    if (item.description.toLowerCase().includes('chicken')) {
      return '/chicken.jpg'
    } else if (item.description.toLowerCase().includes('venison')) {
      return '/venison.jpg'
    } else if (item.description.toLowerCase().includes('fish')) {
      return '/fish.jpg'
    } else if (item.description.toLowerCase().includes('corn')) {
      return '/corn.jpg'
    } else if (item.description.toLowerCase().includes('kale')) {
      return '/kale.jpg'
    } else if (item.description.toLowerCase().includes('chanterelle')) {
      return '/chanterelle.jpg'
    } else if (item.description.toLowerCase().includes('hedgehog')) {
      return '/hedgehog.jpg'
    } else if (item.description.toLowerCase().includes('lobster')) {
      return '/lobster.jpg'
    } else if (item.description.toLowerCase().includes('beans: green')) {
      return '/greenbeans.jpg'
    } else if (item.description.toLowerCase().includes('beans: dragon')) {
      return '/mixedbeans.jpg'
    } else if (item.description.toLowerCase().includes('blueberr')) {
      return '/blueberries.jpg'
    } else {
      return '/noimg.jpg'
    }
  }
  return (
    <>
      <div className='item'>
        <h3>
          <span className='item-attribute_year'>{item.year}</span>
        </h3>
        <h3>
          <span className='item-attribute_location'>{item.location}</span>
        </h3>
        <img
          className='thumbnail'
          src={chooseImage()}
          alt=''
        />
        <h1>
          <span className='item-attribute item-attribute_quantity'>{item.quantity}</span>
        </h1>
        <h2 className='item-description'>{item.description}</h2>
        <h3>
          Meals per package: <span className='item-attribute'>{item.mealsperquantity}</span>
        </h3>
        {item.notes && (
          <h3>
            Notes: <span className='item-attribute_notes'>{item.notes}</span>
          </h3>
        )}
        <button
          onClick={openDeleteModal}
          className='delete'>
          <FaTrash />
          <span className='btn-label'> Delete</span>
        </button>
        <button
          onClick={openEditModal}
          className='edit'>
          <FaEdit /> <span className='btn-label'>Edit</span>
        </button>
      </div>
      <EditModal
        item={item}
        open={editModalOpen}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <DeleteModal
        item={item}
        open={deleteModalOpen}
        onCancel={handleCancel}
      />
    </>
  )
}
export default ItemDisplay
