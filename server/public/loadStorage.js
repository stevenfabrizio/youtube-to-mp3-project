//array of all inputs using values
const storageArray = ['filename1', 'filename2', 'filename3', 'filename4', 'filename5', 'url1', 'url2', 'url3', 'url4', 'url5']

//if local storage exists, set the value of the htmlelement to it.
for (let i = 0; i < storageArray.length; i++){
    if(typeof localStorage.getItem(`${storageArray[i]}`) === 'string'){
        document.getElementById(`${storageArray[i]}`).value = localStorage.getItem(`${storageArray[i]}`)
    }
}

//clear all button
const clearbtn = document.getElementById('clear-btn')
clearbtn.addEventListener('click', function(){
    localStorage.clear()

    for (let i = 0; i < storageArray.length; i++){
        document.getElementById(`${storageArray[i]}`).value = ''
    }
})

//clicked convert button. if url1 empty, do nothing.
const convertbtn = document.getElementById('convert-btn')
convertbtn.addEventListener('click', function(){
    if(document.getElementById('url1').value !== ''){
        convertbtn.classList.add('clicked')
        convertbtn.value = '...'
    }
})