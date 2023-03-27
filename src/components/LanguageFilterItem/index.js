import './index.css'

const LanguageFilterItem = props => {
  const {tabItemDetails, isActive, updateActiveTabId} = props
  const activeClassName = isActive ? 'active' : ''
  const {language, id} = tabItemDetails

  const onClickTab = () => {
    updateActiveTabId(id)
  }

  return (
    <li className="tab-item" onClick={onClickTab}>
      <button className={`tab-button ${activeClassName}`} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
