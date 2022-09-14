import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import config from '../../config/local.json'

import { useReducer } from "react"
import PollsReducer, { pollsInitialState } from "../reducers/Poll.reducer"
import {setItemsAction} from "../actions/Poll.action"
import Poll from "./Poll.component"

function MainPollsPage() {

    const [currentPage, setCurrentPage] = useState(1)
    const [polls, dispatchPolls] = useReducer(PollsReducer, pollsInitialState)
    const [isFinalPage, setIsFinalPage] = useState(false)

    useEffect(() => {
       doRequest()
    }, [currentPage])
    
    const doRequest = async () => {
        const requestResult = await axios
            .get(
                'http://localhost:3004/api/polls/?page=' + currentPage,
                { headers: { "poll-api-key": config["poll-api-key"] } }
        )
        
        if (requestResult.status>=300 || requestResult.data.status != "ok") alert("error")
        else dispatchPolls(setItemsAction(requestResult.data.data.data))
       // debugger
        setIsFinalPage(requestResult.data.data.isComplete)
    }

    const onClickPrev = (e) => {
        e.preventDefault()
        if (currentPage == 1) return;
        setCurrentPage(currentPage-1)
    }

    const onClickNext = (e) => {
        e.preventDefault()
        if (isFinalPage) return;
        setCurrentPage(currentPage+1)
    }

    return (
        <div className='main-display'>
            {polls && polls.map((poll, index) => <Poll data={poll} key={ index } />)}
            <button onClick={onClickPrev} className={ currentPage == 1 ? 'disabled' : ''}>prev</button>
            <button onClick={onClickNext} className={ isFinalPage ? 'disabled' : ''}>next</button>
      </div>
  )
}

export default MainPollsPage
