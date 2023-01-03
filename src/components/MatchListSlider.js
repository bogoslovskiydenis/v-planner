import { useContext, useEffect, useRef, useState } from "react"
import SwiperCore, { Navigation, Pagination, Virtual } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { AuthContext } from "../context/AuthContext"

SwiperCore.use([Pagination, Navigation, Virtual])

const MatchListSlider = ({ files = [], vendorId, triggerStories }) => {

  const [swiperRef, setSwiperRef] = useState(null)
  // const [flagLast, setFlagLast] = useState(false)
  // const [flagFirst, setFlagFirst] = useState(true)

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const auth = useContext(AuthContext)

  useEffect(() => {
    if(swiperRef){
      swiperRef.slideTo(0)
      // setFlagLast(false)
      // setFlagFirst(true)
    }
  }, [])

  const like = () => {
    auth.setUser({
      ...auth.user,
      profile: {
        ...auth.user.profile,
        likes: {
          ...auth.user.profile.likes,
          users: {
            ...auth.user.profile.likes.users,
            [vendorId]: true
          }
        }
      }
    })
    triggerStories()
  }

  const dislike = () => {
    const user = auth.user
    delete auth.user.profile.likes.users[vendorId]
    auth.setUser({...user})
    triggerStories()
  }

  return (
    <Swiper
      onSwiper={setSwiperRef}
      slidesPerView={1}
      allowTouchMove={true}
      grabCursor={true}
      modules={[Pagination, Navigation, Virtual]}
      className="slider-matchlist"
      pagination={{
        type: "bullets"
      }}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
        disabledClass: "slider-matchlist__prev-disabled",

      }}
      onBeforeInit={swiper => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }}
      virtual
    >
      {
        files.map((file, idx) => (
          <SwiperSlide
            key={file}
            virtualIndex={idx}
          >
            <img src={file} alt="" />
            <div className="slider-matchlist__actions">
              <div className="slider-matchlist__like" onClick={like}><i className="icon-like"></i></div>
              <div className="slider-matchlist__times" onClick={dislike}><i className="icon-times"></i></div>
            </div>
          </SwiperSlide>
        )) 
      }
      <div
        className="slider-matchlist__prev"
        // onClick={prevStoriesSlide}
        ref={prevRef}
        >
          <i className="icon-arrow"></i>
        </div>
      <div
        className="slider-matchlist__next"
        // onClick={nextStoriesSlide}
        ref={nextRef}
        >
          <i className="icon-arrow"></i>
        </div>
    </Swiper>
  )
}

export default MatchListSlider