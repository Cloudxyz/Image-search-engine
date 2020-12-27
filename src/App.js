import React, { useState , useEffect} from 'react';
import Form from './components/Form';
import ListImages from './components/ListImages';

function App() {
  const [search, saveSearch] = useState('');
  const [images, saveImages] = useState([]);
  const [currentPage, saveCurrentPage] = useState(1);
  const [totalPages, savetotalPages] = useState(1);
    
    useEffect(() => {
      const checkApi = async () => {
            if(search === '') return;
            const imagesPerPage = 30;
            const key = '19675010-a05df9ff14559b7dfd363aac8';
            const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentPage}`;

            const response = await fetch(url);
            const result = await response.json();

            saveImages(result.hits);

            const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
            savetotalPages(calculateTotalPages);

            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({behavior: 'smooth'});
        }
        checkApi();
    }, [search, currentPage])

    const prevPage = () => {
      const newCurrentPage = currentPage - 1;
      if(newCurrentPage === 0) return;
      saveCurrentPage(newCurrentPage);
    }

    const nextPage = () => {
      const newCurrentPage = currentPage + 1;
      if(newCurrentPage > totalPages) return;
      saveCurrentPage(newCurrentPage);
    }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Form saveSearch={saveSearch} saveCurrentPage={saveCurrentPage}/>
      </div>
      <div className="row justify-content-center">
        <ListImages images={images} />
        {
        (currentPage === 1)?null:(<button type="button" className="btn btn-info mr-1" onClick={prevPage}>&laquo;Anterior</button>)
        }
        {
        (currentPage === totalPages)?null:(<button type="button" className="btn btn-info mr-1" onClick={nextPage}>Siguiente&raquo;</button>)
        }
      </div>
    </div>
  );
}

export default App;
