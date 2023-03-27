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
    activeLanguage: languageFiltersData[0].language,
    isLoading: true,
    popularReposList: [],
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(url)
    console.log(url, response)
    if (response.ok === true) {
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
    const activeTab = languageFiltersData.filter(
      eachLanguage => eachLanguage.id === id,
    )

    this.setState(
      {activeTabId: id, activeLanguage: activeTab[0].language, isLoading: true},
      this.getPopularRepos,
    )
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
