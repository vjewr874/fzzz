// ** React Imports
import {useEffect, useState} from 'react'
import { NavLink, useLocation, matchPath, useParams } from 'react-router-dom'

// ** Third Party Components
import { Badge } from 'reactstrap'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'

// ** Vertical Menu Array Of Items
import navigation from '@src/navigation/vertical'

// ** Utils
import { isNavLinkActive, search, getAllParents } from '@layouts/utils'
import StatisticalService from "../../../../../services/statisticalService";
import {win} from "leaflet/src/core/Browser";

const VerticalNavMenuLink = ({
  item,
  groupActive,
  setGroupActive,
  activeItem,
  setActiveItem,
  groupOpen,
  setGroupOpen,
  toggleActiveGroup,
  parentItem,
  routerProps,
  currentActiveItem
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink

  // ** URL Vars
  const location = useLocation()
  const currentURL = location.pathname
  const [total, setTotal] = useState(0)
  // ** To match path
  const match = matchPath(currentURL, {
    path: `${item.navLink}/:param`,
    exact: true,
    strict: false
  })

  // ** Search for current item parents
  const searchParents = (navigation, currentURL) => {
    const parents = search(navigation, currentURL, routerProps) // Search for parent object
    const allParents = getAllParents(parents, 'id') // Parents Object to Parents Array
    return allParents
  }

  // ** URL Vars
  const resetActiveGroup = navLink => {
    const parents = search(navigation, navLink, match)
    toggleActiveGroup(item.id, parents)
  }

  // ** Reset Active & Open Group Arrays
  const resetActiveAndOpenGroups = () => {
    setGroupActive([])
    setGroupOpen([])
  }

  // ** Checks url & updates active item
  useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
      const arr = searchParents(navigation, currentURL)
      setGroupActive([...arr])
    }
  }, [location])
  // useEffect(() => {
  //   if(item.total){
  //     StatisticalService.getPaymentPending()
  //         .then(res => {
  //           if (res) {
  //             window.localStorage.removeItem("total")
  //             window.localStorage.setItem("total", res.totalDepositRequest + res.totalPaymentBonusRequest + res.totalWithdrawRequest )
  //             setTotal(res.totalDepositRequest + res.totalPaymentBonusRequest + res.totalWithdrawRequest)
  //           }
  //         })
  //   }
  // }, [])
  // useEffect(() => {
  //   setInterval(function() {
  //
  //     setTotal(JSON.parse(window.localStorage.getItem("total")) | 0)
  //   }, 10000)
  // })


  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        className='d-flex align-items-center'
        target={item.newTab ? '_blank' : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || '/'
            }
          : {
              to: item.navLink || '/',
              isActive: (match, location) => {
                if (!match) {
                  return false
                }

                if (match.url && match.url !== '' && match.url === item.navLink) {
                  currentActiveItem = item.navLink
                }
              }
            })}
        /*eslint-enable */
        onClick={e => {
          if (!item.navLink.length) {
            e.preventDefault()
          }
          parentItem ? resetActiveGroup(item.navLink) : resetActiveAndOpenGroups()
        }}
      >
        {item.icon}
        <span className='menu-item text-truncate'>
          <FormattedMessage id={item.title} />
        </span>

        {item.badge && item.badgeText ? (
          <Badge className='ml-auto mr-1' color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
        {/*{item.total ? (*/}
        {/*    <Badge className='ml-auto mr-1' pill>*/}
        {/*      {total}*/}
        {/*    </Badge>*/}
        {/*) : null}*/}
      </LinkTag>
    </li>
  )
}

export default VerticalNavMenuLink
