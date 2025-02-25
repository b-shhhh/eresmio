import React, { useState } from "react";
import "../css/dashboard.css"; // Ensure this file exists

const collections = [
  { id: 1, name: "Summer Breeze", image: "/resources/summerbreeze.png", description: "Light and airy outfits perfect for summer days." },
  { id: 2, name: "Winter Chic", image: "/resources/winterchic.png", description: "Stay warm and stylish with our winter collection." },
  { id: 3, name: "Casual Comfort", image: "/resources/casual.png", description: "Relaxed outfits for everyday comfort." },
  { id: 4, name: "Formal Elegance", image: "/resources/formal.png", description: "Elegant looks for formal occasions." },
  { id: 5, name: "Party Vibes", image: "/resources/party.png", description: "Bold and fun outfits for your party nights." },
  { id: 6, name: "Athleisure", image: "/resources/athleisure.png", description: "Stylish activewear for an on-the-go lifestyle." },
  { id: 7, name: "Vintage Revival", image: "/resources/vintage.png", description: "Classic looks inspired by the past." },
  { id: 8, name: "Spring Bloom", image: "/resources/spring.png", description: "Floral and fresh outfits for spring." },
  { id: 9, name: "Street Style", image: "/resources/street.png", description: "Urban and trendy outfits for daily wear." },
  { id: 10, name: "Old Money Aesthetic", image: "/resources/oldmoney.png", description: "Timeless, classy, and elegant outfits." },
  { id: 11, name: "Y2K Fashion", image: "/resources/y2k.png", description: "Retro-futuristic and bold statement pieces." },
  { id: 12, name: "Floral Fantasy", image: "/resources/floral.png", description: "Charming floral outfits for a fresh look." },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter collections based on search input
  const filteredCollections = collections.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header>
        <h1>Outfit Gallery</h1>
        <input
          type="text"
          placeholder="Search outfits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>
      <div className="collections-container">
        {filteredCollections.map((item) => (
          <div key={item.id} className="collection-card" onClick={() => setSelectedItem(item)}>
            <img src={item.image} alt={item.name} className="collection-image" />
            <div className="collection-info">
              <span className="collection-name">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            <button onClick={() => setSelectedItem(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
