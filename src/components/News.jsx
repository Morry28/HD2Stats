import { useState, useEffect } from 'react';
function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const updateNews = () => {
            fetch('http://localhost:4000/data/news')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const sortedData = data.sort((a, b) => b.id - a.id);
                    setNews(sortedData[0]);
                })
                .catch(error => console.log(error));
        }
        setInterval(updateNews, 5000);
        return () => clearInterval(updateNews);
    }, []);

    return (
        <div className='flex flex-col bg-BG p-5 m-5'>
            <div className='flex w-full overflow-x-hidden gap-4'>
                {news? (
                    <div  className='flex m-auto bg-SC p-3 text-center border-ACC border-dashed border h-fit w-1/2 flex-col gap-2'>
                        <p className='text-PM'>{news.message}</p>
                    </div>
                ):null
                }
            </div>
        </div>
    )

}

export default News;