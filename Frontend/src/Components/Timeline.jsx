import style from '../Stylesheets/Timeline.module.css'
import logo1 from '../assets/Logo1.svg'
import logo2 from '../assets/Logo2.svg'
import logo3 from '../assets/Logo3.svg'
import logo4 from '../assets/Logo4.svg'
import timelineImg from '../assets/TimelineImage.png'

const timelineData = [
    {
        logo: logo1,
        title: 'Leadership',
        description: 'Fully committed to the success company'
    },
    {
        logo: logo2,
        title: 'Leadership',
        description: 'Fully committed to the success company'
    },
    {
        logo: logo3,
        title: 'Leadership',
        description: 'Fully committed to the success company'
    },
    {
        logo: logo4,
        title: 'Leadership',
        description: 'Fully committed to the success company'
    }
]

export default function Timeline() {
    return (
        <div className={style.container}>
            <div className={style.timeline}>
                {
                    timelineData.map((data , index) => (
                        <div key={index} className={style.subsection}>
                            <div className={`${style.timelinelogo} ${index === 0 ? style.fistchild : ''}`}>
                                <img src={data.logo} alt={data.title} />
                            </div>
                            <div className={style.info}>
                                <b>{ data.title }</b>
                                <p>{ data.description }</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className={style.images}>
                <div className={style.img1}>
                    <img src={timelineImg} alt='Timeline' className={style.timelineImg} />
                </div>
                <div className={style.radial}></div>
                <div className={style.greenBlock}>
                    <div 
                        style={{
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center"
                        }}
                    >
                        <p style={{fontSize:"30px" , padding:"0px 10px"}}>10</p>
                        <p style={{
                                margin:"0px",
                                padding:"0px 10px",
                                color:"#05A77B"
                            }}>YEARS EXPRERIENCES</p>
                    </div>
                    <div className={style.line}></div>
                    <div  
                        style={{
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center"
                        }}
                    >
                        <p style={{fontSize:"30px" , padding:"0px 10px"}}>250</p>
                        <p
                            style={{
                                margin:"0px",
                                padding:"0px 10px",
                                color:"#05A77B"
                            }}
                        >TYPES OF COURSES</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
