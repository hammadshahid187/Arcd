import React, { useEffect, useState } from 'react'
import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel"
import '@brainhubeu/react-carousel/lib/style.css';

const StockCarousel = ({stocks}) => {

    const [imageArr, setImageArr] = useState([])

    useEffect(() => {
        var arr = []
        for(var i = 0; i < stocks.length; i++){
            arr.push(
                <div>
                    <img src={stocks[i].image_url}/>
                </div>
            )
        }
        setImageArr(arr)
    }, [])

    return (
        <Carousel
            slides={[
                imageArr
            ]}
            plugins={
                [
                    // 'arrows',
                    'infinite',
                    {
                        resolve: autoplayPlugin,
                        options: {
                            interval: 3000,
                        }
                    },
                ]}
            animationSpeed={1000}
        />

    )
}

export default StockCarousel
