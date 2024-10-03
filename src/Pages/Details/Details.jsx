import React, { useEffect } from 'react';
import bal from '../../assets/images/co1.jpg'; // Ensure the image path is correct

const Details = () => {
    useEffect(() => {
        const imagezoom = document.getElementById('imagezoom');

        const handleMouseMove = (event) => {
            imagezoom.style.setProperty('--display', 'block');
            let pointer = {
                x: (event.offsetX * 100) / imagezoom.offsetWidth,
                y: (event.offsetY * 100) / imagezoom.offsetHeight,
            };
            imagezoom.style.setProperty('--zoom-x', pointer.x + '%');
            imagezoom.style.setProperty('--zoom-y', pointer.y + '%');
        };

        const handleMouseOut = () => {
            imagezoom.style.setProperty('--display', 'none');
        };

        imagezoom.addEventListener('mousemove', handleMouseMove);
        imagezoom.addEventListener('mouseout', handleMouseOut);

        return () => {
            imagezoom.removeEventListener('mousemove', handleMouseMove);
            imagezoom.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <div className='container m-auto'>
            <div className="m-auto card lg:card-side bg-base-100 shadow-xl">
                <div
                    id="imagezoom"
                    className='imagezoom'
                    style={{
                        '--url': `url(${bal})`, 
                        '--zoom-x': '0%',
                        '--zoom-y': '0%',
                      
                        position: 'relative' // Position relative for absolute positioning of pseudo-element
                    }}
                >
                    <img
                        src={bal}
                        alt="Album"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Make sure image takes full width and height
                    />
                    <div className="zoom-overlay" style={{
                        display: 'var(--display)', // Show/hide based on mouse events
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        backgroundImage: 'var(--url)',
                        backgroundSize: '200%', // Change to fit your zoom needs
                        backgroundPosition: 'var(--zoom-x) var(--zoom-y)',
                        pointerEvents: 'none', // Prevent mouse events on the overlay
                    }} />
                </div>
                {/* details */}





                <div className="card-body">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on the Spotiwhy app.</p>
                    <div className="card-actions justify-start">
                        <button className="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
