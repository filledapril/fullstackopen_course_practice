const Persons = ({showNumber}) =>{
    return(
        <div>
            {showNumber.map((p)=> <div key={p.id}>{p.name} {p.number}</div>)}
        </div>
    )}

export default Persons