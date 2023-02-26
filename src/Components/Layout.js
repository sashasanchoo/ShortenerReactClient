import React from 'react'
export default function Layout({children}){
    return(
        <>
            <main>
                <div className={"container mt-5"}>
                    <div className={"row"}>
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}