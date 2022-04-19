import React from 'react'

interface Props {

}

export const Landing: React.FC<Props> = ({}) => {

    //https://mp3-convert.org/

    return(
    <>
    <header></header>
    <form action="http://localhost:3000/download/" method="GET">
        <div></div>
        <div>
            <input 
            type="text" 
            name="urlA" 
            placeholder="url no 1" 
            required/>
        </div>
        <div>
            <input 
            type="text" 
            name="urlB" 
            placeholder="url no 2"/>
        </div>
        <div>
            <input 
            type="text" 
            name="url3" 
            placeholder="url no 3"/>
        </div>
        <div>
            <input 
            type="text" 
            name="url4" 
            placeholder="url no 4"/>
        </div>
        <div>
            <input 
            type="text" 
            name="url5" 
            placeholder="url no 5"/>
        </div>
        <div>
            <input 
            type="text" 
            name="url6" 
            placeholder="url no 6"/>
        </div>
        <div>
            <input 
            type="text" 
            name="url7" 
            placeholder="url no 7"/>
        </div>
        <div>
            <input 
            type="text" 
            name="url8" 
            placeholder="url no 8"/>
        </div>
        <div>
            <input 
            type="text" 
            name="url9" 
            placeholder="url no 9"/>
        </div>
        <div>
            <input 
            type="text" 
            name="url10" 
            placeholder="url no 10"/>
        </div>
        <div>
            <input 
            type="submit" 
            value="Download All" />
        </div>
        <div></div>
    </form>
    </>
    );
}