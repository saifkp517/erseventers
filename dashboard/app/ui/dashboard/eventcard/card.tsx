import Image from "next/image"
import Link from "next/link"

const EventCard = ({event}: any) => {

    console.log(`${process.env.HOST}/server/images/${event.imageLoc}`)

    return (
        <Link href={`/dashboard?eventid=${event.eventid}`}>
            <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 mx-auto mt-12 border-2 border-bgSoft hover:border-white">
                <Image layout="fill" src={`${process.env.HOST}/server/images/${event.imageLoc}`} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{event.title}</h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{new Date(event.date).toDateString()}</div>
                <br />
                <span className="z-10 bg-green-900 w-1/6 text-center text-green-200 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ">Sale</span>
            </article>
        </Link>
    )
}

export default EventCard