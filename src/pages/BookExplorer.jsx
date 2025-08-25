import React, { useState, useEffect } from 'react';

const BookExplorer = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchTerm, language, sortBy]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://gutendex.com/books');
      const data = await response.json();
      setBooks(data.results);
      
      // Extract unique languages
      const allLangs = data.results.flatMap(book => 
        book.languages.map(lang => lang)
      );
      const uniqueLangs = [...new Set(allLangs)];
      setLanguages(uniqueLangs);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBooks = () => {
    let result = [...books];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(term) || 
        book.authors.some(author => 
          author.name.toLowerCase().includes(term)
        )
      );
    }
    
    // Filter by language
    if (language !== 'all') {
      result = result.filter(book => 
        book.languages.includes(language)
      );
    }
    
    // Sort books
    if (sortBy === 'popular') {
      result.sort((a, b) => b.download_count - a.download_count);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredBooks(result);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading books...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <header className="text-center bg-primary text-white p-4 rounded mb-4">
        <h1 className="display-5 fw-bold">Library Management System</h1>
        <p className="lead">Discover thousands of free books from Project Gutenberg</p>
      </header>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select 
            className="form-select" 
            value={language} 
            onChange={handleLanguageChange}
          >
            <option value="all">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select 
            className="form-select" 
            value={sortBy} 
            onChange={handleSortChange}
          >
            <option value="popular">Most Popular</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-img-top" style={{height: '200px', overflow: 'hidden'}}>
                  {book.formats['image/jpeg'] ? (
                    <img 
                      src={book.formats['image/jpeg']} 
                      alt={book.title}
                      className="img-fluid h-100 w-100"
                      style={{objectFit: 'cover'}}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {book.title}
                  </h5>
                  <p className="card-text text-muted small">
                    {book.authors.map(author => author.name).join(', ')}
                  </p>
                  <p className="text-primary fw-bold mb-2">
                    📥 {book.download_count.toLocaleString()} downloads
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex flex-wrap gap-1">
                      {book.languages.map(lang => (
                        <span key={lang} className="badge bg-info text-dark">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookExplorer;