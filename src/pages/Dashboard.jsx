import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ItemForm from '../components/ItemForm'
import Spinner from '../components/Spinner'
import { getItems } from '../features/items/itemSlice'
import { reset } from '../features/auth/authSlice'
import { analyzeInventory } from '../features/items/itemCalculators'
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
            <a href='#group-header_other'>
              <MdMiscellaneousServices className='menu-icon' />
              Other
            </a>
          </li>
        </ul>
      </section>
      <section className='heading'>
        <h1>{user && user.name.split(' ')[0]}'s Freezers</h1>
        <GiOpenTreasureChest className='treasure_chest' />
      </section>
      <h1 className='group-header'>Add New Item</h1>
      <p className='image-support-info'>Images supported if descriptions contain: 'chicken', 'venison', 'fish', 'corn', 'kale', 'chanterelle', 'hedgehog', 'lobster', 'beans: green', 'beans: dragon', or 'blueberr'</p>
      <p className='image-support-info'>Display is grouped by chosen 'category' except in the case of meat, which is further grouped based on a description containing 'venison', 'chicken' or 'fish'</p>
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
                .sort((a, b) => a.description.localeCompare(b.description))
                .map(
                  (item) =>
                    item.description.includes('chicken') && (
                      <ItemDisplay
                        key={item._id}
                        item={item}
                      />
                    )
                )}
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
                .sort((a, b) => a.description.localeCompare(b.description))
                .map(
                  (item) =>
                    item.description.includes('venison') && (
                      <ItemDisplay
                        key={item._id}
                        item={item}
                      />
                    )
                )}
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
                .sort((a, b) => a.description.localeCompare(b.description))
                .map(
                  (item) =>
                    item.description.includes('fish') && (
                      <ItemDisplay
                        key={item._id}
                        item={item}
                      />
                    )
                )}
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
                .sort((a, b) => a.description.localeCompare(b.description))
                .map(
                  (item) =>
                    item.category === 'vegetable' && (
                      <ItemDisplay
                        key={item._id}
                        item={item}
                      />
                    )
                )}
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
                .sort((a, b) => a.description.localeCompare(b.description))
                .map(
                  (item) =>
                    item.category === 'mushroom' && (
                      <ItemDisplay
                        key={item._id}
                        item={item}
                      />
                    )
                )}
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
                .sort((a, b) => a.description.localeCompare(b.description))
                .map(
                  (item) =>
                    item.category === 'fruit' && (
                      <ItemDisplay
                        key={item._id}
                        item={item}
                      />
                    )
                )}
            </div>
            <h1
              className='group-header'
              id='group-header_other'>
              <MdMiscellaneousServices className='group-header_icon' />
              Other{' '}
              <a href='#top'>
                <FaArrowCircleUp className='back_to_top' />
              </a>
            </h1>
            <div className='all-items'>
              {itemsSnapshot
                .sort((a, b) => a.description.localeCompare(b.description))
                .map(
                  (item) =>
                    item.category === 'other' && (
                      <ItemDisplay
                        key={item._id}
                        item={item}
                      />
                    )
                )}
            </div>
          </>
        ) : (
          <h3>No items to display</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
