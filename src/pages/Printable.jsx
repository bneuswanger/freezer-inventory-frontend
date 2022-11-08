import ReactDom from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItems } from '../features/items/itemSlice'
import { reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { RiCheckboxBlankLine } from 'react-icons/ri'

function Printable() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector((state) => state.items)
  const [freezerItems, setFreezerItems] = useState([
    {
      location: '',
      category: '',
    },
  ])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getItems())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const downstairsItems = items.filter((item) => item.location === 'downstairs')
  const boathouseItems = items.filter((item) => item.location === 'boathouse')

  const findCategory = (query) => {
    if (freezerItems.find((item) => item.category === query)) {
      return true
    }
  }

  const buildCheckbox = (qty) => {
    let boxes = []
    for (let i = qty; i > 0; i--) {
      boxes.push(
        <span
          key={i}
          className='box'>
          <RiCheckboxBlankLine />
        </span>
      )
    }
    return boxes
  }

  return ReactDom.createPortal(
    <section className='printable-container'>
      <button
        onClick={() => setFreezerItems(boathouseItems)}
        className='print-button'>
        Load Boathouse
      </button>
      <button
        onClick={() => setFreezerItems(downstairsItems)}
        className='print-button'>
        Load Downstairs
      </button>
      <h1 className='print-title'>{freezerItems[0].location} freezer inventory</h1>
      <p>Each box represents one package. Check one box per item when transferring to kitchen freezer or consuming. Kitchen freezer inventory is not tracked. Use this removal record to update the database occasionally, and re-print inventory log.</p>
      {findCategory('meat') && (
        <>
          <h1 className='print-category'>meat</h1>
          {freezerItems
            .sort((a, b) => a.description.localeCompare(b.description))
            .map(
              (item) =>
                item.category === 'meat' && (
                  <div key={item._id}>
                    <p className='print-description'>
                      {item.description} - {item.year} {buildCheckbox(item.quantity)}
                    </p>
                  </div>
                )
            )}
        </>
      )}
      {findCategory('vegetable') && (
        <>
          <h1 className='print-category'>veggies</h1>
          {freezerItems
            .sort((a, b) => a.description.localeCompare(b.description))
            .map(
              (item) =>
                item.category === 'vegetable' && (
                  <div key={item._id}>
                    <p className='print-description'>
                      {item.description} - {item.year} - {buildCheckbox(item.quantity)}
                    </p>
                  </div>
                )
            )}
        </>
      )}
      {findCategory('mushroom') && (
        <>
          <h1 className='print-category'>mushroom</h1>
          {freezerItems
            .sort((a, b) => a.description.localeCompare(b.description))
            .map(
              (item) =>
                item.category === 'mushroom' && (
                  <div key={item._id}>
                    <p className='print-description'>
                      {item.description} - {item.year} - {buildCheckbox(item.quantity)}
                    </p>
                  </div>
                )
            )}
        </>
      )}
      {findCategory('fruit') && (
        <>
          <h1 className='print-category'>fruit</h1>
          {freezerItems
            .sort((a, b) => a.description.localeCompare(b.description))
            .map(
              (item) =>
                item.category === 'fruit' && (
                  <div key={item._id}>
                    <p className='print-description'>
                      {item.description} - {item.year} - {buildCheckbox(item.quantity)}
                    </p>
                  </div>
                )
            )}
        </>
      )}
      {findCategory('other') && (
        <>
          <h1 className='print-category'>other</h1>
          {freezerItems
            .sort((a, b) => a.description.localeCompare(b.description))
            .map(
              (item) =>
                item.category === 'other' && (
                  <div key={item._id}>
                    <p className='print-description'>
                      {item.description} - {item.year} - {buildCheckbox(item.quantity)}
                    </p>
                  </div>
                )
            )}
        </>
      )}
    </section>,
    document.getElementById('printable')
  )
}

export default Printable
