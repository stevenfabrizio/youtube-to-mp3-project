import React from 'react'

interface Props {

}

export const Landing: React.FC<Props> = ({}) => {

    const ClickedIt = () => {
        navigator.clipboard.writeText("TESTYYY");

        window.open('https://mp3-convert.org/')

        setTimeout(() => {
            navigator.clipboard.readText();
        }, 1800);

        navigator.clipboard.readText();
        
    }
    //https://mp3-convert.org/

    return(
    <>
    <input type="text" id="text"/>
    <input type="button" id="btn" value="Submit" onClick= {() => ClickedIt()}/>
    </>
    );
}