import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

function App () {
  const [searchField, robots, isPending] = useSelector(state => [
    state.searchRobots.searchField,
    state.requestRobots.robots,
    state.requestRobots.getIsPending
  ])
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(requestRobots())
  },[])

  const onSearchChange = (e) => dispatch(setSearchField(e.target.value))
  const filterRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  })
  
  return isPending ? 
    <h1>Loading...</h1> : 
      (
        <div className='tc'>
          <h1 className='f2'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filterRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );  
}

export default App;