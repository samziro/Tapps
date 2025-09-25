import React from 'react';

interface TitleProps {
    heading: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ heading }) => {
    return (
        <div className='text-4xl font-bold mb-4 text-center'>
            {heading}
        </div>
    );
};

export default Title;
