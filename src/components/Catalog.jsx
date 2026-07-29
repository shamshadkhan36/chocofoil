import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES, COLOR_FILTERS } from '../data/products';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Catalog({ products, searchQuery, onQuickView, onAddToCart, onCustomize }) {
  const [selectedCategory, setSelectedCategory] = useState("All Collections");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [sortBy, setSortBy] = useState("popular");

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategory === "All Collections" || product.category === selectedCategory;

    // Color filter
    const matchesColor = selectedColor === "All Colors" || 
      product.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()));

    return matchesSearch && matchesCategory && matchesColor;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews; // Default: popular
  });

  return (
    <section id="catalog" style={{
      maxWidth: '1280px',
      margin: '40px auto 80px',
      padding: '0 24px'
    }}>
      {/* Section Heading */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-gold)',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '6px'
          }}>
            <Sparkles size={16} /> Exclusive Catalog
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Explore Our <span className="gold-text">Chocolate Foil Collections</span>
          </h2>
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SlidersHorizontal size={18} color="var(--text-gold)" />
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Sort By:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(243, 198, 76, 0.3)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 16px',
              color: 'white',
              fontSize: '0.88rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="popular" style={{ background: '#1a100c' }}>Most Popular</option>
            <option value="price-low" style={{ background: '#1a100c' }}>Price: Low to High</option>
            <option value="price-high" style={{ background: '#1a100c' }}>Price: High to Low</option>
            <option value="rating" style={{ background: '#1a100c' }}>Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px'
      }}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              background: selectedCategory === category ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedCategory === category ? '#120b08' : 'var(--text-main)',
              fontWeight: selectedCategory === category ? 800 : 600,
              border: selectedCategory === category ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Color Filter Swatches */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px',
        padding: '14px 20px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(255,255,255,0.05)',
        overflowX: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, minWidth: '110px' }}>
          <Filter size={14} color="var(--text-gold)" /> Filter Color:
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
          {COLOR_FILTERS.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.name)}
              style={{
                background: selectedColor === c.name ? 'rgba(243, 198, 76, 0.15)' : 'rgba(0,0,0,0.3)',
                border: selectedColor === c.name ? '1px solid var(--text-gold)' : '1px solid rgba(255,255,255,0.1)',
                color: selectedColor === c.name ? 'var(--text-gold)' : 'var(--text-muted)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: c.hex,
                display: 'inline-block'
              }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Info */}
      {(searchQuery || selectedCategory !== "All Collections" || selectedColor !== "All Colors") && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          padding: '12px 18px',
          background: 'rgba(243, 198, 76, 0.08)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.88rem'
        }}>
          <div>
            Showing <strong>{sortedProducts.length}</strong> products
            {selectedCategory !== "All Collections" && <span> in <strong>{selectedCategory}</strong></span>}
            {selectedColor !== "All Colors" && <span> with color <strong>{selectedColor}</strong></span>}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </div>
          <button 
            onClick={() => { setSelectedCategory("All Collections"); setSelectedColor("All Colors"); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-gold)', fontWeight: 700, cursor: 'pointer' }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Grid of Product Cards */}
      {sortedProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '28px'
        }}>
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onCustomize={onCustomize}
            />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-gold)', marginBottom: '8px' }}>No Foils Match Your Criteria</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try broadening your search or resetting color and category filters.</p>
        </div>
      )}
    </section>
  );
}
