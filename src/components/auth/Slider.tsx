import { Grid } from '@mui/material';
import { Slide } from 'react-slideshow-image'
import baseUrl from '../../utils/Util';

const Slider = ({images}:{images:Array<any>}) => {
  return (<div className="slide-container">
    <Slide>
      {images.map((image, index) => (
        <div
          className="each-slide"
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={0} sm={10} md={10} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', width: '100%', height: '100%'
          }}>
            <img
              src={image.sliderImage}
              style={{
                maxWidth: '100%', height: '100%', display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </Grid>
        </div>
      ))}
    </Slide>
  </div>)
}
export default Slider;