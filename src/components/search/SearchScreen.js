import React, { useMemo } from 'react'
import queryString from 'query-string'
//import queryString from 'query-string'
import { useLocation } from 'react-router';
//import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {
    
    const location = useLocation();
    console.log(queryString.parse(location.search))
    const {q = '' } = queryString.parse(location.search);
    
    const [formValues, handleInputChange] = useForm ({
        searchText: q
    });    
   
    const {searchText} = formValues;
    //const heroesFiltered = getHeroesByName(searchText);
    console.log(q)
    const heroesFiltered= useMemo( () => getHeroesByName (q),[q]) ;

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    }
    
    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Serach Form</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>

                    </form>

                </div>

                <div className="col-7">

                    <h4>Resultados</h4>
                    <hr/>

                    {
                        (q==='')
                        && 
                        <div className="alert alert-info">
                            Buscar un heroe
                        </div>
                    }     

                    {
                        (q !=='' && heroesFiltered.length === 0)
                        && 
                        <div className="alert alert-danger">
                            No hay heroe con el nombre {`"${q}"`}
                        </div>
                    }             

                    {
                        heroesFiltered.map(hero =>(
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }

                </div>

            </div>
        </div>
    )
}
