import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="avatar-url" />
      <h1>{name}</h1>
      <div>
        <div className="count-container">
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="count-container">
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="count-container">
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="issues"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
