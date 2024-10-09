import React from "react";
import PopRank from "../components/Home/Banner/PopRank";
import "../assets/Community/community.scss";

function Community() {
    return(
        <section className="community-container">
            <div className="community-section">
                {[...Array(5)].map((v, i) => (
                    <div key={i}>
                        
                    </div>
                ))}
            </div>
            <PopRank/>
        </section>
    );
}

export default Community;