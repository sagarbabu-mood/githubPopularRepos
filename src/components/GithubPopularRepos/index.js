import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    isLoading: true,
    popularReposList: [],
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeTabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    console.log(url)
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({popularReposList: formattedData, isLoading: false})
    }
  }

  updateActiveTabId = id => {
    this.setState({activeTabId: id, isLoading: true}, this.getPopularRepos)
  }

  render() {
    const {activeTabId, isLoading, popularReposList} = this.state
    return (
      <div className="bg-container">
        <h1>Popular</h1>
        <ul className="tab-items-container">
          {languageFiltersData.map(tabItem => (
            <LanguageFilterItem
              isActive={tabItem.id === activeTabId}
              tabItemDetails={tabItem}
              key={tabItem.id}
              updateActiveTabId={this.updateActiveTabId}
            />
          ))}
        </ul>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          <ul className="repositories-container">
            {popularReposList.map(eachRepo => (
              <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default GithubPopularRepos
