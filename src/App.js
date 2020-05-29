import React from 'react';
import './App.css';
import { defaults }  from 'react-chartjs-2';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ContentWindow from "./components/ContentWindow";
import Footer from "./components/Footer";

defaults.global.defaultFontFamily = 'Neucha'


function App() {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="w-full md:w-2/12 lg:w-2/12 xl:w-1/12 hidden md:block custom-border border-right mt-2 ml-2 mr-2">
                    <Sidebar />
                </div>
                <div className="w-full md:w-10/12 lg:w-10/12 xl:w-11/12">
                    <ContentWindow />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
