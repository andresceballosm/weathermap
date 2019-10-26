export const validateColor = (weather) => {
    switch (weather) {
        case 'Clouds':
            return require('../../assets/background/clouds.jpg');
        case 'Haze':
            return require('../../assets/background/haze.jpg') 
        case 'Rain':
            return require('../../assets/background/rain.jpg')
        case 'Fog':
            return require('../../assets/background/haze.jpg')
        case 'Clear':
            return require('../../assets/background/clear.jpg')
        default:
            return require('../../assets/background/clouds.jpg')
    }
}

