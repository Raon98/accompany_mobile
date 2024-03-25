import React, {lazy} from 'react';
import AccompanySection from "components/AccompanySection";
import Router from "router";


const AccompanyLayout = () => {

    const AccompanyHeader = lazy(async () => await import("components/AccompanyHeader"));
    const AccompanyFooter = lazy(async () => await import("components/AccompanyFooter"));


    return (
        <>
            <div className="Accompanylayout">
                <AccompanyHeader/>
                <div className="contents">
                        <AccompanySection>
                                     <Router/>
                        </AccompanySection>
                </div>
                <AccompanyFooter/>
            </div>

        </>
    );
};

export default AccompanyLayout;