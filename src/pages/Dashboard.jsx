import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ItemForm from '../components/ItemForm'
import Spinner from '../components/Spinner'
import { getItems } from '../features/items/itemSlice'
import { reset } from '../features/auth/authSlice'
import { analyzeInventory } from '../features/general/itemCalculators'
import ItemDisplay from '../components/ItemDisplay'
import { FaArrowCircleUp } from 'react-icons/fa'
import { GiMeal } from 'react-icons/gi'
import { GiChicken, GiDeerHead, GiFishCorpse, GiBroccoli, GiSuperMushroom, GiStrawberry, GiOpenTreasureChest } from 'react-icons/gi'
import { MdMiscellaneousServices } from 'react-icons/md'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { items, isLoading, isError, message } = useSelector((state) => state.items)

  const handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition')
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition))
      sessionStorage.removeItem('scrollPosition')
    }
  }
  //timeout seems to be necessary due to the time it takes to render the images
  useEffect(() => {
    if (!isLoading)
      setTimeout(() => {
        handleScrollPosition()
      }, '200')
  }, [isLoading])

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
  const analyzedInventory = analyzeInventory(items)
  const itemsSnapshot = [...items]

  //used for displaying category headers only when items exist for said category
  const hasCategory = (category, array) => {
    return array.some((item) => item.category === category)
  }

  return (
    <>
      <section className='menu'>
        <ul>
          <li className='btn menu-item'>
            <a href='#group-header_chicken'>
              <GiChicken className='menu-icon' /> Chicken
            </a>
          </li>
          <li className='btn menu-item'>
            <a href='#group-header_venison'>
              <GiDeerHead className='menu-icon' />
              Venison
            </a>
          </li>
          <li className='btn menu-item'>
            <a href='#group-header_fish'>
              <GiFishCorpse className='menu-icon' />
              Fish
            </a>
          </li>
          <li className='btn menu-item'>
            <a href='#group-header_veggies'>
              <GiBroccoli className='menu-icon' />
              Veggies
            </a>
          </li>
          <li className='btn menu-item'>
            <a href='#group-header_mushrooms'>
              <GiSuperMushroom className='menu-icon' />
              Mushrooms
            </a>
          </li>
          <li className='btn menu-item'>
            <a href='#group-header_fruit'>
              <GiStrawberry className='menu-icon' />
              Fruit
            </a>
          </li>
          <li className='btn menu-item'>
            <a href='#group-header_miscellaneous'>
              <MdMiscellaneousServices className='menu-icon' />
              Miscellaneous
            </a>
          </li>
        </ul>
      </section>
      <section className='heading'>
        <h1>{user && user.name.split(' ')[0]}'s Freezer Inventory</h1>
        <GiOpenTreasureChest className='treasure_chest' />
      </section>
      <h1 className='group-header'>Add New Item</h1>
      <ItemForm />
      <h1 className='group-header'>
        <GiMeal className='group-header_icon' />
        Meal Summary{' '}
        <a href='#top'>
          <FaArrowCircleUp className='back_to_top' />
        </a>
      </h1>
      <table className='tg'>
        <thead>
          <tr>
            <th
              className='tg-amwm'
              colSpan='4'>
              Meat
            </th>
            <th
              className='tg-amwm'
              colSpan='4'>
              Not Meat
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='tg-baqh tg-heading'>Chicken</td>
            <td className='tg-baqh tg-heading'>Venison</td>
            <td className='tg-baqh tg-heading'>Fish</td>
            <td className='tg-baqh tg-heading'>All Meat</td>
            <td className='tg-baqh tg-heading'>Bean</td>
            <td className='tg-baqh tg-heading'>Corn</td>
            <td className='tg-baqh tg-heading'>Kale</td>
            <td className='tg-baqh tg-heading'>All Veggies</td>
          </tr>
          <tr>
            <td className='tg-baqh num'>{analyzedInventory.chicken_meals}</td>
            <td className='tg-baqh num'>{analyzedInventory.venison_meals}</td>
            <td className='tg-baqh num'>{analyzedInventory.fish_meals}</td>
            <td className='tg-baqh num'>{analyzedInventory.total_meat_meals}</td>
            <td className='tg-baqh num'>{analyzedInventory.bean_meals}</td>
            <td className='tg-baqh num'>{analyzedInventory.corn_meals}</td>
            <td className='tg-baqh num'>{analyzedInventory.kale_meals}</td>
            <td className='tg-baqh num'>{analyzedInventory.total_veggie_meals}</td>
          </tr>
        </tbody>
      </table>
      <section className='content'>
        {items.length > 0 ? (
          <>
            <h1
              className='group-header'
              id='group-header_chicken'>
              <GiChicken className='group-header_icon' />
              Chicken{' '}
              <a href='#top'>
                <FaArrowCircleUp className='back_to_top' />
              </a>
            </h1>
            <div className='all-items'>
              {itemsSnapshot
                .filter((item) => item.category === 'chicken')
                .sort((a, b) => a.description.localeCompare(b.description))
                .map((item) => (
                  <ItemDisplay
                    key={item._id}
                    item={item}
                  />
                ))}
            </div>
            <h1
              className='group-header'
              id='group-header_venison'>
              <GiDeerHead className='group-header_icon' />
              Venison{' '}
              <a href='#top'>
                <FaArrowCircleUp className='back_to_top' />
              </a>
            </h1>
            <div className='all-items'>
              {itemsSnapshot
                .filter((item) => item.category === 'venison')
                .sort((a, b) => a.description.localeCompare(b.description))
                .map((item) => (
                  <ItemDisplay
                    key={item._id}
                    item={item}
                  />
                ))}
            </div>
            <h1
              className='group-header'
              id='group-header_fish'>
              <GiFishCorpse className='group-header_icon' />
              Fish{' '}
              <a href='#top'>
                <FaArrowCircleUp className='back_to_top' />
              </a>
            </h1>
            <div className='all-items'>
              {itemsSnapshot
                .filter((item) => item.category === 'fish')
                .sort((a, b) => a.description.localeCompare(b.description))
                .map((item) => (
                  <ItemDisplay
                    key={item._id}
                    item={item}
                  />
                ))}
            </div>
            <h1
              className='group-header'
              id='group-header_veggies'>
              <GiBroccoli className='group-header_icon' />
              Veggies{' '}
              <a href='#top'>
                <FaArrowCircleUp className='back_to_top' />
              </a>
            </h1>
            <div className='all-items'>
              {itemsSnapshot
                .filter((item) => item.category === 'other vegetable' || item.category === 'beans' || item.category === 'kale' || item.category === 'corn')
                .sort((a, b) => a.description.localeCompare(b.description))
                .map((item) => (
                  <ItemDisplay
                    key={item._id}
                    item={item}
                  />
                ))}
            </div>
            <h1
              className='group-header'
              id='group-header_mushrooms'>
              <GiSuperMushroom className='group-header_icon' />
              Mushrooms{' '}
              <a href='#top'>
                <FaArrowCircleUp className='back_to_top' />
              </a>
            </h1>
            <div className='all-items'>
              {itemsSnapshot
                .filter((item) => item.category === 'mushroom')
                .sort((a, b) => a.description.localeCompare(b.description))
                .map((item) => (
                  <ItemDisplay
                    key={item._id}
                    item={item}
                  />
                ))}
            </div>
            <h1
              className='group-header'
              id='group-header_fruit'>
              <GiStrawberry className='group-header_icon' />
              Fruit{' '}
              <a href='#top'>
                <FaArrowCircleUp className='back_to_top' />
              </a>
            </h1>
            <div className='all-items'>
              {itemsSnapshot
                .filter((item) => item.category === 'fruit')
                .sort((a, b) => a.description.localeCompare(b.description))
                .map((item) => (
                  <ItemDisplay
                    key={item._id}
                    item={item}
                  />
                ))}
            </div>
            {hasCategory('miscellaneous', itemsSnapshot) && (
              <>
                <h1
                  className='group-header'
                  id='group-header_miscellaneous'>
                  <MdMiscellaneousServices className='group-header_icon' />
                  Miscellaneous{' '}
                  <a href='#top'>
                    <FaArrowCircleUp className='back_to_top' />
                  </a>
                </h1>

                <div className='all-items'>
                  {itemsSnapshot
                    .filter((item) => item.category === 'miscellaneous')
                    .sort((a, b) => a.description.localeCompare(b.description))
                    .map((item) => (
                      <ItemDisplay
                        key={item._id}
                        item={item}
                      />
                    ))}
                </div>
              </>
            )}
          </>
        ) : (
          <h3>No items to display</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
