import React from "react";
import NavbarComponent from "../components/Navbar";

function Dashboard() {
    return (
        <React.Fragment>
            <NavbarComponent />
            <div style={{ textAlign: "center" }}>
                <header>
                    <h1>Dashboard</h1>
                </header>
                <main style={{ padding: "1rem 0" }}>
                    Hello This is Dashboard
                </main>
            </div>
        </React.Fragment>
    );
}


export default Dashboard;