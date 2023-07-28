import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import firebase from "firebase";

const SearchStock = ({ history }) => {
    const [stockName, setStockName] = useState("")
    const [suggestionAvailable, setSuggestionAvailable] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const handleChange = async (val) => {
        setSuggestionAvailable(true);
        var query = val.target.value
        console.log("new value start")
        console.log("newq", query.length)
        if (query.length < 1) {
            setSuggestionAvailable(false)
        }
        else {
            console.log("newq", query.length, "searching")
            setStockName(query.toUpperCase());
            const functionRef = firebase.app().functions('us-central1').httpsCallable('searchStocks');
            var search = ""

            try {
                search = await functionRef({
                    query: query,
                });
                search['data'] = JSON.parse(search.data);
            }
            catch (error) {
                console.log("new ", error, query);
            }
            var suggestionLocal = []
            if (search.data.results.length > 0) {
                search.data.results.forEach(element => {
                    // console.log("new", element.ticker)
                    suggestionLocal.push({
                        ticker: element.ticker,
                        name: element.name
                    })
                });

                setSuggestions(suggestionLocal)
                
            }
            else {
                setSuggestionAvailable(false)
            }
        }
        console.log("new value end")
    }

    const suggestionclick = (e) => {
        history.push(`/stock/${e.currentTarget.getAttribute("ticker")}`)
        setSuggestionAvailable(false)
    }

    const formSubmit = (e) => {
        e.preventDefault()
        if (stockName.length <= 5) {
            history.push(`/stock/${stockName}`)
        };
        setSuggestionAvailable(false);
    }
    return (
        <div className="ml-4 mr-4 md:mr-2">
            <form className='relative' onSubmit={formSubmit} >
                <div className="relative flex items-center space-x-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                        {/* <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button> */}
                        <button type="submit" className="flex">
                            <SearchIcon fontSize="medium" />
                        </button>
                    </span>
                    <input className="shadow appearance-none border rounded-md w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-8 text-lg" type="text" placeholder="Stock Ticker" onChange={(val) => { handleChange(val) }} />
                </div>
                {
                    suggestionAvailable ?

                        <div className="absolute left-2 right-0 pt-5 border-b border-l border-r rounded-md bg-white">
                            <>
                                {
                                    suggestions.map((suggestion,key) => {
                                        return (
                                            <div className="suggestion border-t border-b px-3 cursor-pointer" key={key} ticker={suggestion.ticker} onClick={(e)=>{suggestionclick(e)}}>
                                                <span className="text-lg">{suggestion.ticker}</span>: {suggestion.name}
                                            </div>
                                        )
                                    })
                                }
                            </>
                            {/* <div className="suggestion border-t border-b px-3">
                                <span className="text-lg">Comapany ticker</span>: Company name
                            </div>
                            
                            <div className="suggestion border-t border-b px-3">
                                <span className="text-lg">Comapany ticker</span>: Company name
                            </div>
                            <div className="suggestion border-t border-b px-3">
                                <span className="text-lg">Comapany ticker</span>: Company name
                            </div> */}
                        </div> :
                        <></>
                }

                {/* <div className="relative text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </span>
                    <input type="search" name="q" className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autocomplete="off" />
                </div> */}
            </form>

        </div>
    )
}

export default SearchStock
