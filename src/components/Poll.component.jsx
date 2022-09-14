import config from '../../config/local.json'
import axios from 'axios'

function Poll({data}) {

    const onOptionSelected = async (e) => {
        e.preventDefault()
        const selectedOption = e.target[data.title].value
        if(!selectedOption) return
        console.log("send vote=> id: "+data._id, ", selected option: "+selectedOption)
        const result =  await axios(`http://localhost:3004/api/poll/${data._id}/vote/${selectedOption}`, {
            headers: {
                "poll-api-key": config["poll-api-key"]
            }
        })
        if ( result.status >= 300 || result.data.status != "ok") alert("error")
        else alert("your vote for {"+data.title+" : "+selectedOption+"} was succeeded :) ")
    }

    return (
        <form className='poll' onSubmit={onOptionSelected}>
            <h2>{data.title}</h2>
            {
                data.options.map((op, i) =>
                    <label htmlFor={op.option} key={ i }> 
                        <input type="radio" name={data.title} id={op._id} value={op.option} />
                        {op.option}
                    </label>
                )
            }
            <button type='submit'>submit</button>
      </form>
  )
}

export default Poll
