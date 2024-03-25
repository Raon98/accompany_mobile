import React, { lazy, Suspense } from 'react';
import AccompanySection from "components/AccompanySection";
import Router from "router";

const AccompanyHeader = lazy(() => import("components/AccompanyHeader"));
const AccompanyFooter = lazy(() => import("components/AccompanyFooter"));

const AccompanyLayout = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <AccompanyHeader />
                <div className="contents">
                    <AccompanySection>
                        <Router />
                    </AccompanySection>
                </div>
                <AccompanyFooter />
            </Suspense>
        </>
    );
};

export default AccompanyLayout;
