import React, {ReactNode} from 'react';

export interface LayoutProps {
    children: ReactNode
}

const AccompanySection = ({children} : LayoutProps) => {
    return (
        <>
            <div>
                {children}
            </div>
        </>
    )

};

export default AccompanySection;