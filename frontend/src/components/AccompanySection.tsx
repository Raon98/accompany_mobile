import React, {ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode
}

const AccompanySection = ({children} : LayoutProps) => {
    return (
        <>
            <div className="acpy_section">
                {children}
            </div>
        </>
    )

};

export default AccompanySection;