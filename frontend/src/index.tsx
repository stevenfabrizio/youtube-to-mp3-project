import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

require('./styles.css')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)