import React from 'react';
import DrawingCanvas from 'components/DrawingCanvas';

const App: React.FC = () => {
    return (
        <div>
            <h1>Canvas Drawing and Text Recognition</h1>
            <DrawingCanvas />
        </div>
    );
};

export default App;